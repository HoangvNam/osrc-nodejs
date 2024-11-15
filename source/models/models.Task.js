import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'Pending', 'Done'],
    default: 'New',
  },
  dueDate: {
    type: Date,
    required: true,
  },
  taskPoint: {
    type: Number,
    default: 0,
  },
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;