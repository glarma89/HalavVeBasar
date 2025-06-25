import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OrderScreen() {
  const productsByCategory = useSelector((state) => state.cart.productsByCategory);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
  const { name, address, email } = formData;

  if (!name.trim() || !address.trim() || !email.trim()) {
    alert('נא למלא את כל השדות');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('כתובת המייל אינה תקינה');
    return;
  }

  const payload = {
    ...formData,
    products: productsByCategory,
  };

  fetch("http://localhost:5000/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .catch(err => console.error("Error:", err));
};

  return (
    <div style={{ padding: 20 }}>
      <h2>לִבדוֹק</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          required
          type="text"
          name="name"
          placeholder="שם"
          value={formData.name}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          required
          type="text"
          name="address"
          placeholder="כתובת"
          value={formData.address}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="מייל"
          value={formData.email}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      <h3>עגלה</h3>
      {Object.keys(productsByCategory).length === 0 ? (
        <p>אין פריטים בעגלה.</p>
      ) : (
        Object.entries(productsByCategory).map(([category, products]) => (
          <div key={category} style={{ marginBottom: 10 }}>
            <strong>{category}</strong>
            <ul>
              {products.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        ))
      )}

      <button onClick={handleSubmit} style={{ marginRight: '10px' }}>
        שלח הזמנה
      </button>
      <button onClick={() => navigate('/')}>עבור אל הוספת מוצר</button>
    </div>
  );
}

export default OrderScreen;
