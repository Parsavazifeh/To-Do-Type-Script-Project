import React from 'react';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const sidebarStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid #dee2e6',
  padding: '3.5rem'
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  marginTop: '4rem',
};

const itemStyle: React.CSSProperties = {
  margin: '1rem 0',
  cursor: 'pointer',
  fontSize: '22px',
  color: '#343a40',
  fontWeight: '400',
  font: 'lato'
};

const categories = ['All', 'Groceries', 'College', 'Payments'];

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => (
  <div style={sidebarStyle}>
    <ul style={listStyle}>
      {categories.map(item => (
        <li
          key={item}
          style={{
            ...itemStyle,
            fontWeight: selectedCategory === item ? 'bold' : 'normal',
            color: selectedCategory === item ? '#EA5959' : '#343a40'
          }}
          onClick={() => onSelectCategory(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;