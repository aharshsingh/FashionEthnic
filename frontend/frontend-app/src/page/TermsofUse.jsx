import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

export default function TermsofUse() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{ marginTop: '100px', padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: '20px' }}>
          Terms of Use
        </h1>
        <p style={{ color: '#555', fontSize: '16px', textAlign: 'justify' }}>
          <strong>Welcome to Fashion Ethnic.</strong> This document is an electronic record in terms of Information Technology Act, 2000 
          and published in accordance with the provisions of Rule 3 ) of the Information Technology (Intermediaries guidelines) 
          Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of 
          Fashion Ethnic marketplace platform - www.myntra.com (hereinafter referred to as "Platform").
        </p>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginTop: '20px' }}>
          Ownership and Offices
        </h2>
        <p style={{ color: '#555', fontSize: '16px', textAlign: 'justify' }}>
          The Platform is owned by Fashion Ethnic Designs Private Limited, having its registered office at Buildings Alyssa, 
          Begonia and Clover situated in Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Varthur Hobli, 
          Bengaluru – 560103, India and its branch office at Plot 82 A - 2nd and 3rd Floor, Sector 18 Gurugram Haryana, India.
        </p>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginTop: '20px' }}>
          Terms and Conditions
        </h2>
        <p style={{ color: '#555', fontSize: '16px', textAlign: 'justify' }}>
          Your use of the Fashion Ethnic and services and tools are governed by the following terms and conditions ("Terms of Use") 
          as applicable to the Fashion Ethnic including the applicable policies which are incorporated herein by way of reference. 
          By mere use of the Fashion Ethnic, You shall be contracting with Fashion Ethnic Designs Private Limited, the owner of 
          the Platform. These terms and conditions including the policies constitute Your binding obligations, with Fashion Ethnic.
        </p>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginTop: '20px' }}>
          User Agreement
        </h2>
        <p style={{ color: '#555', fontSize: '16px', textAlign: 'justify' }}>
          For the purpose of these Terms of Use, wherever the context so requires "You" or "User" shall mean any natural or legal 
          person who has agreed to become a buyer on Platform by providing data while registering on the Platform as Registered 
          User. The term "Fashion Ethnic", "We", "Us", "Our" shall mean Fashion Ethnic Designs Private Limited and its affiliates.
        </p>
        <p style={{ color: '#555', fontSize: '16px', textAlign: 'justify' }}>
          When You use any of the services provided by Us through the Platform, including but not limited to, (e.g. Product Reviews, 
          Seller Reviews), You will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, 
          and they shall be deemed to be incorporated into this Terms of Use and shall be considered as part and parcel of this Terms 
          of Use. We reserve the right, at Our sole discretion, to change, modify, add or remove portions of these Terms of Use, at 
          any time without any prior written notice to You.
        </p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
