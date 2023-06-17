import React from 'react';
import {CoffeeOutlined} from '@ant-design/icons';

const Header: React.FC = () => {
  const currentDate = new Date();
  const option_day: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const dayOfWeek = new Intl.DateTimeFormat('en-US', option_day).format(currentDate);
  const option_date: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', option_date);

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'Playfair Display, serif',
          background: '#8640F90A',
          padding: '10px',
          borderBottom: '1px solid #6B95FF'
        }} >
      <p style={{ fontStyle: 'italic', fontSize: '32px', fontWeight: 'bold', marginBottom: '10px'}}>{dayOfWeek}</p>
      <h1 style={{ marginTop: '0px', paddingBottom: '10px'}}>{formattedDate}</h1>

      </div>
      <div
        style={{
          position: 'relative',
          top: '-21.5px', // Adjust this value as needed
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: '40px',
          height: '40px',
          background: 'white',
          border: '1px solid #6B95FF',
        }}
      >
      <CoffeeOutlined style={{ fontSize: '20px', position: 'relative', top: '10px', left: '10px', transform: 'rotate(-45deg)'}}/>
      </div>
      
    </div>

    
  );
};

export default Header;
