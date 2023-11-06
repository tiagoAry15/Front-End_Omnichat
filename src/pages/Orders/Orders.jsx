import React from 'react';
import './Orders.css'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderContent from './OrderContent'; // Use import padrão
import { OrderProvider } from './OrderContext';

const Orders = () => {
  return (
    <>
      <OrderProvider>
        <OrderContent />
      </OrderProvider>
    </>
  );
};

export default Orders;
