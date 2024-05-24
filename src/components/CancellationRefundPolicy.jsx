import React from 'react';
import '../styles/CnR.css';
import Navbar from './Navbar';
import Footer from './Footer';

const CancellationRefundPolicy = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <h2 className="heading">Cancellation and Refund Policy</h2>
                <div className="section">Cancellation:</div>
                <p>
                    Customers can cancel their orders within a specified time frame before the scheduled delivery time. The cancellation window may vary depending on factors such as the type of order, restaurant policies, and delivery distance. Once the order is processed by the restaurant or delivery service, cancellation may not be possible.
                </p>
                <p>
                    For subscription-based services, customers may have the option to cancel their subscription at any time, with the cancellation taking effect at the end of the current billing cycle.
                </p>
                <div className="section">Refund:</div>
                <p>
                    If a customer wishes to request a refund for a canceled order or due to dissatisfaction with the delivered items, they can contact customer support to initiate the refund process.
                </p>
                <p>
                    Refunds will be issued within 72hrs, based on the circumstances of the order and the company's refund policy. In general, refunds may be issued in the following scenarios:
                </p>
                <ul>
                    <li>Delay of more than 1 hour from the scheduled Lunch or Dinner time</li>
                    <li>Incorrect or missing items in the order.</li>
                    <li>Quality issues with the delivered food, such as being spoilt or unfit for consumption.</li>
                </ul>
                <p>
                    Refunds will NOT be issued in the following cases
                </p>
                <ul>
                    <li>Customer not answering the phone</li>
                    <li>Order being different on grounds of an upgrade</li>
                    <li>Complaints on the heat of the food</li>
                </ul>
                <p>
                    Refunds may be processed to the original payment method used for the order. The time taken for the refund to reflect in the customer's account may vary depending on the payment provider and banking processes.
                </p>
                <p>
                    In some cases, refunds may be provided in the form of store credits or vouchers instead of monetary refunds.
                </p>
                <p>
                    Customers should note that certain fees, such as delivery fees or service charges, may be non-refundable even in the event of order cancellation or refund requests.
                </p>
                <p>
                    If a refund request is approved, the customer will receive confirmation of the refund and the expected timeline for the funds to be credited back.
                </p>
            </div>
            <Footer />
        </>
    );
};

export default CancellationRefundPolicy;
