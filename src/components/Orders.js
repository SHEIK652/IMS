
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database'; 
import { db } from '../firebase'; 

const Orders = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const ordersRef = ref(db, 'orders/'); 

    // Listen for changes to the 'orders' node
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data to an array format for rendering
        const ordersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setOrders(ordersArray);
      } else {
        setOrders([]); 
      }
      setLoading(false); 
    }, (error) => {
      setError(error.message); // Capture any errors
      setLoading(false); // Stop loading if there's an error
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>; // Loading state message
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state message
  }

  return (
    <div>
      <h2>Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order #{order.id} - {order.customer}
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p> // Message if no orders are present
      )}
    </div>
  );
};

export default Orders;
