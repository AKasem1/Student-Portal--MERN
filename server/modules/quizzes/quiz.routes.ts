import { Router } from 'express';
import { QuizController } from './quiz.controller';

const router = Router();

router.get('/active', QuizController.getActiveQuizzes);

router.get('/', QuizController.getQuizzes);

router.get('/:id', QuizController.getQuizById);

router.post('/', QuizController.createQuiz);

router.put('/:id', QuizController.updateQuiz);

router.delete('/:id', QuizController.deleteQuiz);

export default router;
