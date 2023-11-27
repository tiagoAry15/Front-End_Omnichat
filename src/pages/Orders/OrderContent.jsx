// OrderScreenContent.jsx
import React, { useContext, useState } from 'react';
import { Row, 
          Col, 
          Accordion, 
          AccordionItem, 
          AccordionHeader, 
          ModalHeader, 
          Card, 
          CardBody, 
          CardTitle, 
          CardSubtitle, 
          CardText, 
          Container, 
          Button, 
          Input, 
          Form, 
          Label, 
          FormGroup,
          Modal,
          ModalBody,
          ModalFooter,
        ListGroup,
        Table,
      ListGroupItem} from "reactstrap";
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PlatformIcon from './PopUpIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import './orderCard.css'
import { OrderContext } from '../../contexts/OrderContext';
import { useTranslation, withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { } from "reactstrap";
const OrderContent = (props) => {

  const {
    deletingOrderId,
    selectedOptions,
    orders,
    loading,
    error,
    orderKeys,
    handleSelectChange,
    handleCopy,
    handleDelete,
    toggle,
    submitEditOrder,
    changeItem,
    orderToUpdate,
    open,
  } = useContext(OrderContext);

  const [modal, setModal] = useState(false);
  const [modalOrders, setModalOrders] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);

  const toggleModalInfo = (index) => {
    setModalInfo({
      ...modalInfo,
      [index]: !modalInfo[index]
    });
  }
  const toggleModal = (index) => {
    setModalOrders({
      ...modalOrders,
      [index]: !modalOrders[index]
    });
  };
  
  const buildOrderItemsText = orderItems => {
    let orderItemsText = '';
    console.log(orderItems);
  
    if (orderItems.length !== 0) {
      orderItems.forEach((item) => {
        let flavorsText = '';
  
        if (item.flavors.length > 1) {
          flavorsText = `(${item.flavors.join('/')})`;
        } else if (item.flavors.length === 1) {
          flavorsText = `${item.flavors[0]}`;
        }
  
        orderItemsText += `${item.quantity} - ${flavorsText} - ${item.size} - \n`;
      });
    }
    return orderItemsText;
  }

const { t } = useTranslation();
document.title = t("pedidos-title-page");

return(

<div className="page-content">
  <Container fluid={true}>
  <Breadcrumbs title='Omnichat' breadcrumbItem={t("OrderScreen")} />
    <div className='right orderContainer'>
    <Row>
      {orders.map((order, index) => (
        <Col md={4} key={index}>
          <Card 
            key={index} 
            className='orderCard'
            style={{
              borderRadius: '20px',
              borderColor: '#2A3042',
              boxShadow: '5px 5px 20px 0px'
              }}>

<CardBody>

  <CardTitle tag="h5">
    <div className='container_between'>
      <PlatformIcon platform={order.platform} communication={order.communication} />
      <h3>{order.customerName}</h3>
      <h3 className='customerName'>ID: {index + 1}</h3>
    </div>
  </CardTitle>

    <CardText>
      <p className='pizza'>{order.pizza}</p>
        <p className="observation-field" onClick={() => toggleModal(index)}>
          <strong>{props.t("detalhesDoPedidoCard")}</strong>
          {order.orderItems.map((orderItem, itemIndex) => (
            <div key={itemIndex}>
              {orderItem.flavors.map((flavor, flavorIndex) => (
                <div key={flavorIndex}>
                  {orderItem.quantity} - {flavor}
                </div>
              ))}
              
              {order.quantity}
            </div>
          ))}
          <strong>{props.t("observacaoCard")}</strong>
          <p>{order.observation}</p>
        </p>

        <Modal isOpen={modalOrders[index]} toggle={() => toggle(index)}>
          <ModalHeader toggle={() => {
            setModalOrders(!modalOrders)
            }}>
          
            <strong>Altere detalhes do pedido de {order.customerName}</strong>
          </ModalHeader>
          
          <ModalBody>
            {order.orderItems.map((orderItem, itemIndex) => (
              <div key={`orderItem_${itemIndex}`}>
                <ListGroup key={`listGroup_${itemIndex}`}>
                  {orderItem.flavors.map((flavor, flavorIndex) => (
                    <ListGroupItem key={`flavor_${flavorIndex}`}>
                      <Table hover>
                        <thead>
                          <tr>
                            <th>
                              Qnt.
                            </th>
                            <th>
                              Pedido
                            </th>
                            <th>
                              Atualizar
                            </th>
                            <th>
                              Remover
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>

                            <td>
                              <Input placeholder= {orderItem.quantity}/>
                            </td>
                            <td>
                              <Input placeholder= {flavor}/>
                            </td>
                            <td scope='row'>
                            <Button color="success">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                            </svg>
                          </Button>
                            </td>
                            <td scope='row'>
                            <Button color="danger">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                          </svg>
                          </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                          


                          





                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
             ))}
          </ModalBody>

        </Modal>
          <Button color="primary" onClick={() => {toggleModalInfo(index)}}>
            {props.t("updateOrder")}
          </Button>
            <Modal isOpen={modalInfo[index]} toggle={() => setModalInfo(!modal)}>
              <ModalHeader toggle={() => {
                setModalInfo(!modal)
              }}>
                {order.customerName}
                <i className="bx bx-map map_icon" onClick={() => handleCopy(order.address)}></i>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={submitEditOrder}>
                  <FormGroup>
                    <Label>
                      {props.t("nomeLabel")}
                    </Label>
                   <Input
                      type="text"
                      name="customerName"
                      placeholder={order.customerName}
                      onChange={(event) => changeItem(event, index)}
                    />

                    <Label>
                      {props.t("comunicacaoLabel")}
                    </Label>

                    <Input
                      type="text"
                      name="communication"
                      placeholder={order.communication}
                      onChange={(event) => changeItem(event, index)}
                    />
                    
                    <Label>
                      {props.t("observacaoLabel")}
                    </Label>
                    
                    <Input
                      type="text"
                      name="observation"
                      placeholder={order.observation}
                      onChange={(event) => changeItem(event, index)}
                    />
                    
                    <Label>
                      {props.t("enderecoLabel")}
                    </Label>
                    
                    <Input
                      type="text"
                      name="address"
                      placeholder={order.address}
                      onChange={(event) => changeItem(event, index)}
                    />
                    </FormGroup>

                    <select
                    value={selectedOptions[orderKeys[index]] || ''}
                    onChange={(event) => handleSelectChange(event, orderKeys[index])}
                    className={selectedOptions[orderKeys[index]] ? `selected-${selectedOptions[orderKeys[index]].toLowerCase()}` : 'select'}
                    >
                  
                    <option value="">{props.t("selecione")}</option>
                    <option value="Em preparação">{props.t("Preparation")}</option>
                    <option value="Pronto para entrega">{props.t("Ready")}</option>
                    <option value="A caminho">{props.t("EnRoute")}</option>
                    <option value="Entregue" >{props.t("Delivered")} </option>
                    </select>
                              
                    <Button color='success' className='mt-3 d-grid width btn'>
                      {props.t("updateOrder")}
                    </Button>

                    <Button color='danger' className='mt-3 d-grid width btn' onClick={() => handleDelete(orderKeys[index])}>
                      {props.t("endSession")}
                    </Button>
                </Form>

                        </ModalBody>
                      </Modal>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <ToastContainer />
        </div>

      </Container>
    </div>
  );
}

export default withRouter(withTranslation()(OrderContent));
