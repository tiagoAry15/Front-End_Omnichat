import React from 'react';
import {
    Table,
    Input,
    Button,

} from 'reactstrap';
import PropTypes from 'prop-types';
import './orderCard.css'
const ModalItemsList = ({ t, orderItems }) => {

    const itemTypes = [...new Set(orderItems.map(item => item.type))]; // Encontrar os tipos de itens únicos

    const renderTableForType = (items, type) => {
        // Encontrar o número máximo de sabores em um único item
        const maxFlavors = items.reduce((max, item) => Math.max(max, item.flavors.length), 0);

        return (
            <div>
                <h5>{type.charAt(0).toUpperCase() + type.slice(1)}</h5> {/* Capitaliza o tipo */}
                <Table className='modal-items-table'>
                    <thead>
                        <tr>
                            <th>Qnt.</th>
                            {[...Array(maxFlavors).keys()].map(i => <th key={i}>Sabor {i + 1}</th>)}
                            <th>Tamanho</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Input className='custom-input' value={item.quantity.toString()} />
                                </td>
                                {[...Array(maxFlavors).keys()].map(i => (
                                    <td key={i}>
                                        <Input className='custom-input' value={item.flavors[i] || ''} />
                                    </td>
                                ))}
                                <td>
                                    <Input className='custom-input' value={t(item.size) || ''} />
                                </td>
                                <td>
                                    <Button className='remove-button' close onClick={() => removeItem(index)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    };


    return (
        <div>
            {itemTypes.map(type => {
                const itemsOfType = orderItems.filter(item => item.type === type);
                return (
                    <>
                        {renderTableForType(itemsOfType, type)}
                        <div className='centered-container'>
                            <Button color='primary' style={{ borderRadius: '100%', alignItems: 'center' }}>
                                <i style={{ fontSize: '18px' }} className="bx bx-plus"></i>
                            </Button>
                        </div>
                    </>)
            })}


        </div>
    );
};



ModalItemsList.propTypes = {
    orderItems: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            size: PropTypes.string // Assumindo que 'size' é uma string, opcional
        })
    ).isRequired
};

export default ModalItemsList;
