import React, { useState } from 'react';
import { XCircle, Cart3 } from 'react-bootstrap-icons';
import OrderData from '../datas/DataCollection';
import axios from 'axios';
import { useCart } from '../Hooks/CartContext';
import { useAuth } from '../Hooks/authContext';
import '../styles/Card.css';
import '../styles/Order.css';

export default function Card() {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [mealType, setMealType] = useState('');
    const [mealPlan, setMealPlan] = useState('');
    const [mealQuantity, setMealQuantity] = useState(1);
    const [addOns, setAddOns] = useState({
        gulabJamoon: 0,
        moongDalHalwa: 0,
        todaysSpecialSweet: 0
    });
    const { addToCart } = useCart();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { isLoggedIn } = useAuth();

    const backendUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_BACKEND_URL;

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            handleSubmit();
            alert('Added to cart successfully');
        }
    };

    const orderDetails = (index) => {
        setSelectedItemIndex(index);
        setShowDetails(true);
        window.scrollTo(0, 0);
    };

    const closeOrderDetails = () => {
        setShowDetails(false);
        setSelectedItemIndex(null);
    };

    const handleMealTypeChange = (e) => {
        setMealType(e.target.value);
    };

    const handleMealPlanChange = (e) => {
        setMealPlan(e.target.value);
    };

    const handleMealQuantityChange = (e) => {
        setMealQuantity(parseInt(e.target.value));
    };

    const handleAddOnsChange = (addOn, value) => {
        setAddOns(prevState => ({
            ...prevState,
            [addOn]: parseInt(value)
        }));
    };

    const handleSubmit = async () => {
        let userId = await localStorage.getItem('id');
        try {
            const selectedItem = OrderData[selectedItemIndex];
            console.log('Selected item:', selectedItem);
            const response = await axios.post(`${backendUrl}/api/CreateOrderDetails`, {
                userId,
                selectedItemIndex,
                mealType,
                mealPlan,
                mealQuantity,
                addOns,
                itemName: selectedItem.itemName,
                itemPrice: selectedItem.itemPrice,
                itemDetails: selectedItem.itemDetails
            });
            addToCart(response.data.cartData);
            console.log('Response:', response.data);
            setMealType('');
            setMealPlan('');
            setMealQuantity(1);
            setAddOns({
                gulabJamoon: 0,
                moongDalHalwa: 0,
                todaysSpecialSweet: 0
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <div className="card-container">
                <div>
                    <p className="header-text">Delight your taste buds with our tasty</p>
                    <p className="sub-header-text">Meal Options</p>
                    <p className="meal-options-text">Lunch & Dinner</p>
                </div>
                <div className="cards-wrapper">
                    {OrderData.map((item, index) => (
                        <div key={index}>
                            <div className="card-item mt-3">
                                <img
                                    src={item.itemImage}
                                    className="card-img-top card-img"
                                    alt="..."
                                    onClick={() => orderDetails(index)}
                                />
                                <div className="card-body">
                                    <p className="card-text">{item.itemName}</p>
                                    {/* <p style={{ fontSize: '15px' }}>{item.itemDetails}</p> */}
                                    <p className="card-description">{item.itemDetails}</p>
                                    <p className="card-price">{item.itemPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showDetails && (
                <div className="order-outer-div">
                    <div>
                        <XCircle onClick={closeOrderDetails} className="close-icon" />
                    </div>
                    <div className="order-details-container">
                        <form onSubmit={handleAddToCart}>
                            <div className="outer-div">
                                <div className="outer-div-left">
                                    <div>
                                        <img src={OrderData[selectedItemIndex]?.itemImage} className="order-image" alt="mealbox" />
                                    </div>
                                    <div className="order-timings">
                                        <span>ORDER TIMINGS:</span>
                                        <span>Breakfast - Upto 10PM previous day</span>
                                        <span>Lunch - Upto 10AM same day</span>
                                        <span>Dinner - Upto 5PM same day</span>
                                    </div>
                                </div>
                                <div className="outer-div-right">
                                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{OrderData[selectedItemIndex]?.itemName}</span>
                                    <span style={{ fontSize: '20px', color: 'red' }}>{`Rs. ${OrderData[selectedItemIndex]?.itemPrice}`}</span>
                                    <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{OrderData[selectedItemIndex]?.itemDetails}</span>
                                    <span className="select-field">
                                        <label>MEAL TYPE</label>
                                        <select value={mealType} onChange={handleMealTypeChange}>
                                            <option>Lunch</option>
                                        </select>
                                    </span>
                                    <span className="select-field">
                                        <label>MEAL PLAN</label>
                                        <select value={mealPlan} onChange={handleMealPlanChange}>
                                            <option>Single Day</option>
                                        </select>
                                    </span>
                                    <span className="select-field">
                                        <label>Meal Quantity</label>
                                        <input type="number" value={mealQuantity} onChange={handleMealQuantityChange} />
                                    </span>
                                    <span className="add-ons-title">Add-ons</span>
                                    <span>GULAB JAMOON</span>
                                    <span>
                                        <input
                                            type="number"
                                            value={addOns.gulabJamoon}
                                            onChange={(e) => handleAddOnsChange('gulabJamoon', e.target.value)}
                                            className="add-ons-input"
                                        />
                                    </span>
                                    <span>
                                        <button type="submit" className="add-to-cart-button">
                                            <Cart3 /> ADD TO CART
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showLoginModal && (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p style={{ fontWeight: 'bold' }}>Please login to continue order</p>
                                <button className="btn btn-primary" onClick={() => setShowLoginModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
