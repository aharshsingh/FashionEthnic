import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../photo/Animation - 1735812617263.json';

export default function WishListAnimation() {
  return (
    <div style={{width:'300px' }}>
      <Lottie animationData={animationData} loop={false} />
    </div>
  );
}
