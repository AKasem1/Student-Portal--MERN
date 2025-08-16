import { Router } from 'express';
import { QuizController } from './quiz.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.get('/active', auth, QuizController.getActiveQuizzes);

router.get('/', auth, QuizController.getQuizzes);

router.get('/:id', auth, QuizController.getQuizById);

router.post('/', auth, QuizController.createQuiz);

router.put('/:id', auth, QuizController.updateQuiz);

router.delete('/:id', auth, QuizController.deleteQuiz);

export default router;
