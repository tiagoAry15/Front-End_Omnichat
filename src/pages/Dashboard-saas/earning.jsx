  import React, { useEffect, useState, useContext } from "react";
  import { Row, Col, Card, CardBody } from "reactstrap";
  import { Link } from "react-router-dom";
  import ReactApexChart from "react-apexcharts";

  //actions
  import { getEarningChartsData } from "../../store/actions";
  import { SocketContext } from "../../contexts/SocketContext";
  //redux
  import { useSelector, useDispatch } from "react-redux";

  import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

  const Earning = ({ }) => {

    const { orders } = useContext(SocketContext);



    const [data, setData] = useState()  
    const [status, setStatus] = useState()

    useEffect(() => {
      setData(orders)
      setEarning()
    },[orders])

    const setEarning = () => {
      let earnings = []

      earnings = orders.map(obj => obj.status);

      let itemCount = earnings.reduce((acc, item) => {
        if (!acc[item]) {
          acc[item] = 1;
        } else {
          acc[item]++;
        }
        return acc;
      }, {});
      
      console.log(itemCount);
      setStatus(itemCount);
    }

    

    return (
      <React.Fragment>
        {data && status && (
          <Col sm="6">
            <Card>
              <CardBody>
                <div className="clearfix">
                  <h4 className="card-title mb-4">Pedidos por status</h4>
                </div>

                <Row>
                  <Col lg="4">
                    <div className="text-muted">
                      <div className="mb-6">
                        <p>Finalizados</p>
                        <h4>{status.Finalizado ? status.Finalizado : 0} Pedidos</h4>
                      </div>  

                      <div className="mt-4">
                        <p className="mb-2">Cancelados</p>
                        <h5>{status.Cancelado ? status.Cancelado : 0} Pedidos</h5>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        )}
      </React.Fragment>
    );

  };

  export default Earning;
