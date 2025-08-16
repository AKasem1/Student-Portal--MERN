import { Request, Response } from 'express';
import { Quiz, IQuiz } from './quiz.model';

export class QuizController {
  
  // Get all quizzes
  static async getQuizzes(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, subject, instructor, isActive } = req.query;
      
      const filter: any = {};
      
      if (subject && typeof subject === 'string') {
        filter.subject = { $regex: subject, $options: 'i' };
      }
      
      if (instructor && typeof instructor === 'string') {
        filter.instructor = { $regex: instructor, $options: 'i' };
      }
      
      if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
      }
      
      const quizzes = await Quiz
        .find(filter)
        .select('-questions.correctAnswer') // Hide correct answers in list view
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
      
      const total = await Quiz.countDocuments(filter);
      
      res.status(200).json({
        status: 'success',
        data: {
          quizzes,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / Number(limit))
          }
        }
      });
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch quizzes'
      });
    }
  }
  
  // Get single quiz by ID
  static async getQuizById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { includeAnswers } = req.query;
      
      let selectFields = '';
      if (includeAnswers !== 'true') {
        selectFields = '-questions.correctAnswer';
      }
      
      const quiz = await Quiz.findById(id).select(selectFields);
      
      if (!quiz) {
        res.status(404).json({
          status: 'error',
          message: 'Quiz not found'
        });
        return;
      }
      
      res.status(200).json({
        status: 'success',
        data: { quiz }
      });
    } catch (error) {
      console.error('Error fetching quiz:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch quiz'
      });
    }
  }
  
  // Get active quizzes (for students)
  static async getActiveQuizzes(req: Request, res: Response): Promise<void> {
    try {
      const currentDate = new Date();
      
      const quizzes = await Quiz
        .find({
          isActive: true,
          startDate: { $lte: currentDate },
          endDate: { $gte: currentDate }
        })
        .select('-questions.correctAnswer')
        .sort({ startDate: 1 });
      
      res.status(200).json({
        status: 'success',
        data: { quizzes }
      });
    } catch (error) {
      console.error('Error fetching active quizzes:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch active quizzes'
      });
    }
  }
  
  // Create new quiz
  static async createQuiz(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({
          status: 'error',
          message: 'Request body cannot be empty'
        });
        return;
      }

      const { title, description, subject, instructor, duration, totalPoints, questions, startDate, endDate, isActive } = req.body;

      if (!title || !description || !subject || !instructor || !duration || !totalPoints || !questions || !startDate || !endDate || isActive === undefined) {
        res.status(400).json({
          status: 'error',
          message: 'Title, description, subject, instructor, duration, totalPoints, questions, startDate, endDate, and isActive are required'
        });
        return;
      }

      if (!Array.isArray(questions) || questions.length === 0) {
        res.status(400).json({
          status: 'error',
          message: 'Questions must be a non-empty array'
        });
        return;
      }

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end <= start) {
          res.status(400).json({
        status: 'error',
        message: 'End date must be after start date'
          });
          return;
        }
      }

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (question.correctAnswer >= question.options.length) {
          res.status(400).json({
            status: 'error',
            message: `Question ${i + 1}: Correct answer index is out of range`
          });
          return;
        }
      }

      const quiz = new Quiz({
        title,
        description,
        subject,
        instructor,
        duration,
        totalPoints,
        questions,
        startDate,
        endDate,
        isActive
      });
      await quiz.save();
      
      res.status(201).json({
        status: 'success',
        message: 'Quiz created successfully',
        data: { quiz }
      });
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create quiz'
      });
    }
  }
  
  // Update quiz
  static async updateQuiz(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({
          status: 'error',
          message: 'Request body cannot be empty. At least one field must be provided for update.'
        });
        return;
      }
      
      const value = req.body;
      
      if (value.questions) {
        for (let i = 0; i < value.questions.length; i++) {
          const question = value.questions[i];
          if (question.correctAnswer >= question.options.length) {
            res.status(400).json({
              status: 'error',
              message: `Question ${i + 1}: Correct answer index is out of range`
            });
            return;
          }
        }
      }

      if (value.startDate && value.endDate) {
        const startDate = new Date(value.startDate);
        const endDate = new Date(value.endDate);
        
        if (endDate <= startDate) {
          res.status(400).json({
            status: 'error',
            message: 'End date must be after start date'
          });
          return;
        }
      }

      if (value.endDate && !value.startDate) {
        const existingQuiz = await Quiz.findById(id);
        if (existingQuiz) {
          const endDate = new Date(value.endDate);
          if (endDate <= existingQuiz.startDate) {
            res.status(400).json({
              status: 'error',
              message: 'End date must be after the existing start date'
            });
            return;
          }
        }
      }

      if (value.startDate && !value.endDate) {
        const existingQuiz = await Quiz.findById(id);
        if (existingQuiz) {
          const startDate = new Date(value.startDate);
          if (startDate >= existingQuiz.endDate) {
            res.status(400).json({
              status: 'error',
              message: 'Start date must be before the existing end date'
            });
            return;
          }
        }
      }
      
      const quiz = await Quiz.findByIdAndUpdate(
        id,
        value,
        { 
          new: true, 
          runValidators: true,
          context: 'query'
        }
      );
      
      if (!quiz) {
        res.status(404).json({
          status: 'error',
          message: 'Quiz not found'
        });
        return;
      }
      
      res.status(200).json({
        status: 'success',
        message: 'Quiz updated successfully',
        data: { quiz }
      });
    } catch (error) {
      console.error('Error updating quiz:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update quiz'
      });
    }
  }
  
  // Delete quiz
  static async deleteQuiz(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const quiz = await Quiz.findByIdAndDelete(id);
      
      if (!quiz) {
        res.status(404).json({
          status: 'error',
          message: 'Quiz not found'
        });
        return;
      }
      
      res.status(200).json({
        status: 'success',
        message: 'Quiz deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting quiz:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete quiz'
      });
    }
  }
}
