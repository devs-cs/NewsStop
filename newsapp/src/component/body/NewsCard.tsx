import React,{useState, useEffect} from 'react';
import { Card, Typography } from 'antd';
import TextWithLine from './TextWithLine';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Title } = Typography;

// Define the interface for the card props
export interface CardProps {
  title: string;
  summary: string;
  source: string;
  loading: boolean;
  url: string;
  imageUrl: string;
} 


// Define the Card component
const NewsCard: React.FC<CardProps> = ({ title, summary, source, loading, url, imageUrl}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isVisibleOnMobile =
        window.innerWidth < 700 && isElementInViewport();
      setIsVisible(isVisibleOnMobile);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isElementInViewport = () => {
    const element = document.querySelector('.card');
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
    return false;
  };

  const boxShadowStyle = isVisible && window.innerWidth < 700 ? '0px 0px 50px rgba(134, 64, 249, 0.8)' : '0px 0px 50px rgba(134, 64, 249, 0.1)';

  console.log(imageUrl);
  return (
    
  <div className="card" onClick={() => window.open(url)}
    style={{
      boxShadow: isHovered ? '0px 0px 50px rgba(134, 64, 249, 0.8)' : '0px 0px 50px rgba(134, 64, 249, 0.1)',
      transition: 'box-shadow .3s',marginBottom: "10px", breakInside: "avoid-column"
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
    <div className="card-body">
    <Title level={2} style={{ fontFamily: 'Playfair Display, serif', fontSize: window.innerWidth < 700 ? '15px' : '20px', color: "#0A1158", textAlign: "center"}}>
        {title}
      </Title>
      <TextWithLine text = {source}/>
      <img src={imageUrl} alt="" style={{ display: 'block', margin: 'auto', maxWidth: '100%', borderRadius: "3px" }} />
      <hr></hr>
      <p className="card-text" style = {{fontFamily: 'Playfair Display, serif', color: "#0A1158", textAlign: "center", marginTop: '10px', fontSize: window.innerWidth < 700 ? '11px' : '15px'}}> {summary}</p>
    </div>
</div>
  );
};

export default NewsCard;


/*
return (
    
    <Card
    loading={loading}
    hoverable={true}
    onClick={() => window.open(url)}
    style={{
      boxShadow: isHovered ? '0px 0px 50px rgba(134, 64, 249, 0.5)' : '0px 0px 50px rgba(134, 64, 249, 0.1)',
      transition: 'box-shadow .6s', 
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <Title level={2} style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: "#0A1158"}}>
        {title}
      </Title>
      <TextWithLine text = {source}/>
      <p style = {{fontFamily: 'Playfair Display, serif', color: "#0A1158"}}> {summary}</p>
      {/* <p>Source: {source}</p> *}
      </Card>
      );
*/