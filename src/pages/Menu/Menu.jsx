import React, { useState } from 'react';
import { Button, Container, Table } from "reactstrap";

import { ToastContainer } from 'react-toastify';
import cardapio from './cardapio.json'
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import './Menu.css'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MenuType from './MenuType';





const Menu = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    document.title = "Omnichat";
    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title='Omnichat' breadcrumbItem={t("Cardápio")} />
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Horário de funcionamento: {cardapio.HorárioDeFuncionamento}</h5>
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        className='btn btn-primary'>
                        <i className="tabler tabler-edit"></i>
                        {isEditing ? "Cancelar" : "Editar"}

                    </Button>
                </div>

                {Object.keys(cardapio).map((item, index) => {
                    if (Array.isArray(cardapio[item])) {
                        return (
                            <MenuType key={index} Name={item} items={cardapio[item]} isEditing={isEditing} />
                        );
                    }
                    return null; // Retorne null se não for um array
                })}

                <ToastContainer />
                <div className='"d-flex justify-content-between align-items-center'>
                    <span>Versão {cardapio.Versao}</span>
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        className='btn btn-primary'>
                        <i className="tabler tabler-edit"></i>
                        Salvar
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default Menu;