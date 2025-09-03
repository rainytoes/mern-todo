import { Search, SortAsc, SortDesc, Filter } from 'lucide-react';

const SearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <div className="search-filter-container">
      <div className="search-section">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <Filter size={16} />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <div className="sort-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="data">Sort by Name</option>
            <option value="priority">Sort by Priority</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-order-btn"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;