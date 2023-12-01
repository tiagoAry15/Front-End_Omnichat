import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { SocketContext } from "../../contexts/SocketContext";


const SalesAnalytics = ({ dataColors }) => {

  const { orders } = useContext(SocketContext);

  const [data, setData] = useState()  
  const [socials, setSocials] = useState()
  const [instagram, setInstagram] = useState(0);
  const [whatsapp, setWhatsapp] = useState(0);
  const [messenger, setMessenger] = useState(0)

  useEffect(() => {
    setData(orders)
    console.log(orders)
    setRedes()
  },[orders])

  const setRedes = () => {
    let platforms = orders.map(obj => obj.platform);

    console.log(platforms)

    let count = platforms.reduce((acc, platform) => {
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {});

    console.log(count)

    // let array = Object.entries(count).map(([title, description]) => ({ title, description: description.toString() }));


    // // let top1 = top5.slice(0, 1);

    setSocials(count)

   

    if (count.Instagram === undefined) {
      setInstagram(0)
    } else {
      setInstagram(count.Instagram)
    }

    if (count.WhatsApp === undefined) {
      setWhatsapp(0)
    } else {
      setWhatsapp(count.Whatsapp)
    }

    if (count.Messenger === undefined) {
      setMessenger(0)
    } else {
      setMessenger(count.Messenger)
    }

    console.log(instagram)
    console.log(whatsapp)
    console.log(messenger)

    console.log(socials)

   

 
  }

  const apexsaleschartColors = getChartColorsArray(dataColors);
  const series = [whatsapp, instagram, messenger];
  const options = {
    labels: ["WhatsApp", "Instagram", "Messenger"],
    colors: apexsaleschartColors,
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  return (
    <React.Fragment>
      <Col xl="4">
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Pedidos por rede social</h4>

            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="donut"
                  height={260}
                  className="apex-charts"
                />
              </div>
            </div>

            <div className="text-center text-muted">
              <Row>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" />WhatsApp  
                    </p>
                    <h5>{whatsapp} Pedidos</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Instagram
                    </p>
                    <h5>{instagram} Pedidos</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-primary me-1" /> Messenger
                    </p>
                    <h5>{messenger} Pedidos</h5>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SalesAnalytics;
