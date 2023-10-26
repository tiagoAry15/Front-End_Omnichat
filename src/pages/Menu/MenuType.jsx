
import React, { } from 'react';
import { Table, Card, CardTitle, CardBody, Input } from "reactstrap";
import PropTypes from 'prop-types';
const MenuType = (props) => {

    const { Name, items, isEditing } = props;

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
                                        <Input disabled={!isEditing} type="number" placeholder={`R$ ${item.preco}`} />
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )

}

export default MenuType;

MenuType.propTypes = {
    Name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    isEditing: PropTypes.bool.isRequired,
};
