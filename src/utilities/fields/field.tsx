import React from 'react';
import './style.scss';

interface FieldItem {
  label: string;
  value: any;
}

interface FieldsProps {
  info: FieldItem[];
}

const Fields: React.FC<FieldsProps> = ({ info }) => {
  return (
    <div className="info-list">
      {info.map((item, index) => (
        <div key={index} className="info-item">
          <div className="label">{item.label}</div>
          <div className="value">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Fields;
