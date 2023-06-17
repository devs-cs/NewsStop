import React from 'react';
import {Gallery} from 'react-grid-gallery';
import {CardProps } from './NewsCard';

interface CardGalleryProps {
  cards: CardProps[];
}

const CardGallery: React.FC<CardGalleryProps> = ({ cards }) => {
  const renderGallery = () => {
    const galleryImages = cards.map((card) => {
      const thumbnailWidth = `${card.width}%`;
      
      return {
        thumbnail: '', // Specify the thumbnail image source if needed
        thumbnailWidth: card.width,
        thumbnailHeight: '20vh', // Set the desired height for the cards
        caption: card.title,
      };
    });

    return (
      <Gallery
        images={galleryImages}
        enableLightbox={false} // Disable lightbox view
        backdropClosesModal={true} // Enable closing the modal by clicking the backdrop
        margin={5} // Adjust the margin between cards
      />
    );
  };

  return <div>{renderGallery()}</div>;
};

export default CardGallery;
