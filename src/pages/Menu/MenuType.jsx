
import React, { useContext, useState, useEffect } from 'react';
import { Table, Card, CardTitle, CardBody, Input, Button, } from "reactstrap";
import PropTypes from 'prop-types';
import { MenuContext } from "./MenuContext";
const MenuType = (props) => {

    const { Name } = props.Name;
    const [localItems, setLocalItems] = useState(props.items); // 1. Adicione um estado para gerenciar os itens da tabela.
    const { isEditing } = useContext(MenuContext);


    useEffect(() => {
        console.log("item local atualizado")
        props.onItemsChange(props.Name, localItems);
    }, [localItems]);


    const handleInputChange = (event, itemId, field) => {
        const updatedItems = localItems.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    [field]: event.target.value
                };
            }
            return item;
        });
        setLocalItems(updatedItems);

    }

    const addNewItem = (items) => {
        const newItem = {
            id: items.length + 1, // gerando um ID único com base na data atual
            nome: "",
            tamanho: "",
            preco: ""
        };
        setLocalItems(prevItems => [...prevItems, newItem]);
    }
    const removeItem = (id) => {
        setLocalItems(prevItems => prevItems.filter(item => item.id !== id));
    }

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
                            <th>Opção</th>
                            <th>tamanho</th>
                            <th>Preço</th>
                            {isEditing && <th>Ações</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {localItems.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <Input
                                            disabled={!isEditing}
                                            value={item.nome}
                                            onChange={(e) => handleInputChange(e, item.id, 'nome')} />
                                    </td>
                                    <td>
                                        <Input
                                            disabled={!isEditing}
                                            name="tamanho" value={item.tamanho}
                                            onChange={(e) => handleInputChange(e, item.id, 'tamanho')} />
                                    </td>
                                    <td>
                                        <Input
                                            disabled={!isEditing}
                                            type="number"
                                            placeholder='R$'
                                            value={item.preco}
                                            onChange={(e) => handleInputChange(e, item.id, 'preco')} />
                                    </td>
                                    {isEditing ?
                                        <td>
                                            <Button close onClick={() => removeItem(item.id)} />
                                        </td>
                                        : null}
                                </tr>
                            )

                        })}
                    </tbody>
                </Table>
                {isEditing && (
                    <Button onClick={() => addNewItem(localItems)} >+</Button>
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
