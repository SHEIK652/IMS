import React, { useState, useEffect } from 'react';

const EditInventoryItem = ({ currentItem, editItem, setIsEditing }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    if (currentItem) {
      setItemName(currentItem.name);
      setQuantity(currentItem.quantity);
    }
  }, [currentItem]);

  const handleUpdate = (e) => {
    e.preventDefault();
    editItem({ ...currentItem, name: itemName, quantity });
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleUpdate}>
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
      <button type="submit">Update Item</button>
      <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
};

export default EditInventoryItem;
