import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";


import Menssager from "../../assets/images/chat/MenssagerIcon.png";
import whatts from "../../assets/images/chat/whatsappIcon.png";
import voltar from "../../assets/images/chat/return.png";
import avatar from "../../assets/images/users/Icone_Usuario.png";
import emailIcon from "../../assets/images/mail.png";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";

const UserProfile = (props) => {

  //meta title
  document.title = "Perfil";

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {

        setname(obj.email.split("@")[0]);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        import.meta.env.VITE_APP_DEFAULTAUTH === "fake" ||
        import.meta.env.VITE_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username);
        setemail(obj.email);
        setidx(obj.uid);
      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || '',
      idx: idx || '',
      email: email || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Por favor coloque seu nome de Usuário"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    }
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Breadcrumb title="Omnichat" breadcrumbItem={props.t("Profile")} />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">{props.t("ChangeYourData")}</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div style={styles.centralize_container}>
                  <div className="form-profile">
                    <Label className="form-label">{props.t("Username")}</Label>
                    <img className="img-register" src={avatar} />
                    <Input
                      name="username"
                      // value={name}
                      className="form-control"
                      placeholder={props.t("Username...")}
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.username || ""}
                      invalid={
                        validation.touched.username && validation.errors.username ? true : false
                      }
                    />
                    {validation.touched.username && validation.errors.username ? (
                      <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                    ) : null}
                    <Input name="idx" value={idx} type="hidden" />
                  </div>

                </div>
                <div style={styles.centralize_container}>
                  <div className="form-profile">
                    <Label className="form-label">{props.t("Email")}</Label>
                    <img className="img-register-menssager" src={emailIcon} />
                    <Input
                      name="email"
                      className="form-control"
                      placeholder={props.t("Email")}
                      type="email"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      invalid={
                        validation.touched.email && validation.errors.email ? true : false
                      }
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                    ) : null}
                    <Input name="idx" value={idx} type="hidden" />
                  </div>

                </div>
                <div className="text-center mt-4">
                  <Button className="btn-auth" type="submit" color="danger">
                    {props.t("SaveChanges")}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

const styles = {
  centralize_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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


export default withRouter(withTranslation()(UserProfile));
