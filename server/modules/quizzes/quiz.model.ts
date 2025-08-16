import mongoose, { Schema, Document } from 'mongoose';

interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface IQuiz extends Document {
  title: string;
  description: string;
  instructor: string;
  subject: string;
  duration: number;
  totalPoints: number;
  questions: IQuestion[];
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema: Schema = new Schema({
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    maxlength: [500, 'Question cannot exceed 500 characters']
  },
  options: [{
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Option cannot exceed 200 characters']
  }],
  correctAnswer: {
    type: Number,
    required: [true, 'Correct answer index is required'],
    min: [0, 'Correct answer index must be 0 or greater']
  },
  points: {
    type: Number,
    required: [true, 'Points are required'],
    min: [1, 'Points must be at least 1'],
    default: 1
  }
});

const QuizSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required'],
    trim: true,
    maxlength: [100, 'Instructor name cannot exceed 100 characters']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [100, 'Subject cannot exceed 100 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [5, 'Duration must be at least 5 minutes'],
    max: [300, 'Duration cannot exceed 300 minutes']
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  questions: {
    type: [QuestionSchema],
    validate: {
      validator: function(questions: IQuestion[]) {
        return questions.length > 0;
      },
      message: 'Quiz must have at least one question'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  }
}, {
  timestamps: true
});

QuizSchema.pre('save', function(next) {
  if (this.questions && (this.questions as IQuestion[]).length > 0) {
    this.totalPoints = (this.questions as IQuestion[]).reduce((total, question) => total + question.points, 0);
  }

  next();
});

QuizSchema.index({ startDate: 1, endDate: 1 });
QuizSchema.index({ subject: 1, isActive: 1 });
QuizSchema.index({ instructor: 1 });

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);
