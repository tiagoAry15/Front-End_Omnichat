import React, { useContext, useState } from 'react';
import { Button, Container, Form } from "reactstrap";
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import GeneralModal from '../../components/GeneralModal';
import 'react-toastify/dist/ReactToastify.css';
import './Menu.css';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MenuType from './MenuType';
import { MenuContext } from "./MenuContext";

const MenuContent = () => {
    const { t } = useTranslation(); // usando o hook useTranslation para obter a função t

    const { menu, saveMenu, isEditing, setIsEditing } = useContext(MenuContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [actualMenu, setActualMenu] = useState(menu);
    const performAction = (action) => {
        switch (action) {
            case 'save':
                saveMenu(actualMenu);
                break;
            case 'cancel':
                setActualMenu(JSON.parse(JSON.stringify(menu)));
                break;
            default:
                break;
        }
        setIsEditing(false);
    };

    const toggleModal = (action) => {
        if (action) {
            performAction(action);
        }
        setPendingAction(null);
        setIsModalOpen(!isModalOpen);
    };

    const handleConfirm = () => {
        toggleModal(pendingAction);
    };
    const getModalMessage = () => {
        switch (pendingAction) {
            case 'save':
                return 'Você quer salvar as mudanças?';
            case 'cancel':
                return 'Cancelar edição? Seus dados serão perdidos.';
            default:
                return '';
        }
    };

    const handleMenuChange = (menuName, items) => {
        setActualMenu(prev => ({
            ...prev,
            [menuName]: items
        }));
    }


    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title='Omnichat' breadcrumbItem={t("Cardápio")} />
                <div className="customContainer">
                    <h5>Horário de funcionamento: {menu.HorárioDeFuncionamento}</h5>
                    <Button
                        onClick={() => {
                            if (!isEditing) {
                                setIsEditing(true);
                                setActualMenu(JSON.parse(JSON.stringify(menu)));
                                return;
                            } else {
                                setPendingAction('cancel');
                                setIsModalOpen(true);
                            }
                        }}
                        className='btn btn-primary'>
                        {isEditing ? "Cancelar" : "Editar"}
                        <i className="bx bx-edit-alt" style={{ marginLeft: "5px" }}></i>

                    </Button>

                </div>
                <Form>
                    {Object.keys(actualMenu).map((item, index) => {
                        if (Array.isArray(actualMenu[item])) {
                            return (
                                <MenuType key={index}
                                    Name={item}
                                    items={actualMenu[item]}
                                    onItemsChange={handleMenuChange} />
                            );
                        }
                        return null; // Retorne null se não for um array
                    })}
                    <ToastContainer />
                    <div className="customContainer">
                        <span>Versão {actualMenu.Versao}</span>
                        <Button
                            onClick={() => {
                                setPendingAction('save');
                                setIsModalOpen(true);
                            }}
                            className='btn btn-primary ' disabled={!isEditing}>
                            <i className="bx bx-save" style={{ marginRight: "5px" }} />
                            Salvar
                        </Button>
                    </div>

                </Form>
            </Container>
            <GeneralModal
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(!isModalOpen)}
                message={getModalMessage()}
                onConfirm={handleConfirm}
            />
        </div>
    );
}

export default MenuContent;
