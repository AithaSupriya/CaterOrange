import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../styles/OrderHistory.css"
import OrderData from '../datas/DataCollection';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let id;
        const getOrderData = async () => {
            id = localStorage.getItem('id')

            try {
                if (id) {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllOrders/${id}`);
                    console.log("response", response.data)
                    setOrders(response.data)
                }
            } catch (e) {
                console.error('Failed to load token:', e);
            }
        }
        getOrderData()
    }, [])

    function convertSecondsToDate(seconds) {
        const milliseconds = seconds * 1000;
        const date = new Date(milliseconds);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return date.toLocaleString(undefined, options);
    }

    function convertISOToDate(isoString) {
        const date = new Date(isoString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return date.toLocaleString(undefined, options);
    }
    const calculateItemPrice = (quantity, itemName) => {
        const item = OrderData.find(product => product.itemName === itemName);
        return item ? item.itemPrice * quantity : 0;
    }


    return (
        <>
            <div>
                <h1>Orders</h1>
                <ul className='order-list'>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <li key={index} >
                                <div className='quantity'>
                                    <div >
                                        <p><span className="label">Email : </span> <span>{order.email}</span></p>
                                        <p><span className="label">Phone no : </span> <span>{order.phoneNumber}</span></p>
                                        <p><span className="label">Full Address : </span> <span> {order.address.fullAddress}</span></p>
                                        <p><span className="label">City : </span> <span> {order.address.city},</span></p>
                                        <p><span className="label">Landmark : </span> <span>{order.address.landmark}</span></p>
                                        <p><span className="label">Pincode : </span> <span> {order.address.pincode}</span></p>
                                        <p><span className="label">State : </span> <span>  {order.address.state}</span></p>
                                       
                                    </div>
                                    <div >

                                        <p><span className="label ">Order Date:</span> <span>{convertSecondsToDate(order.createdAt)}</span></p>

                                        {order.products.map((product, idx) => (
                                            <li key={idx}>
                                                <p><span className="label ">Delivery Date:</span> <span> {convertISOToDate(product.deliveryDate)}</span></p>
                                            </li>
                                        ))}
                                        <p><span className="label ">Order Total:</span> <span>{"₹" + order.total}</span></p>
                                    </div>
                                </div>




                                <ul >
                                    {order.products.map((product, idx) => {
                                        const vegMealPrice = calculateItemPrice(product.mealQuantity, 'Veg Meal');
                                        const gulabJamoonPrice = calculateItemPrice(product.addOns.gulabJamoon, 'Gulab Jamoon');
                                        return (

                                            <li key={idx}>
                                                <table>
                                                    <tr>
                                                        <th class="label">Quantity</th>
                                                        <th class="label">Meal Type</th>
                                                        <th class="label">Meal Cost</th>
                                                    </tr>
                                                    <tr>
                                                        <td>{product.mealQuantity}</td>
                                                        <td > Veg Meal </td>
                                                        <td > ₹{vegMealPrice.toFixed(2)} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>{product.addOns.gulabJamoon}</td>
                                                        <td>GulabJamoon</td>
                                                        <td>₹{gulabJamoonPrice.toFixed(2)}</td>
                                                    </tr>

                                                </table>

                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        ))
                    ) : (
                        <li>No orders found</li>
                    )}
                </ul>
            </div >
        </>
    )
}

export default OrderHistory