import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../photo/Animation - 1735901618345.json';

export default function LoadingAnimation() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Lottie animationData={animationData} style={{ width: 300, height: 300 }} loop={true} />
    </div>
  );
}
