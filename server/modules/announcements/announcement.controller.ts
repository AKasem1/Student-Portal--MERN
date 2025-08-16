import { Request, Response } from 'express';
import { Announcement, IAnnouncement } from './announcement.model';

export class AnnouncementController {
  
  // Get all announcements
  static async getAnnouncements(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, priority, isActive } = req.query;
      
      const filter: any = {};
      
      if (priority && typeof priority === 'string') {
        filter.priority = priority;
      }
      
      if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
      }
      
      const announcements = await Announcement
        .find(filter)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
      
      const total = await Announcement.countDocuments(filter);
      
      res.status(200).json({
        status: 'success',
        data: {
          announcements,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / Number(limit))
          }
        }
      });
    } catch (error) {
      console.error('Error fetching announcements:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch announcements'
      });
    }
  }
  
  // Get single announcement by ID
  static async getAnnouncementById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const announcement = await Announcement.findById(id);
      
      if (!announcement) {
        res.status(404).json({
          status: 'error',
          message: 'Announcement not found'
        });
        return;
      }
      
      res.status(200).json({
        status: 'success',
        data: { announcement }
      });
    } catch (error) {
      console.error('Error fetching announcement:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch announcement'
      });
    }
  }
  
  // Create new announcement
  static async createAnnouncement(req: Request, res: Response): Promise<void> {
    try {
      const { title, author, content, priority, isActive = true } = req.body;

      if (!title || !content || !author) {
        res.status(400).json({
          status: 'error',
          message: 'Validation error',
          details: ['Title, content, and author are required']
        });
        return;
      }
      
      if (typeof priority !== 'string' || !['low', 'medium', 'high'].includes(priority)) {
        res.status(400).json({
          status: 'error',
          message: 'Validation error',
          details: ['Priority must be one of: low, medium, high']
        });
        return;
      }

      const value = { title, author, content, priority, isActive };
      
      const announcement = new Announcement(value);
      await announcement.save();
      
      res.status(201).json({
        status: 'success',
        message: 'Announcement created successfully',
        data: { announcement }
      });
    } catch (error) {
      console.error('Error creating announcement:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create announcement'
      });
    }
  }
  
  // Update announcement
  static async updateAnnouncement(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const value = req.body;

      const announcement = await Announcement.findByIdAndUpdate(
        id,
        value,
        { new: true, runValidators: true }
      );
      
      if (!announcement) {
        res.status(404).json({
          status: 'error',
          message: 'Announcement not found'
        });
        return;
      }
      
      res.status(200).json({
        status: 'success',
        message: 'Announcement updated successfully',
        data: { announcement }
      });
    } catch (error) {
      console.error('Error updating announcement:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update announcement'
      });
    }
  }
  
  // Delete announcement
  static async deleteAnnouncement(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const announcement = await Announcement.findByIdAndDelete(id);
      
      if (!announcement) {
        res.status(404).json({
          status: 'error',
          message: 'Announcement not found'
        });
        return;
      }
      
      res.status(200).json({
        status: 'success',
        message: 'Announcement deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting announcement:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete announcement'
      });
    }
  }
}
