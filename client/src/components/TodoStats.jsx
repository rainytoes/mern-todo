import { CheckCircle, Circle, Clock, TrendingUp } from 'lucide-react';

const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.done).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const priorityStats = todos.reduce((acc, todo) => {
    const priority = todo.priority || 'none';
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="todo-stats">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Circle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{totalTodos}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{activeTodos}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{completedTodos}</span>
            <span className="stat-label">Done</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{completionRate}%</span>
            <span className="stat-label">Complete</span>
          </div>
        </div>
      </div>

      {Object.keys(priorityStats).length > 1 && (
        <div className="priority-breakdown">
          <h4>Priority Breakdown</h4>
          <div className="priority-stats">
            {Object.entries(priorityStats).map(([priority, count]) => (
              <span key={priority} className={`priority-stat ${priority}`}>
                {priority}: {count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoStats;