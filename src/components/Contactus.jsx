import React, { useState } from 'react';
import '../styles/contactus.css'; // Import CSS file for styling
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        // Logic to send the message (e.g., API call)
        console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
        // You can add further logic here to send the message
    };

    return (
        <>
        <Navbar/>
        <div className="container">
            <h2 className="title">Contact Us</h2>
            <a href="mailto:phani@caterorange.com" className="contact">Email: phani@caterorange.com</a>
            <a href="tel:+919381565258" className="contact">Phone: +91 9381565258</a>

            {/* Contact Form */}
            <input
                className="input"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="input"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
            />
            <textarea
                className="input message-input"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
            />
            <button className="button" onClick={handleSendMessage}>Send Message</button>
        </div>
        <Footer/>
        </>
    );
};

export default ContactUs;
