import React from 'react';
import '../styles/privacy.css'; // Import CSS file for styling
import Navbar from './Navbar';
import Footer from './Footer';


const PrivacyPolicy = () => {
    return (
        <>
        <Navbar/>
        <div className="container">
            <h2 className="heading">Privacy Policy</h2>
            <div className="section">Information Collection and Use:</div>
            <p>Cater Orange collects personal information provided by users during registration and order placement for the purpose of order processing and providing personalized recommendations based on user preferences and location.</p>
            <div className="section">Data Security:</div>
            <p>Cater Orange implements industry-standard security measures, including encryption and secure data storage practices, to protect user data from unauthorized access or disclosure.</p>
            <div className="section">Third-party Disclosure:</div>
            <p>Cater Orange may share user information with third-party service providers for the purpose of order processing, delivery, and payment processing. User data will not be sold or shared with third parties for marketing purposes without user consent.</p>
            <div className="section">User Rights:</div>
            <p>Users have the right to access, update, or delete their personal information stored by Cater Orange. Requests to exercise these rights can be submitted to Cater Orange customer support.</p>
        </div>
         <Footer/>
         </>
    );
};

export default PrivacyPolicy;
