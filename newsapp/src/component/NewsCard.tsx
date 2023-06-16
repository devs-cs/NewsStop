import React from 'react';
import { Card } from 'antd';

// Define the interface for the props
interface CardProps {
  title: string;
  summary: string;
  source: string;
  width: number;
  height: number;
}

// Define the Card component
export const NewsCard: React.FC<CardProps> = ({ title, summary, source}) => {
  return (
    <Card className>
      <h3>{title}</h3>
      <p>{summary}</p>
      <p>Source: {source}</p>
    </Card>
  );
};

export default NewsCard;


