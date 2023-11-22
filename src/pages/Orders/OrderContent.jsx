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
          ModalFooter} from "reactstrap";
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
  const [selectOrderIndex, setSelectorderIndex] = useState(null);
  const buildOrderItemsText = orderItems => {
    let orderItemsText = '';
    let flavorsText = '';
    console.log(orderItems);
    if (orderItems.length !== 0) {
      orderItems.forEach((item) => {
        if (item.flavors.length > 1) {
          flavorsText = `(${item.flavors.join('/')})`;
        }
        else if (item.flavors.length === 1) {
          flavorsText = `${item.flavors[0]}`;
        }
        orderItemsText += `${item.quantity} X ${flavorsText} ${item.size}\n`;
      })
    }
    return orderItemsText;
  }
  const { t } = useTranslation();
  document.title = t("pedidos-title-page");
  return (

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
                }}
                >
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
                      <p className="observation-field">
                        <p>
                          <strong>{props.t("detalhesDoPedidoCard")}</strong>{buildOrderItemsText(order.orderItems)}<strong>{props.t("observacaoCard")}:</strong></p>{order.observation}</p>
                      <div className='container_between'>
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
                        <i className="bx bx-map map_icon" onClick={() => handleCopy(order.address)}></i>
                      </div>

                      <Button color="primary" onClick={() => {
                        setModal(!modal);
                        setSelectorderIndex(index);
                        }}>
                      {props.t("updateOrder")}
                      </Button>
                      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                        <ModalHeader toggle={() => {
                          setModal(!modal)
                          }}>
                            {selectOrderIndex !== null && orders[selectOrderIndex].customerName}
                          </ModalHeader>
                        <ModalBody>
                        <Form
                              onSubmit={submitEditOrder}
                            >
                              <FormGroup>

                                {order.orderItems.map((orderItem, itemIndex) => (
                                  <div key={itemIndex}>
                                    {orderItem.flavors.map((flavor, flavorIndex) => (
                                      <div key={flavorIndex}>
                                        <Label>{flavor}</Label>
                                        <Input
                                          type="text"
                                          name={`flavorQuantity_${index}_${itemIndex}_${flavorIndex}`}
                                          placeholder={`Altere o produto: ${flavor}`}
                                          onChange={(event) => changeItem(event, itemIndex, flavorIndex)}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ))}

                                <Label>
                                  {props.t("nomeLabel")}
                                </Label>
                                <Input
                                  type="text"
                                  name="customerName"
                                  placeholder={orders[selectOrderIndex].customerName}
                                  onChange={(event) => changeItem(event, index)}


                                />

                                <Label>
                                  {props.t("comunicacaoLabel")}
                                </Label>
                                <Input
                                  type="text"
                                  name="communication"
                                  placeholder={orders[selectOrderIndex].communication}
                                  onChange={(event) => changeItem(event, index)}
                                />
                                <Label>
                                  {props.t("observacaoLabel")}
                                </Label>
                                <Input
                                  type="text"
                                  name="observation"
                                  placeholder={orders[selectOrderIndex].observation}
                                  onChange={(event) => changeItem(event, index)}
                                />
                                <Label>
                                  {props.t("enderecoLabel")}
                                </Label>
                                <Input
                                  type="text"
                                  name="address"
                                  placeholder={orders[selectOrderIndex].address}
                                  onChange={(event) => changeItem(event, index)}
                                />
                              </FormGroup>
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
