
import { TABS } from "../redux/actions/type";
import { ListTodo, CheckCircle, Clock } from 'lucide-react';

const Tabs = ({ currentTab, onTabChange }) => {
    const getTabIcon = (tab) => {
        switch (tab) {
            case 'All Todos':
                return <ListTodo size={16} />;
            case 'Active Todos':
                return <Clock size={16} />;
            case 'Done Todos':
                return <CheckCircle size={16} />;
            default:
                return null;
        }
    };

    return (
        <div className="tabs-container">
            {TABS.map(tab => (
                <button
                    key={tab}
                    className={tab === currentTab ? 'tab-button selected' : 'tab-button'}
                    onClick={() => onTabChange(tab)}
                >
                    {getTabIcon(tab)}
                    {tab}
                </button>
            ))}
        </div>
    )
}

export default Tabs;