import React, { useState } from 'react';

const AddInventoryItem = ({ addItem }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1); 

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({ name: itemName, quantity });
    setItemName('');
    setQuantity(1); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddInventoryItem;
