import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormScreen from './components/FormScreen';
import OrderScreen from './components/OrderScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormScreen />} />
        <Route path="/cart" element={<OrderScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
