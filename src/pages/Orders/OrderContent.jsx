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

  document.title = "Omnichat";
  return (

    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title='Omnichat' breadcrumbItem={t("Order")} />
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
              <p className='pizza'>{order.pizza}</p>
              <p className="observation-field"><p>
                <strong>Detalhes do pedido:</strong>{buildOrderItemsText(order.orderItems)}<strong>Observação:</strong></p>{order.observation}</p>
              <div className='container_between'>
                <select
                  value={selectedOptions[orderKeys[index]] || ''}
                  onChange={(event) => handleSelectChange(event, orderKeys[index])}
                  className={selectedOptions[orderKeys[index]] ? `selected-${selectedOptions[orderKeys[index]].toLowerCase()}` : 'select'}
                >
                  <option value="">Selecione</option>
                  <option value="Em preparação">Em preparação</option>
                  <option value="Pronto para entrega">Pronto para entrega</option>
                  <option value="A caminho">A caminho</option>
                  <option value="Entregue" >Entregue </option>
                </select>
                <i className="bx bx-map map_icon" onClick={() => handleCopy(order.address)}></i>
              </div>


              <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId={orderKeys[index]} className='btn-update'>
                    <strong>Atualizar pedido</strong>
                  </AccordionHeader>
                  <AccordionBody accordionId={orderKeys[index]}>
                    <Form
                      onSubmit={submitEditOrder}
                    >
                      <FormGroup>
                        <Label>
                          Nome
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
                          Comunicação
                        </Label>
                        <Input
                          type="text"
                          name="communication"
                          placeholder={order.communication}
                          value={orderToUpdate.communication}
                          onChange={changeItem}
                        />
                        <Label>
                          Observação
                        </Label>
                        <Input
                          type="text"
                          name="observation"
                          placeholder={order.observation}
                          value={orderToUpdate.observation}
                          onChange={changeItem}
                        />
                        <Label>
                          Endereço
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
                        Atualizar pedido!
                      </Button>
                      <Button color='danger' className='mt-3 d-grid width btn' onClick={() => handleDelete(orderKeys[index])}>
                        Encerrar atendimento
                      </Button>
                    </Form>

                  </AccordionBody>
                </AccordionItem>
              </Accordion>
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
