import React, { useEffect, useState} from "react";
import { Container,
  Row,
  Col,
  Card,
  CardBody,
   } from "reactstrap";

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
import TotalSellingProduct from "./total-selling-product";
import SocialSource from "./SocialSource";


const DashboardSaas = (props) => {
  const reports = [
    {
      icon: "bx bx-copy-alt",
      title: "Pedidos",
      value: "48",
      badgeValue: "+ 2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-archive-in",
      title: "Receita",
      value: "R$ 1440",
      badgeValue: "+ 2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-time",
      title: "Tempo Medio(minuto)",
      value: "25minutos",
      badgeValue: "1%",
      color: "success",
      desc: "From previous period",
    },
  ];
  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData
  }));

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

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

          <CardUser />

          <Row className="align-center">
            <Col xl="8"  >
              <Row >
                <MiniWidget reports={reports} />
              </Row>
            </Col>
            <SalesAnalytics dataColors='["--bs-success", "--bs-danger", "--bs-primary"]' />
          </Row>

          <Row>

          </Row>
          <Row>

          <Earning dataColors='["--bs-primary"]' />
            <Col xl="4">
              <SocialSource />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardSaas;
