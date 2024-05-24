import React from 'react';
import '../styles/terms.css'; // Import CSS file for styling
import Navbar from './Navbar';
import Footer from './Footer';


const TermsAndConditions = () => {
    return (
        <>
        <Navbar/>
        <div className="container">
            <h2 className="heading">Terms and Conditions</h2>
            <div className="section">Services Offered:</div>
            <p>Cater Orange offers meal delivery services and caters to bulk orders of meals, providing delivery in cater service boxes for orders above 10.</p>
            <div className="section">User Data Collection:</div>
            <p>Registration: Users are required to register on the Cater Orange platform to place orders and access certain features. During registration, users may be asked to provide personal information such as name, contact details, and address.</p>
            <p>Location: Cater Orange may collect user location data for order processing and to provide personalized recommendations.</p>
            <div className="section">Data Security:</div>
            <p>Cater Orange uses JWT (JSON Web Tokens) for secure authentication and authorization.</p>
            <p>User data is stored securely in a MongoDB Atlas database, which implements its own security measures to protect user information.</p>
            <div className="section">Payment Processing:</div>
            <p>Cater Orange accepts payment via Credit and Debit Cards, Net Banking, UPI (Unified Payments Interface), Wallets, and Cash on Delivery.</p>
            <div className="section">User Responsibilities:</div>
            <p>Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.</p>
            <p>Users must comply with Cater Orange's terms of service, acceptable use policies, and refrain from engaging in any prohibited activities, including but not limited to fraud, misuse of the platform, and violation of intellectual property rights.</p>
            <div className="section">Legal Compliance:</div>
            <p>Cater Orange complies with all relevant laws and regulations, including but not limited to data protection laws, consumer protection laws, and industry-specific regulations related to food delivery services.</p>
            <div className="section">Contact Information:</div>
            <p>Company Owner: Abhishek Susarla</p>
            <p>Company Name: Caterorange</p>
            <p>Location: Alliance Pro Building, First Floor, Vittal Rao Nagar, Madhapur, Hyderabad, 500081, Telangana</p>
        </div>
        <Footer/>
        </>
    );
};

export default TermsAndConditions;
