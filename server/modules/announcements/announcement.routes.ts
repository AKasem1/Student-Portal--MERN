import { Router } from 'express';
import { AnnouncementController } from './announcement.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.get('/', auth, AnnouncementController.getAnnouncements);

router.get('/:id', auth, AnnouncementController.getAnnouncementById);

router.post('/', auth, AnnouncementController.createAnnouncement);

router.put('/:id', auth, AnnouncementController.updateAnnouncement);

router.delete('/:id', auth, AnnouncementController.deleteAnnouncement);

export default router;
