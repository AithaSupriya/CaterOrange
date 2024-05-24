import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../styles/AdressSelection.css'
import AddAddress from './Addadress';
import trashIcon from '../images/trashIcon.svg'


const AddressSelection = ({ onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      let id = await localStorage.getItem('id');
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/userAdress/${id}`);
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [addresses]);

  const handleDeleteAddress = async (id) => {

    try {
      let userid = await localStorage.getItem('id');
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/userAdress/${userid}/${id}`);
      setAddresses(addresses.filter(address => address._id !== id));
      setSelectedAddress(null);
      onSelectAddress(null); // Clear selected address if deleted
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };



  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    onSelectAddress(address);
  };

  const handleShowAllAddresses = () => {
    setShowAllAddresses(!showAllAddresses);
  };

  return (
    <div className="address-container">
      <AddAddress />
      <div className="select-address">
        <div style={{ display: 'flex' }}>
          <h3 className='select'>Select Address</h3>
        </div>
        <form>
          {addresses.slice(0, showAllAddresses ? addresses.length : 3).map((address) => (
            <div key={address._id} style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <input
                type="radio"
                id={address._id}
                name="address"
                value={address._id}
                checked={selectedAddress && selectedAddress._id === address._id}
                onChange={() => handleAddressSelection(address)}
              />
              <label htmlFor={address._id}>
                <span className="address-preview">
                  {address.street}, {address.pincode}
                </span>
              </label>
              <img src={trashIcon} alt="Delete" onClick={() => handleDeleteAddress(address._id)} style={{ cursor: 'pointer' }} />
            </div>
          ))}
        </form>
        {addresses.length > 3 && (
          <button onClick={handleShowAllAddresses}>
            {showAllAddresses ? 'Show less' : 'Show all'}
          </button>
        )}
      </div>
      {selectedAddress && (
        <div className="delivery-address">
          <h3 style={{ color: '#00215E' }}>Delivery Address:</h3>
          <p>
            {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressSelection;
