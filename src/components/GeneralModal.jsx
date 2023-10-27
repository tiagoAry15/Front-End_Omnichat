import React from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";
const GeneralModal = (props) => {
    const { isOpen, toggle, message } = props;
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>
                    <h1>Confirmação</h1>
                </ModalHeader>

                <ModalBody>
                    {message}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Confirmar</Button>
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}
export default GeneralModal;