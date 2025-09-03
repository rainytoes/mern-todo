const PriorityBadge = ({ priority }) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return { color: '#e74c3c', bg: '#fdf2f2', text: 'High' };
      case 'medium':
        return { color: '#f39c12', bg: '#fef9e7', text: 'Medium' };
      case 'low':
        return { color: '#27ae60', bg: '#f0f9f4', text: 'Low' };
      default:
        return { color: '#95a5a6', bg: '#f8f9fa', text: 'None' };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <span
      className="priority-badge"
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.color}20`
      }}
    >
      {config.text}
    </span>
  );
};

export default PriorityBadge;