import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//Import Images
import avatar1 from "../../assets/images/users/Icone_Usuario.png"

function CardUser(props) {
  const [settingsMenu, setSettingsMenu] = useState(false)
  const [seletedMonth, setSeletedMonth] = useState("Mensal");
  const orders = props.orders;
  const user = useSelector((state) => state.Login.user);
  const onChangeMonth = (value) => {
    setSeletedMonth(value);
    dispatch(getEarningChartsData(value));
  };
  //Setting Menu


  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <div className="d-flex">
                    <div className="me-3">
                      <img
                        src={avatar1}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <p className="mb-2">Bem vindo</p>
                        <h6 className="mb-1">{user['email']}</h6>

                      </div>
                    </div>
                  </div>

                </Col>

                <Col lg="4" className="align-self-center">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <Row>
                      <Col xs="6">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Pedidos total
                          </p>
                          {orders && (
                            <h5 className="mb-0">{orders}</h5>
                          )
                          }

                        </div>
                      </Col>

                      <Col xs="6">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Clientes
                          </p>
                          <h5 className="mb-0">18</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>


                <Col lg="4" className="d-none  d-lg-block">



                  <div className="clearfix mt-4 mt-lg-0">
                    <div className="float-end ms-4">
                      <div className="input-group input-group-sm">
                        <select
                          className="form-select form-select-sm"
                          value={seletedMonth}
                          onChange={(e) => {
                            onChangeMonth(e.target.value);
                          }}
                        >
                          <option value="Mensal">Mensal</option>
                          <option value="3Meses">3 Meses</option>
                          <option value="6Meses">6 Meses</option>
                          <option value="Anual">Anual</option>
                        </select>
                        {/* <div className="input-group-append"> */}
                        {/* <label className="input-group-text">Month</label> */}
                        {/* </div> */}
                      </div>
                    </div>
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={() => {
                        setSettingsMenu(!settingsMenu)
                      }}
                      className="float-end"
                    >
                      <DropdownToggle tag="button" className="btn btn-primary">
                        <i className="bx bxs-cog align-middle me-1" /> Setting
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#">Action</DropdownItem>
                        <DropdownItem href="#">Another action</DropdownItem>
                        <DropdownItem href="#">Something else</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>



                </Col>

              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CardUser
