import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Cart.css";
import { Link } from "react-router-dom";
import OrderData from '../datas/DataCollection';
import { useCart } from '../Hooks/CartContext';
import AddressSelection from '../components/AddressSelection';
import AddAddress from '../components/Addadress';


const Cart = () => {
    const [products, setProducts] = useState([]);
    const { cart, addToCart, setCartItems } = useCart();
    const [OrderAddress, setOrderAddress] = useState('');


    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    console.log("env url", backendUrl);

    if (process.env.REACT_APP_DEBUG === 'true') {
        console.log('Debugging output...');
    }

    useEffect(() => {
        // Function to update local storage and recalculate total
        const updateLocalStorageAndTotal = () => {
            // Update local storage whenever cart items change
            localStorage.setItem('cartItems', JSON.stringify(products));

            // Recalculate total
            const total = calculateSubtotal().total;
            // Update the UI or perform any other action with the total
            console.log('Total:', total);
        };

        // Call the function initially and whenever products state changes
        updateLocalStorageAndTotal();
    }, [products]);


    useEffect(() => {
        setProducts(cart);
    }, [cart]);

    //For AddOns
    const handleIncrement = async (itemName) => {
        try {
            const updatedProducts = await Promise.all(products.map(async (item) => {
                if (item.addOns && itemName === 'Gulab Jamoon') {
                    item.addOns.gulabJamoon += 1;
                    await axios.put(`${backendUrl}/api/updateOrderDetails/${item._id}`, {
                        addOns: { gulabJamoon: item.addOns.gulabJamoon }
                    });
                } else if (item.mealQuantity && itemName === 'Veg Meal') {
                    item.mealQuantity += 1;
                    await axios.put(`${backendUrl}/api/updateOrderDetails/${item._id}`, {
                        mealQuantity: item.mealQuantity
                    });
                }
                return item;
            }));
            console.log(updatedProducts, "test increment ")
            setProducts(updatedProducts);
            setCartItems(updatedProducts);
        } catch (error) {
            console.error('Error updating database:', error);
        }
    };

    const handleDecrement = async (itemName) => {
        try {
            const updatedProducts = await Promise.all(products.map(async (item) => {
                if (item.addOns && itemName === 'Gulab Jamoon') {
                    item.addOns.gulabJamoon -= 1;
                    if (item.addOns.gulabJamoon >= 0) {
                        await axios.put(`${backendUrl}/api/updateOrderDetails/${item._id}`, {
                            addOns: { gulabJamoon: item.addOns.gulabJamoon }
                        });
                    } else {
                        item.addOns.gulabJamoon += 1; // Revert back if quantity becomes negative
                    }
                } else if (item.mealQuantity && itemName === 'Veg Meal') {
                    item.mealQuantity -= 1;
                    if (item.mealQuantity >= 0) {
                        await axios.put(`${backendUrl}/api/updateOrderDetails/${item._id}`, {
                            mealQuantity: item.mealQuantity
                        });
                    } else {
                        item.mealQuantity += 1; // Revert back if quantity becomes negative
                    }
                }
                return item;
            }));
            setProducts(updatedProducts);
            setCartItems(updatedProducts);
        } catch (error) {
            console.error('Error updating database:', error);
        }
    };



    // Filtered OrderData based on conditions
    const filteredOrderData = OrderData.filter(item => {
        return (
            (item.itemName === 'Veg Meal' && products.some(product => product.mealQuantity >= 1)) ||
            (item.itemName === 'Gulab Jamoon' && products.some(product => product.addOns.gulabJamoon > 0))
            // (item.itemName === 'Todays Special Sweet' && products.some(product => product.addOns.todaysSpecialSweet > 0)) ||
            // (item.itemName === 'Moong Dal Halwa' && products.some(product => product.addOns.moongDalHalwa > 0))
        );
    });

    // Calculate subtotal based on filtered items
    const calculateSubtotal = () => {
        let subtotal = 0;
        filteredOrderData.forEach(item => {
            let quantity = 0;
            products.forEach(product => {
                if (item.itemName === 'Veg Meal' && product.mealQuantity >= 1) {
                    quantity += product.mealQuantity;
                } else if (item.itemName === 'Gulab Jamoon') {
                    quantity += product.addOns.gulabJamoon;
                }
                // } else if (item.itemName === 'Todays Special Sweet') {
                //     quantity += product.addOns.todaysSpecialSweet;
                // } else if (item.itemName === 'Moong Dal Halwa') {
                //     quantity += product.addOns.moongDalHalwa;
                // }
            });
            subtotal += item.itemPrice * quantity;
        });

        const GST = 0.18 * subtotal; // Assuming 18% GST
        const total = subtotal + GST;

        return {
            subtotal: subtotal.toFixed(2),
            GST: GST.toFixed(2),
            total: total.toFixed(2)
        };
    };

    // const orderDetails = {
    //     products,
    //     address: OrderAddress,
    //     total: calculateSubtotal().total,
    // };


    // console.log("order details", orderDetails)


    const handleCheckout = async () => {
        try {
            const userId = await localStorage.getItem('id');
            const orderDetails = {
                products,
                address: OrderAddress,
                total: calculateSubtotal().total,
            };
            console.log(userId);


            const response = await axios.post(`${backendUrl}/api/createOrder/${userId}`, orderDetails);
            if (response.status === 201) {
                const paymentResponse = await axios.post(`${backendUrl}/api/pay`);
                if (paymentResponse.status === 200) {
                    window.location.href = paymentResponse.data.data.instrumentResponse.redirectInfo.url;
                    console.log(paymentResponse.data.data.merchantTransactionId, "merchanttranctionid");
                    // const transactionstatusresponce = await axios.post(`${backendUrl}/api/status/${paymentResponse.data.data.merchantTransactionId}`);
                    // console.log(transactionstatusresponce,"transaction status responce data ")
                    // if (transactionstatusresponce.data.success) {
                        await axios.delete(`${backendUrl}/api/deleteOrderDetails/${userId}`)
                        setProducts([]);
                        setCartItems([]);
                        localStorage.removeItem('cartItems');
                        // alert('Order created successfully!');

                    // }
                }




            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const handleAddressSelect = (selectedAddress) => {
        setOrderAddress(selectedAddress)
    }



    return (
        <div className='cart-main-div'>
            <div className='cart-child1'>
                Order
            </div>
            <div className='cart-child2'>
                <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>&nbsp; {'>'}<Link to="/OrderHistory">Order</Link>
            </div>
            <div className='cart-child3'>
                <div className='order-table-div'>
                    <table className="table table-striped cart-table my-table" >
                        <thead>
                            <tr >
                                <th scope="col" className="table-success">Product</th>
                                <th scope="col" className="table-success">Price</th>
                                <th scope="col" className="table-success">Quantity</th>
                                <th scope="col" className="table-success">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render table rows for filtered items */}
                            {filteredOrderData.map((item, index) => {
                                let quantity = 0;
                                products.forEach(product => {
                                    if (item.itemName === 'Veg Meal' && product.mealQuantity >= 1) {
                                        quantity += product.mealQuantity;
                                    } else if (item.itemName === 'Gulab Jamoon') {
                                        quantity += product.addOns.gulabJamoon;
                                    }
                                    // Add similar conditions for other items if needed
                                });
                                const total = item.itemPrice * quantity;
                                return (
                                    <tr key={index}>
                                        <td className='product-info'>{item.itemName}<br />{item.itemDetails}</td>
                                        <td>{item.itemPrice}</td>
                                        <td>
                                            {item.itemName === 'Veg Meal' || item.itemName === 'Gulab Jamoon' ? (
                                                <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                                                    <button onClick={() => handleDecrement(item.itemName)} style={{ backgroundColor: '#EE4266', border: 'none', width: '3rem', borderRadius: '10%', color: 'white', fontSize: '20px' }}>-</button>
                                                    {quantity}
                                                    <button onClick={() => handleIncrement(item.itemName)} style={{ backgroundColor: '#EE4266', border: 'none', width: '3rem', borderRadius: '10%', color: 'white', fontSize: '20px' }}>+</button>
                                                </div>
                                            ) : (
                                                // Render nothing for other items
                                                null
                                            )}
                                        </td>
                                        <td>{total.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div style={{ marginTop: '5rem' }}>
                        <AddressSelection onSelectAddress={handleAddressSelect} />
                    </div>

                </div>
                <div className='payment-div'>
                    <div className='payment-div-child-1'>
                        <div>Cart Total</div>
                        <hr />
                        <div className='payment-item'>
                            <span>Subtotal</span>
                            <span>Rs {calculateSubtotal().subtotal}</span>
                        </div>
                        <hr />
                        <div className='payment-item'>
                            <span>GST</span>
                            <span>Rs {calculateSubtotal().GST}</span>
                        </div>
                        <hr />
                        <div className='payment-item'>
                            <span>Total</span>
                            <span>Rs {calculateSubtotal().total}</span>
                        </div>
                        <hr />
                        <div>

                            {calculateSubtotal().subtotal > 0 ? (
                                <div style={{ textAlign: 'center' }}>
                                    <button className='payment-btn-1' onClick={handleCheckout}>Check out</button>
                                </div>
                            ) : (
                                <div className="checkout" >
                                    <span>Minimum Order value is Rs. 80.</span>
                                    <span>Continue Ordering !!!</span>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className='payment-div-child-2'>
                        <button className='payment-btn-2'>CONTINUE ORDERING</button>
                    </div>
                    {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <AddAddress />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Cart;
