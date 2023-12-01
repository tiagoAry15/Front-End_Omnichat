import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

import { SocketContext } from "../../contexts/SocketContext";

import { Link } from "react-router-dom";

import classNames from "classnames";

import { useSelector, useDispatch } from "react-redux";
import { getChartsData as onGetChartsData } from "../../store/actions";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import StackedColumnChart from "./StackedColumnChart";

//Import Components
import CardUser from "./card-user";
import MiniWidget from "./mini-widget";
import Earning from "./earning";
import SalesAnalytics from "./sales-analytics";
import SocialSource from "./SocialSource";



const DashboardSaas = (props) => {
  const { orders } = useContext(SocketContext);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");
  const [data, setData] = useState()
  const [totalPedidos, setTotalPedidos] = useState()
  const [receita, setReceita] = useState()


  const createPedidos = () => {
    setTotalPedidos(orders.length)
  }

  const createReceita = () => {
    let receita = [];
    orders.map(order => {
      order.orderItems.map(item => {
        receita.push(item.price);
      });
    })

    let newArray = receita.map(item => item === undefined ? 0 : item);
    let total = newArray.reduce((a, b) => a + b, 0);


    setReceita(total); // Isso irá imprimir o total no console


    console.log(total)
  }

  const createTempoMedio = () => {
    //todo
  }

  const reports = [
    {
      icon: "bx bx-archive-in",
      title: "Receita",
      value: "R$" + receita + "0",

    },
    {
      icon: "bx bx-time",
      title: "Tempo Medio(minuto)",
      value: "25minutos",

    },
  ];
  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData
  }));


  useEffect(() => {
    setData(orders)
    console.log(orders)
    createPedidos()
    createReceita()
    createTempoMedio()
  }, [orders])


  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetChartsData("yearly"));

  }, [dispatch]);


  //meta title
  document.title =
    "Dashboard | Omnichat";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Breadcrumbs title="Dashboards" breadcrumbItem="Omnichat" />

          <CardUser orders={totalPedidos} />

          <Row className="align-center">
            <Col xl="8"  >
              <Row >
                <MiniWidget reports={reports} />

              </Row>
              <Row xs="4">
                <Earning dataColors='["--bs-primary"]' />
                <SocialSource />
              </Row>
            </Col>
            <SalesAnalytics dataColors='["--bs-success", "--bs-danger", "--bs-primary"]' />
          </Row>

          <Row>

          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardSaas;
