// OrderScreenContent.jsx
import React, { useContext, useState } from 'react';
import {
  Row,
  Col,
  ModalHeader,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Button,
  Input,
  Form,
  Label,
  FormGroup,
  Modal,
  ModalBody,
  Spinner,
  CardHeader
} from "reactstrap";
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PlatformIcon from './PopUpIcon';
import 'bootstrap/dist/css/bootstrap.min.css';
import './orderCard.css'
import { OrderContext } from '../../contexts/OrderContext';
import { useTranslation, withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import OrderStatusProgress from './OrderStatusProgress';
import OrderTimestamp from './OrderTimestamp';
import ModalItemsList from './ModalItemsList';
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


  const { t } = useTranslation();
  document.title = t("pedidos-title-page");

  return (

    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title='Omnichat' breadcrumbItem={t("OrderScreen")} />
        {loading ? (
          <div className="loadingContainer">
            <Spinner style={{ width: '6rem', height: '6rem', }} />
            <h3>Carregando Pedidos...</h3>
          </div>
        ) : error.message ? (
          <div className="errorContainer">
            <h3>{error.message}</h3>
            <Button
              onClick={() => {
                // Ao clicar no botão, tente obter o menu novamente.
                loadMenu()
              }}
              className="btn btn-danger">
              Tentar novamente
            </Button>
          </div>
        ) : orders.length === 0 ? (

          <div className="no-orders-container">
            <div className="no-orders-content">
              <i className="bx bx-box icon-no-orders"></i> {/* Ícone representativo, pode ser alterado */}
              <p className="no-orders-text">Nenhum pedido encontrado</p>
            </div>
          </div>


        ) : (
          <div className='right orderContainer'>
            <Row style={{ width: '100%' }} >
              {[...orders].reverse().map((order, index) => {
                const reverseIndex = orders.length - 1 - index;

                return (
                  <Col md={4} key={index} >
                    <Card
                      key={index}
                      className='orderCard'
                      tyle={{
                        borderRadius: '10px',
                      }}
                    >
                      <CardHeader style={{
                        width: '100%',
                        backgroundColor: '#2A3042',
                        borderRadius: '10px 10px 0 0'
                      }}>
                        <CardTitle tag='h5' >
                          <div className='container_between'>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}>
                              <PlatformIcon platform={order.platform} communication={order.communication} />
                              <h5 className='customerName ' style={{ paddingLeft: '6%' }}>{order.customerName}</h5>
                            </div>
                            <h5 className='customerName'>N°: {reverseIndex + 1}</h5>

                          </div>




                        </CardTitle>

                      </CardHeader>
                      <CardBody >

                        <CardText>

                          <OrderStatusProgress status={order.status} />
                        </CardText>

                        <CardText>

                          <div className="observation-field" onClick={() => toggleModal(index)}>
                            <strong>{props.t("detalhesDoPedidoCard")}</strong>
                            {order.orderItems.map((orderItem, itemIndex) => (
                              <div key={itemIndex}>
                                {orderItem.quantity} - {orderItem.flavors.join(' / ')} - {orderItem.size == "Large" ? props.t("grandeCard") : orderItem.size}
                              </div>
                            ))}



                            {order.observation && order.observation != "None" ?
                              (
                                <>
                                  <strong>{props.t("observacaoCard")}</strong>
                                  <p style={{ margin: "0" }}>{order.observation}</p>
                                </>
                              )
                              : (<strong>{props.t("semObservacaoCard")}</strong>)}
                            <i className="bx bx-edit-alt" style={{ marginLeft: "5px" }} />
                          </div>

                          <Modal isOpen={modalOrders[index]} toggle={() => toggle(index)}>
                            <ModalHeader toggle={() => {
                              setModalOrders(!modalOrders)
                            }}>
                              <strong>Altere detalhes do pedido de {order.customerName}</strong>
                            </ModalHeader>

                            <ModalBody>


                              <ModalItemsList t={props.t} orderItems={order.orderItems} />
                              <Label>
                                {props.t("observacaoLabel")}
                              </Label>
                              <Input
                                type="text"
                                name="observation"
                                placeholder={order.observation}
                                onChange={(event) => changeItem(event, index)}
                              />
                              <Button color='success' className='mt-3 d-grid width btn'>
                                {props.t("updateOrder")}
                              </Button>
                            </ModalBody>
                          </Modal>


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

                        <CardText style={{ margin: "0" }}>
                          <div className='container_between'>
                            <p>pedido feito em: </p> <OrderTimestamp timestamp={order.timestamp}></OrderTimestamp>
                          </div>

                        </CardText>

                        <Button color="primary" onClick={() => { toggleModalInfo(index) }}>
                          {props.t("detailsOrder")}
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                )
              })}
            </Row>
            <ToastContainer />
          </div>)

        }

      </Container >
    </div >
  );
}

export default withRouter(withTranslation()(OrderContent));
