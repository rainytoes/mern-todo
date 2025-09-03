import express, { Router } from 'express';

import { addTodo, getAllTodos, toggleTodoDone, updateTodo, deleteTodo, searchTodos } from '../controller/todo-controller.js';

const route = express.Router();

// Search route must come before the /:id routes
route.get('/todos/search', searchTodos);
route.post('/todos', addTodo)
route.get('/todos', getAllTodos);
route.get('/todos/:id', toggleTodoDone);
route.put('/todos/:id', updateTodo);
route.delete('/todos/:id', deleteTodo);

export default route;