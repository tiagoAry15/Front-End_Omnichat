// OrderScreenContent.jsx
import React, { useContext } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody, Card, CardBody, CardTitle, CardSubtitle, CardText,Container, Button, Input, Form, Label, FormGroup } from "reactstrap";
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PlatformIcon from './PopUpIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import './orderCard.css'
import { OrderContext } from '../../contexts/OrderContext';
import { useTranslation, withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const OrderContent = (props) => {

  const {
    deletingOrderId,
    selectedOptions,
    orders,
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

  const buildOrderItemsText = orderItems => {
    let orderItemsText = '';
    let flavorsText = '';
    orderItems.forEach((item) => {
      if (item.flavors.length > 1) {
        flavorsText = `(${item.flavors.join('/')})`;
      }
      else if (item.flavors.length === 1) {
        flavorsText = `${item.flavors[0]}`;
      }
      orderItemsText += `${item.quantity} X ${flavorsText} ${item.size}\n`;
    })
    return orderItemsText;
  }
  const { t } = useTranslation();

  document.title = t("pedidos-title-page");
  return (

    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title='Omnichat' breadcrumbItem={t("OrderScreen")} />
        <div className='right orderContainer'>
          {orders.map((order, index) => (
            <Card style={{ width: '18rem'}}>
            <CardBody>
              <CardTitle tag="h5">
              <div className='container_between'>
                <h3 className='customerName'>{index + 1}: {order.customerName}</h3>
                <PlatformIcon platform={order.platform} communication={order.communication} />
              </div>
              </CardTitle>
              <CardText>
              <p className='pizza'>{order.pizza}</p>
              <p className="observation-field"><p>
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


              <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId={orderKeys[index]} className='btn-update'>
                    <strong>{props.t("updateOrderbtn")}</strong>
                  </AccordionHeader>
                  <AccordionBody accordionId={orderKeys[index]}>
                    <Form
                      onSubmit={submitEditOrder}
                    >
                      <FormGroup>
                        <Label>
                          {props.t("nomeLabel")}
                        </Label>
                        <Input
                          type="text"
                          name="customerName"
                          placeholder={order.customerName}
                          value={orderToUpdate.customerName}
                          onChange={changeItem}


                        />
                        <Label>
                          Pizza
                        </Label>
                        <Input
                          type="text"
                          name="pizzaName"
                          placeholder={order.pizzaName}
                          value={orderToUpdate.pizzaName}
                          onChange={changeItem}

                        />
                        <Label>
                          {props.t("comunicacaoLabel")}
                        </Label>
                        <Input
                          type="text"
                          name="communication"
                          placeholder={order.communication}
                          value={orderToUpdate.communication}
                          onChange={changeItem}
                        />
                        <Label>
                          {props.t("observacaoLabel")}
                        </Label>
                        <Input
                          type="text"
                          name="observation"
                          placeholder={order.observation}
                          value={orderToUpdate.observation}
                          onChange={changeItem}
                        />
                        <Label>
                          {props.t("enderecoLabel")}
                        </Label>
                        <Input
                          type="text"
                          name="address"
                          placeholder={order.address}
                          value={orderToUpdate.address}
                          onChange={changeItem}
                        />

                      </FormGroup>
                      <Button color='success'>
                        {props.t("updateOrder")}
                      </Button>
                      <Button color='danger' className='mt-3 d-grid width btn' onClick={() => handleDelete(orderKeys[index])}>
                      {props.t("endSession")}
                      </Button>
                    </Form>

                  </AccordionBody>
                </AccordionItem>
              </Accordion>
              </CardText>
            </CardBody>
          </Card>
          ))}
          <ToastContainer />
        </div>
        
      </Container>
    </div>
  );
}

export default withRouter(withTranslation()(OrderContent));
