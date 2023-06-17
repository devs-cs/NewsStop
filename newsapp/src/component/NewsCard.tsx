import React from 'react';
import { Card } from 'antd';

// Define the interface for the card props
export interface CardProps {
  title: string;
  summary: string;
  source: string;
}

// Define the Card component
const NewsCard: React.FC<CardProps> = ({ title, summary, source}) => {
  return (
    <Card>
      <h3>{title}</h3>
      <p>{summary}</p>
      <p>Source: {source}</p>
    </Card>
  );
};

export default NewsCard;


