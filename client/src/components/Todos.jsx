import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from '../redux/actions/type';
import { Trash2 } from 'lucide-react';

// component
import Todo from './Todo';
import Tabs from './Tabs';

export const Todos = ({ todos, currentTab, setCurrentTab, onToggle, onUpdate, onDelete }) => {

    const getTodos = () => {
        if (currentTab === ALL_TODOS) {
            return todos;
        } else if (currentTab === ACTIVE_TODOS) {
            return todos.filter(todo => !todo.done)
        } else if (currentTab === DONE_TODOS) {
            return todos.filter(todo => todo.done)
        }
    }

    const removeDoneTodos = () => {
        getTodos().forEach(({ done, _id }) => {
            if (done) {
                onDelete(_id);
            }
        })
    }

    return (
        <article>
            <div>
                <Tabs currentTab={currentTab} onTabChange={setCurrentTab} />

                {
                    getTodos().some(todo => todo.done) ? (
                        <button
                            onClick={removeDoneTodos}
                            className="button clear"
                        >
                            <Trash2 size={16} />
                            Remove Done Todos
                        </button>
                    ) : null    
                }
            </div>

            <ul className="todos-list">
                {
                    getTodos().map(todo => (
                        <Todo 
                            key={todo._id}
                            todo={todo}
                            onToggle={onToggle}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))
                }
                {getTodos().length === 0 && (
                    <li className="empty-state">
                        <p>No todos found. {currentTab === ALL_TODOS ? 'Add your first todo above!' : 'Try a different filter.'}</p>
                    </li>
                )}
            </ul>
        </article>
    )
}

export default Todos;