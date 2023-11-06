
import React, { useContext, useState, useEffect } from 'react';
import { Table, Card, CardTitle, CardBody, Input, Button, } from "reactstrap";
import PropTypes from 'prop-types';
import { MenuContext } from "../../contexts/MenuContext";

const MenuType = (props) => {

    const Name = props.Name;
    const [localItems, setLocalItems] = useState(props.items); // 1. Adicione um estado para gerenciar os itens da tabela.
    const { isEditing } = useContext(MenuContext);
    const [itemCount, setItemCount] = useState(localItems.length);


    useEffect(() => {
        if (!props.isResetting) { // Não execute durante o reset
            props.onItemsChange(props.Name, localItems);
            setItemCount(localItems.length);
        }
    }, [localItems]);
    useEffect(() => {
        if (props.isResetting) { // Não execute durante o reset
            console.log('resetando itens locais')
            setLocalItems(props.items);
            setItemCount(localItems.length);
        }
    }, [props.isResetting], props.items);




    const handleInputChange = (event, itemIndex, field) => {
        let value = event.target.value;

        // Check if the field is 'preço' and if the value is numeric
        if (field === 'preço' && value !== '') {
            // Using a regular expression to allow only numbers (and decimal point if needed)
            if (!/^\d*\.?\d*$/.test(value)) {
                return; // If it's not numeric, we simply return without updating the state
            }
        }

        const updatedItems = localItems.map((item, index) => {
            if (itemIndex === index) {
                return {
                    ...item,
                    [field]: value,
                };
            }
            return item;
        });

        setLocalItems(updatedItems);
    };


    const addNewItem = (itemCount) => {
        const newItem = {
            id: itemCount + 1, // gerando um ID único com base na data atual
            nome: "",
            tamanho: "",
            preço: ""
        };
        setLocalItems(prevItems => [...prevItems, newItem]);
    }
    const removeItem = (index) => {
        setLocalItems(prevItems => {
            const newItems = [...prevItems]; // cria uma cópia da lista atual de itens
            newItems.splice(index, 1); // remove o item no índice especificado
            return newItems; // retorna a nova lista de itens
        });
    };


    // ... rest of the cod
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <h1>{Name}</h1>
                </CardTitle>
            </CardBody>
            <CardBody style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                        {props.items.map((item, index) => {
                            return (
                                <tr key={index}>

                                    <td>
                                        <Input
                                            disabled={!isEditing}
                                            value={item.nome}
                                            onChange={(e) => handleInputChange(e, index, 'nome')} />
                                    </td>
                                    <td>
                                        <Input
                                            disabled={!isEditing}
                                            name="tamanho" value={item.tamanho}
                                            onChange={(e) => handleInputChange(e, index, 'tamanho')}
                                            type='select'>
                                            {Name === 'Bebidas' && (
                                                <>
                                                    <option value=''>Tamanho</option>
                                                    <option value='300ml'>300ml</option>
                                                    <option value='500ml'>500ml</option>
                                                    <option value='1L'>1L</option>
                                                </>
                                            )}
                                            {Name === 'Pizzas' && (
                                                <>
                                                    <option value=''>Tamanho</option>
                                                    <option value='Pequena'>Pequena</option>
                                                    <option value='Média'>Média</option>
                                                    <option value='Grande'>Grande</option>
                                                </>
                                            )}

                                        </Input>
                                    </td>
                                    <td>
                                        <Input
                                            disabled={!isEditing}
                                            type="number"
                                            placeholder='R$'
                                            value={item.preço}
                                            onChange={(e) => handleInputChange(e, index, 'preço')} />
                                    </td>
                                    {isEditing ?
                                        <td>
                                            <Button close onClick={() => removeItem(index)} />
                                        </td>
                                        : null}
                                </tr>
                            )

                        })}
                    </tbody>
                </Table>
                {isEditing && (
                    <Button onClick={() => addNewItem(itemCount)} >+</Button>
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
