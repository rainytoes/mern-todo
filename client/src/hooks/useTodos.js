import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../services/todoApi';
import socketService from '../services/socketService';
import { useEffect } from 'react';

export const useTodos = () => {
  const queryClient = useQueryClient();

  // Setup real-time updates
  useEffect(() => {
    const socket = socketService.connect();

    socket.on('todoCreated', (newTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos) => [newTodo, ...(oldTodos || [])]);
    });

    socket.on('todoUpdated', (updatedTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos) =>
        oldTodos?.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo) || []
      );
    });

    socket.on('todoDeleted', (deletedTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos) =>
        oldTodos?.filter(todo => todo._id !== deletedTodo._id) || []
      );
    });

    return () => {
      socket.off('todoCreated');
      socket.off('todoUpdated');
      socket.off('todoDeleted');
    };
  }, [queryClient]);

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getAllTodos,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const createTodoMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos) => [newTodo, ...(oldTodos || [])]);
      socketService.emit('todoCreated', newTodo);
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, data }) => todoApi.updateTodo(id, data),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos) =>
        oldTodos?.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo) || []
      );
      socketService.emit('todoUpdated', updatedTodo);
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: todoApi.toggleTodo,
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos) =>
        oldTodos?.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo) || []
      );
      socketService.emit('todoUpdated', updatedTodo);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: (deletedTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos) =>
        oldTodos?.filter(todo => todo._id !== deletedTodo._id) || []
      );
      socketService.emit('todoDeleted', deletedTodo);
    },
  });

  return {
    todos: todosQuery.data || [],
    isLoading: todosQuery.isLoading,
    error: todosQuery.error,
    createTodo: createTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    toggleTodo: toggleTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    isCreating: createTodoMutation.isPending,
    isUpdating: updateTodoMutation.isPending,
    isDeleting: deleteTodoMutation.isPending,
  };
};