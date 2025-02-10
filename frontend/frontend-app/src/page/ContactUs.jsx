import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import envelope from '../photo/the-new-york-public-library-acJGi_9bohg-unsplash-removebg-preview.png';
import '../component-css/ContactUs.css';

export default function ContactUs() {
  const openGmailPopup = () => {
    const email = "aharshsingh25@gmail.com";
    const subject = "Support Inquiry";
    const body = "Hello, I need help with...";
  
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    if (isMobile) {
      window.location.href = mailtoURL;
    } else {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const popupWidth = 600;
      const popupHeight = 600;
      const left = screenWidth - popupWidth - 10;
      const top = screenHeight - popupHeight - 10;
      window.open(gmailURL, "_blank", `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`);
    }
  };
  
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="envelopeSection">
        <div className="envelopeContainer">
          <img className="envelope" src={envelope} alt="envelope" />
          <div className="textOnEnvelope">
            <p className="ContactUsHead lg:text-5xl text-3xl">Get in touch</p>
            <p className="ContactUsPara lg:text-base text-sm">Have questions about your order, or a general inquiry?</p>
            <button className="emailUs" onClick={openGmailPopup}>Email Us</button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
