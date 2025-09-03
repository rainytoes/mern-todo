import { useState } from "react";
import { Edit3, Trash2, Check, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import PriorityBadge from './PriorityBadge';

const Todo = ({ todo, onToggle, onUpdate, onDelete }) => {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo?.data);
    const [priority, setPriority] = useState(todo?.priority || 'medium');

    const onFormSubmit = (e) => {
        e.preventDefault();
        
        if (text.trim()) {
            onUpdate({ id: todo._id, data: { data: text.trim(), priority } });
            setEditing(false);
        }
    }

    const cancelEdit = () => {
        setEditing(prevState => !prevState);
        setText(todo?.data);
        setPriority(todo?.priority || 'medium');
    }

    const handleToggle = (e) => {
        e.stopPropagation();
        onToggle(todo._id);
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(todo._id);
    }

    const handleEdit = (e) => {
        e.stopPropagation();
        setEditing(true);
    }

    return (
        <li
            className="task"
            onClick={handleToggle}
            style={{
                textDecoration: todo?.done ? 'line-through' : '',
                opacity: todo?.done ? 0.7 : 1
            }}
            data-testid="todo-test"
        >
            <div className="todo-content" style={{ display: editing ? 'none' : 'flex' }}>
                <div className="todo-main">
                    <span className="todo-text">{todo?.data}</span>
                    <div className="todo-meta">
                        <PriorityBadge priority={todo?.priority} />
                        <span className="todo-date">
                            {formatDistanceToNow(new Date(todo?.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            </div>

            <form
                style={{ display: editing ? 'block' : 'none' }}
                onSubmit={onFormSubmit}
                className="edit-form"
            >
                <div className="edit-inputs">
                    <input
                        type="text"
                        value={text}
                        className="edit-todo"
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        maxLength={200}
                    />
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                        className="edit-priority"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="edit-actions">
                    <button type="submit" className="save-btn" disabled={!text.trim()}>
                        <Check size={14} />
                    </button>
                    <button type="button" onClick={cancelEdit} className="cancel-btn">
                        <X size={14} />
                    </button>
                </div>
            </form>

            <div className="todo-actions" style={{ display: editing ? 'none' : 'flex' }}>
                <button className="action-btn edit-btn" onClick={handleEdit}>
                    <Edit3 size={16} />
                </button>
                <button className="action-btn delete-btn" onClick={handleDelete}>
                    <Trash2 size={16} />
                </button>
            </div>
        </li>
    )
}

export default Todo;