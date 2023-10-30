import React from "react"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

const SocialSource = () => {
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
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Top 5 Pedidos</CardTitle>
          <div className="text-center">
            <div className="avatar-sm mx-auto mb-4">
            </div>
            <p className="font-16 text-muted mb-2"></p>
            <h5>
              <Link to="#" className="text-dark">
                Calabresa - <span className="text-muted font-16">20 Pedidos</span>{" "}
              </Link>
            </h5>
            <p className="text-muted">
              Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
              libero venenatis faucibus tincidunt.
            </p>
            <Link to="#" className="text-primary font-16">
              Learn more <i className="mdi mdi-chevron-right"></i>
            </Link>
          </div>
          <Row className="mt-4">
            {socials.map((social, key) => (
              <Col xs="4" key={"_li_" + key}>
                <div className="social-source text-center mt-3">
                  <h5 className="font-size-15">{social.title}</h5>
                  <p className="text-muted mb-0">{social.description} Pedidos</p>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default SocialSource
