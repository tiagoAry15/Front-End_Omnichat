import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

//actions
import { getEarningChartsData } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const Earning = ({ dataColors }) => {
  const dispatch = useDispatch();
  const apexlineColors = getChartColorsArray(dataColors);

  const { earningChartData } = useSelector((state) => ({
    earningChartData: state.DashboardSaas.earningChartData,
  }));

  const options = {
    chart: {
      toolbar: "false",
      dropShadow: {
        enabled: !0,
        color: "#000",
        top: 18,
        left: 7,
        blur: 8,
        opacity: 0.2,
      },
    },
    dataLabels: {
      enabled: !1,
    },
    colors: apexlineColors,
    stroke: {
      curve: "smooth",
      width: 3,
    },
  };

  const series = [
    {
      name: "Series 1",
      data: [...earningChartData],
    },
  ];

  /*
  call api action to receive data
  */
  useEffect(() => {
    dispatch(getEarningChartsData("jan"));
  }, [dispatch]);

  const [seletedMonth, setSeletedMonth] = useState("jan");
  const onChangeMonth = (value) => {
    setSeletedMonth(value);
    dispatch(getEarningChartsData(value));
  };

  return (
    <React.Fragment>
      <Col xl="8">
        <Card>
          <CardBody>
            <div className="clearfix">
             
              <h4 className="card-title mb-4">Pedidos por status</h4>
            </div>

            <Row>
              <Col lg="4">
                <div className="text-muted">
                  <div className="mb-4">
                    <p>Finalizados</p>
                    <h4>40 Pedidos</h4>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2">Cancelados</p>
                    <h5>8 Pedidos</h5>
                  </div>
                </div>
              </Col>

              <Col lg="8">
                <div id="line-chart" dir="ltr">
                  <ReactApexChart
                    series={series}
                    options={options}
                    type="line"
                    height={320}
                    className="apex-charts"
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Earning;
