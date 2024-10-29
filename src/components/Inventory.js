
import React, { useState, useEffect } from 'react';
import { ref, onValue, set, remove, update } from 'firebase/database';
import { db } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import AddInventoryItem from './AddInventoryItem';
import EditInventoryItem from './EditInventoryItem';
import './Dashboard.css';

const categories = ['dashboard', 'authentication', 'users', 'products', 'categories', 'invoices'];

const Inventory = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); 
  const [inventory, setInventory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const inventoryRef = ref(db, `inventory/${selectedCategory}`);
    onValue(inventoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const inventoryArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setInventory(inventoryArray);
      } else {
        setInventory([]); 
      }
    });
  }, [selectedCategory]);

  const addItem = (item) => {
    const newItemRef = ref(db, `inventory/${selectedCategory}/${Date.now()}`); 
    set(newItemRef, item).then(() => {
      setInventory([...inventory, { id: Date.now(), ...item }]); 
    });
  };

  const deleteItem = (id) => {
    const itemRef = ref(db, `inventory/${selectedCategory}/${id}`);
    remove(itemRef).then(() => {
      setInventory(inventory.filter((item) => item.id !== id)); 
    });
  };

  const editItem = (updatedItem) => {
    const itemRef = ref(db, `inventory/${selectedCategory}/${updatedItem.id}`);
    update(itemRef, updatedItem).then(() => {
      setInventory(
        inventory.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setIsEditing(false);
    });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('token'); 
      window.location.reload(); 
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li><a href="#dashboard" onClick={() => setSelectedCategory('dashboard')}>Dashboard</a></li>
            <li><a href="#authentication" onClick={() => setSelectedCategory('authentication')}>Authentication</a></li>
            <li><a href="#users" onClick={() => setSelectedCategory('users')}>Users</a></li>
            <li><a href="#products" onClick={() => setSelectedCategory('products')}>Products</a></li>
            <li><a href="#categories" onClick={() => setSelectedCategory('categories')}>Categories</a></li>
            <li><a href="#invoices" onClick={() => setSelectedCategory('invoices')}>Invoices</a></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Inventory</h2>
        </header>

        <div className="inventory-grid">
          {inventory.map((item) => (
            <div key={item.id} className="inventory-card">
              <div className="card-content">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="card-actions">
                <button onClick={() => deleteItem(item.id)} className="delete-button">Delete</button>
                <button onClick={() => { setCurrentItem(item); setIsEditing(true); }}>Edit</button>
              </div>
            </div>
          ))}
        </div>

        <div className="form-section">
          {isEditing ? (
            <EditInventoryItem
              currentItem={currentItem}
              editItem={editItem}
              setIsEditing={setIsEditing}
            />
          ) : (
            <AddInventoryItem addItem={addItem} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Inventory;
