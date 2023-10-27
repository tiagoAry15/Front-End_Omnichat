
import React, { useContext, useState, useEffect } from 'react';
import { Table, Card, CardTitle, CardBody, Input, Button, } from "reactstrap";
import PropTypes from 'prop-types';
import { MenuContext } from "./MenuContext";
const MenuType = (props) => {

    const { Name, setActualMenu } = props.Name;
    const [localItems, setLocalItems] = useState(props.items); // 1. Adicione um estado para gerenciar os itens da tabela.
    const { isEditing, addNewItem, removeItem } = useContext(MenuContext);
    useEffect(() => {
        setLocalItems(props.items);
    }, [props.items]);


    // ... rest of the cod
    return (
        <Card>
            <CardTitle>
                <h1>{Name}</h1>
            </CardTitle>
            <CardBody>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Opção
                            </th>
                            <th>
                                tamanho
                            </th>
                            <th>
                                Preço
                            </th>
                            {isEditing && <th>Ações</th>} {/* Coluna para o botão quando estiver no modo de edição */}
                        </tr>
                    </thead>
                    <tbody>
                        {localItems.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <Input disabled={!isEditing} placeholder={item.nome} />

                                    </td>
                                    <td>
                                        <Input disabled={!isEditing} name="tamanho" placeholder={item.tamanho} />
                                    </td>
                                    <td>
                                        <Input required disabled={!isEditing} type="number" placeholder={`R$ ${item.preco}`} />
                                    </td>
                                    {isEditing && <td><Button close onClick={() => removeItem(setLocalItems, item.id)} /></td>} {/* Coluna para o botão quando estiver no modo de edição */}
                                </tr>
                            )

                        })}
                    </tbody>
                </Table>
                {isEditing && (
                    <Button onClick={() => addNewItem(setLocalItems, localItems)} > +</Button>
                )
                }
            </CardBody >
        </Card >
    )

}

export default MenuType;

MenuType.propTypes = {
    Name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,

};
