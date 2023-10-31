import React, { useTransition } from 'react';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useTranslation } from 'react-i18next';
import './createOrder.css'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../store/actions';
const createOrder =() =>{

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const d = new Date();
    const timestamp = `${d.getDate()}_${d.toLocaleString('en', { month: 'short' })}_${d.getFullYear()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}_${d.getMilliseconds()}`;


    const [orderData, setOrderData] = useState({
        address: '',
        communication: '',
        customerName: '',
        observation: '',
        pizzaName: '',
        platform: '',
        status: 'Em preparação',
        timestamp,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setOrderData({
            ...orderData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Convert the orderData to the desired format
        const formattedOrderData = {
          [orderData.timestamp]: {
            ...orderData,
          },
        };
    
        const jsonData = JSON.stringify(formattedOrderData);
        console.log('JSON Data:', jsonData);
        dispatch(addOrder(orderData));
        // You can dispatch `addOrder` action or perform any other operations with the JSON data here.
      };
    console.log(d.toLocaleTimeString());
  return (
    
    <div className='main'>
       <Breadcrumbs title='Criar Pedido n' breadcrumbItem={t("createOrders")} /> 
      <h1>Hello World</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
      <Input 
        type="text"
        name="customerName"
        placeholder='Nome do Cliente'
        value={orderData.customerName}
        onChange={handleChange}
        />
      <Input 
        type="text"
        name="pizzaName"
        placeholder='Tipo de Pizza'
        value={orderData.pizzaName}
        onChange={handleChange}
        />
      <Input 
        type="text"
        name="address"
        placeholder='Endereço'
        value={orderData.address}
        onChange={handleChange}
        />
      <Input 
        type="text"
        name="observation"
        placeholder='Observação'
        value={orderData.observation}
        onChange={handleChange}
        />
      <Input 
        type="text"
        name="communication"
        placeholder='Contato'
        value={orderData.communication}
        onChange={handleChange}
        />
      <Input 
        type="text"
        name="platform"
        placeholder='Plataforma'
        value={orderData.platform}
        onChange={handleChange}
        />
      <Button color='success' type="submit">Registrar pedido</Button>

      </FormGroup>
    </Form>
    </div>
  );
};

export default createOrder;
