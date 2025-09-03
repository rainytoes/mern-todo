import { useState } from "react";
import { Plus } from 'lucide-react';

const TodoForm = ({ onSubmit }) => {
    const [text, setText] = useState("");
    const [priority, setPriority] = useState("medium");

    const onFormSubmit = (e) => {
        e.preventDefault();
        
        if (text.trim()) {
            onSubmit({ data: text.trim(), priority });
            setText('');
            setPriority("medium");
        }
    }

    const onInputChange = (e) => {
        setText(e.target.value);
    }

    const onPriorityChange = (e) => {
        setPriority(e.target.value);
    }

    return (
        <div className="todo-form-container">
            <form className="todo-form" onSubmit={onFormSubmit}>
                <div className="form-row">
                    <div className="input-group">
                        <input  
                            placeholder="What needs to be done?"
                            className="todo-input"
                            onChange={onInputChange}
                            value={text}
                            maxLength={200}
                        />
                        <div className="char-counter">
                            {text.length}/200
                        </div>
                    </div>
                    
                    <select 
                        value={priority} 
                        onChange={onPriorityChange}
                        className="priority-select"
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    
                    <button type="submit" className="add-button" disabled={!text.trim()}>
                        <Plus size={20} />
                        Add Todo
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm;

        setText('');
    }

    const onInputChange = (e) => {
        setText(e.target.value);
    }

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <input  
                placeholder="Enter new todo..."
                className="input"
                onChange={onInputChange}
                value={text}
            />
        </form>
    )
}

export default TodoForm;