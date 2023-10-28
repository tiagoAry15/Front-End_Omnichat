import React from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";
const GeneralModal = (props) => {
    const { isOpen, toggle, message, onConfirm } = props;
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader tag="h1" >
                    Confirmação
                </ModalHeader>

                <ModalBody>
                    {message}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onConfirm}>Confirmar</Button>
                    <Button color="setIsModalOpensecondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}
export default GeneralModal;