import React, { createContext, useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';


import {
  getOrders as onGetOrders,
  getOrderById as onGetOrderById,
  deleteOrder as onDeleteOrder,
  updateOrder as onUpdateOrder,
} from '../store/orders/actions';
import { toast } from 'react-toastify';
import { SocketContext } from "./SocketContext";
const OrderContext = createContext();
const OrderProvider = ({ children }) => {

  const { t } = useTranslation();
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [open, setOpen] = useState('');
  const dispatch = useDispatch();
  const { socket, displayErrorToast, displaySuccessToast } = useContext(SocketContext);
  const result = useSelector((state) => state.orders)
  useEffect(() => {
    dispatch(onGetOrders());
  }, [dispatch]);
  const [orderToUpdate, setOrderToUpdate] = useState({

    address: '',
    communication: '',
    customerName: '',
    observation: '',
    pizzaName: '',
  });


  useEffect(() => {
    if (socket) {

      const handleOrderReceive = (orderId) => {
        displaySuccessToast(t('orderReceived'));
        dispatch(onGetOrderById(orderId));
      };

      socket.on('order', handleOrderReceive);

      // Clean up
      return () => {
        socket.off('order', handleOrderReceive);
      };
    }
  }, [socket]);



  if (!result || !result.orders) {
    return null;
  }

  const orderKeys = Object.keys(result.orders);
  const orders = orderKeys.map((key) => result.orders[key]);

  const handleSelectChange = (event, id) => {
    setSelectedOptions({
      ...selectedOptions,
      [id]: event.target.value
    });
  };


  const handleCopy = (address) => {
    navigator.clipboard.writeText(address)
  };

  const handleDeleteOrder = (orderId) => {
    setDeletingOrderId(orderId);

    setTimeout(() => {
      dispatch(onDeleteOrder(orderId));
      setDeletingOrderId(null);
    }, 900);
  };

  const handleDelete = (id) => {
    toast.warn(
      <div>
        <h5>Deseja realmente encerrar o pedido de n° {id} ? </h5>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <button style={{ width: '50%' }} onClick={() => handleDeleteOrder(id)} className='btn'>Confirmar</button>
          <button style={{ width: '50%' }} onClick={toast.dismiss} className='btn'>Cancelar</button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };



  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const submitEditOrder = event => {
    event.preventDefault()
    const orderData = JSON.stringify(orderToUpdate);
    dispatch(onUpdateOrder(orderData))
  }

  const changeItem = event => {
    setOrderToUpdate({
      ...orderToUpdate,
      [event.target.name]: event.target.value
    })
  }

  return (
    <OrderContext.Provider
      value={{
        handleDelete,
        handleDeleteOrder,
        deletingOrderId,
        selectedOptions,
        open,
        orders,
        orderKeys,
        orderToUpdate,
        handleSelectChange,
        handleCopy,
        toggle,
        submitEditOrder,
        changeItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
