import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onEnter: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onEnter }) => (
  <div style={{margin: '1rem 0', width: '95%'}}>
      <input
        type="text"
        placeholder="Add a new task inside ‘All’ category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter();
          }
        }}
        style={{
          backgroundColor: '#F3F3F3',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          width: '100%',
          fontSize: '1rem',
          marginBottom: '1rem',
        }}
      />
  </div>
);

export default SearchBar;