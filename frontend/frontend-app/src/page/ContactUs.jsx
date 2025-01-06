import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import envelope from '../photo/the-new-york-public-library-acJGi_9bohg-unsplash-removebg-preview.png';
import '../component-css/ContactUs.css';

export default function ContactUs() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="envelopeSection">
        <div className="envelopeContainer">
          <img className="envelope" src={envelope} alt="envelope" />
          <div className="textOnEnvelope">
            <p className="ContactUsHead">Get in touch</p>
            <p className="ContactUsPara">Have questions about your order, or a general inquiry?</p>
            <button className="emailUs">Email Us</button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
