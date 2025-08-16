import { Router } from 'express';
import { AnnouncementController } from './announcement.controller';

const router = Router();

router.get('/', AnnouncementController.getAnnouncements);

router.get('/:id', AnnouncementController.getAnnouncementById);

router.post('/', AnnouncementController.createAnnouncement);

router.put('/:id', AnnouncementController.updateAnnouncement);

router.delete('/:id', AnnouncementController.deleteAnnouncement);

export default router;
