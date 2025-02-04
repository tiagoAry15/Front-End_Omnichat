import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import React from "react";
import ChatWindow from "./ChatWindow";
import ChatList from "./ChatList";

const ChatContent = ({ t }) => {

    return (<React.Fragment>
        <div className="page-content">
            <Container fluid>
                {/* Render Breadcrumb */}
                <div>
                    <Breadcrumbs title="Omnichat" breadcrumbItem={t("Chat")} />
                </div>
                <Row>
                    <Col lg="12">
                        <div className="d-lg-flex">
                            <div className="chat-leftsidebar me-lg-4">
                                <div>
                                    <div>
                                        <div className="d-flex"
                                            style={{ justifyContent: "center", alignItems: 'center' }}>
                                            <ProfileMenu />
                                            <div className="flex-grow-1"
                                                style={{ justifyContent: "center", alignItems: 'center', }}>
                                                <p className="text-muted mb-0">
                                                    <i className="mdi mdi-circle text-success align-middle me-2" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <ChatList t={t} />

                                </div>
                            </div>
                            <ChatWindow t={t} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </React.Fragment>)

}


export default ChatContent;