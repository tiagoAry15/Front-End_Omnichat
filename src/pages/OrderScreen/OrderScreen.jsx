import React from 'react';
import './OrderScreen.css'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderScreenContent from './OrderScreenContent'; // Use import padrão
import { OrderScreenProvider } from './OrderScreenContext';

const OrderScreen = () => {
  return (
    <>
      <OrderScreenProvider>
        <OrderScreenContent />
      </OrderScreenProvider>
    </>
  );
};

export default OrderScreen;
