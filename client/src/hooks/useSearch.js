import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

export const useSearch = (todos) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos;

    // Search filter
    if (debouncedSearchQuery.trim()) {
      filtered = filtered.filter(todo =>
        todo.data.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(todo => todo.priority === priorityFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'data':
          aValue = a.data.toLowerCase();
          bValue = b.data.toLowerCase();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [todos, debouncedSearchQuery, sortBy, sortOrder, priorityFilter]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    priorityFilter,
    setPriorityFilter,
    filteredTodos: filteredAndSortedTodos,
  };
};