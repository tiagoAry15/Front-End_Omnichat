import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"
import { SocketContext } from "../../contexts/SocketContext";



const SocialSource = () => {

  const { orders } = useContext(SocketContext);

  const [data, setData] = useState()
  const [pedidos, setPedidos] = useState()


  useEffect(() => {
    setData(orders)
    console.log(orders)
    setSabores()
  }, [orders])

  const setSabores = () => {
    let flavors = [];
    orders.map(order => {
      order.orderItems.map(item => {
        flavors = [...flavors, ...item.flavors];
      });
    });

    console.log(flavors)

    let count = flavors.reduce((acc, flavor) => {
      acc[flavor] = (acc[flavor] || 0) + 1;
      return acc;
    }, {});


    let array = Object.entries(count).map(([title, description]) => ({ title, description: description.toString() }));

    array.sort((a, b) => b.description - a.description);

    let top5 = array.slice(0, 5);

    // let top1 = top5.slice(0, 1);

    setPedidos(top5)



    console.log(pedidos)
  }





  const socials = [
    {
      title: "Calabresa",
      description: "20",
    },
    {
      title: "Quatro Queijos",
      description: "10",
    },
    {
      title: "Frango com Catupiry",
      description: "8",
    },
    {
      title: "Portuguesa",
      description: "7",
    },
    {
      title: "Pizza de chocolate",
      description: "3",
    },
  ]

  return (
    <React.Fragment>
        <Col sm="6">
          <Card>  
          <CardBody>
            <CardTitle className="mb-16">Top 5 Pedidos</CardTitle>
            {pedidos ? (<Row className="mt-4">
              {pedidos.map((pedido, key) => (
                <Col xs="4" key={"_li_" + key}>
                  <div className="social-source text-center mt-3">
                    <h5 className="font-size-15">{pedido.title}</h5>
                    <p className="text-muted mb-2">{pedido.description} Pedidos</p>
                  </div>
                </Col>
              ))}
            </Row>
            ) : (<h1>Carregando itens...</h1>)}

          </CardBody>
      </Card>
    </Col>
    </React.Fragment >
  )
}

export default SocialSource
