import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import CartScreen from './CartScreen';

function FormScreen() {
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5041/api/categories') 
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setCategory(data[0].name);
      })
      .catch((err) => console.error('Error loading categories:', err));
  }, []);

  const handleAdd = () => {
    if (product.trim()) {
      dispatch(addProduct({ category, product }));
      setProduct('');
    }
  };

  return (
    <div className="screen">
      <h1>מסך ראשון - רשימת קניה</h1>      
      <div className="input-row">
        <div className="input-wrapper">
          <label 
            htmlfor="category-select" 
            className="select-label"
          >
            בחר קטגוריה
          </label>
          <select 
            id="category"
            className="select-field"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div> 

        <input
          className="input-field"
          type="text"
          placeholder="שם המוצר"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </div>

      <button onClick={handleAdd} className="button">הוסף לעגלה</button>
      <button onClick={() => navigate('/cart')} className="button">
        המשך להזמנה
      </button>
      <CartScreen />
    </div>
  );
}

export default FormScreen;
