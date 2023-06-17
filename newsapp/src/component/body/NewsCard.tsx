import React,{useState} from 'react';
import { Card, Typography } from 'antd';
import TextWithLine from './TextWithLine'

const { Title } = Typography;

// Define the interface for the card props
export interface CardProps {
  title: string;
  summary: string;
  source: string;
  loading: boolean;
  url: string;
}


// Define the Card component
const NewsCard: React.FC<CardProps> = ({ title, summary, source, loading, url}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Card
    loading={loading}
    hoverable={true}
    onClick={() => window.open(url)}
    style={{
      boxShadow: isHovered ? '0px 0px 50px rgba(134, 64, 249, 0.5)' : '0px 0px 50px rgba(134, 64, 249, 0.1)',
      transition: 'box-shadow .6s', 
    }}
    onMouseEnter={() => setIsHovered(false)}
    onMouseLeave={() => setIsHovered(false)}>
      <Title level={2} style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: "#0A1158"}}>
        {title}
      </Title>
      <TextWithLine text = {source}/>
      <p style = {{fontFamily: 'Playfair Display, serif', color: "#0A1158"}}> {summary}</p>
      {/* <p>Source: {source}</p> */}
    </Card>
  );
};

export default NewsCard;


