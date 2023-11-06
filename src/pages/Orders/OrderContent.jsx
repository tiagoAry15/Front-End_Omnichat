// OrderScreenContent.jsx
import React, { useContext } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody, Container, Button, Input, Form, Label, FormGroup } from "reactstrap";
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PlatformIcon from './PopUpIcon';
import 'bootstrap/dist/css/bootstrap.min.css';

import { OrderContext } from './OrderContext';
import { useTranslation } from 'react-i18next';


const OrderContent = () => {

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

  const { t } = useTranslation();

  document.title = "Omnichat";
  return (

    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title='Omnichat' breadcrumbItem={t("Order")} />
        <div style={styles.container} className='right'>
          {orders.map((order, index) => (
            <div key={orderKeys[index]} style={styles.card} className={`order-item ${deletingOrderId === orderKeys[index] ? 'up' : ''}`}>
              <div style={styles.container_between}>
                <h3 style={styles.customerName}>{index + 1}: {order.customerName}</h3>
                <PlatformIcon platform={order.platform} communication={order.communication} />
              </div>
              <p style={styles.pizza}>{order.pizza}</p>
              <p className="observation-field"><p><strong>Detalhes do pedido:</strong></p>{order.pizzaName} <p><br></br><strong>Observação:</strong></p>{order.observation}</p>
              <div style={styles.container_between}>
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
            </div>

          ))}
          <ToastContainer />
        </div>
      </Container>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'start',
    overflowX: 'auto',
    padding: '20px',
  },
  container_between: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    margin: '10px',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '100%'
  },
  customerName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  pizza: {
    fontSize: '16px',
  },

};

export default OrderContent;
