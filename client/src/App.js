
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// components
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';
import SearchAndFilter from './components/SearchAndFilter';
import TodoStats from './components/TodoStats';
import ConnectionStatus from './components/ConnectionStatus';
import { useTodos } from './hooks/useTodos';
import { useSearch } from './hooks/useSearch';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AppContent = () => {
  const { todos, isLoading, error, createTodo, updateTodo, toggleTodo, deleteTodo } = useTodos();
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    priorityFilter,
    setPriorityFilter,
    filteredTodos,
  } = useSearch(todos);

  const [currentTab, setCurrentTab] = useState('All Todos');

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading todos: {error.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <ConnectionStatus />
      <Header />
      <TodoStats todos={todos} />
      <TodoForm onSubmit={createTodo} />
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />
      <Todos
        todos={filteredTodos}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;