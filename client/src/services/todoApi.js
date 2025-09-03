import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const todoApi = {
  getAllTodos: async () => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  },

  createTodo: async (data) => {
    const response = await axios.post(`${API_URL}/todos`, { data });
    return response.data;
  },

  updateTodo: async (id, data) => {
    const response = await axios.put(`${API_URL}/todos/${id}`, { data });
    return response.data;
  },

  toggleTodo: async (id) => {
    const response = await axios.get(`${API_URL}/todos/${id}`);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await axios.delete(`${API_URL}/todos/${id}`);
    return response.data;
  },

  searchTodos: async (query) => {
    const response = await axios.get(`${API_URL}/todos/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }
};