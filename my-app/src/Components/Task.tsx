// src/Components/Task.tsx
import React from 'react';
import trash from '../images/Vector.png';

interface TaskProps {
  value: string;
  category: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onDelete?: () => void;
}

const Task: React.FC<TaskProps> = ({
  value,
  category,
  checked = false,
  onChange,
  onDelete
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange && onChange(e.target.checked)}
          style={{
            accentColor: '#EA5959',
            width: '1.25rem',
            height: '1.25rem',
            border: '2px solid #EA5959',
            borderRadius: '4px',
          }}
        />

        <span style={{fontSize: '18px', fontWeight: '400', font: 'lato'}}>{value}</span>

        <span
          style={{
            backgroundColor: '#EA5959',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            display: 'inline-block',
            width: '8rem',
            textAlign: 'center',
          }}
        >
          {category}
        </span>
      </div>

      <button
        onClick={() => onDelete && onDelete()}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
        aria-label="Delete task"
      >
        <img src={trash} alt="delete" />
      </button>
    </div>
  );
};

export default Task;