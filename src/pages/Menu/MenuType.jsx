
import React, { useContext, useState } from 'react';
import { Table, Card, CardTitle, CardBody, Input, Button, } from "reactstrap";
import PropTypes from 'prop-types';
import { MenuContext } from "./MenuContext";
const MenuType = (props) => {

    const { Name } = props.Name;
    const [items, setItems] = useState(props.items); // 1. Adicione um estado para gerenciar os itens da tabela.
    const { isEditing, addNewItem, removeItem } = useContext(MenuContext);


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
                        {items.map((item) => {
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
                                    {isEditing && <td><Button close onClick={() => removeItem(setItems, item.id)} /></td>} {/* Coluna para o botão quando estiver no modo de edição */}
                                </tr>
                            )

                        })}
                    </tbody>
                </Table>
                {isEditing && (
                    <Button onClick={() => addNewItem(setItems, items)} > +</Button>
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
