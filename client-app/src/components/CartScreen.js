import React from 'react';
import { useSelector } from 'react-redux';

function CartScreen() {
  const productsByCategory = useSelector((state) => state.cart.productsByCategory);

  return (
    <div className="list">
      <h2>רשימת סחורות</h2>
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
    </div>
  );
}

export default CartScreen;