import React, { useState, useEffect } from 'react';
import { Progress } from 'reactstrap';

const OrderStatusProgress = ({ status }) => {
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState('secondary'); // Define a cor padrão como 'secondary'
    const getColor = (status) => {
        if (status === "Finalizado") {
            return "green";
        } else if (status === "Cancelado") {
            return "red";
        }
        // Adicione mais condições para outros status
        return "defaultColor"; // Um fallback para status não especificados
    }
    useEffect(() => {
        switch (status) {
            case 'Confirmado':
                setProgress(25);
                setColor('info'); // Azul para status 'Confirmado'
                break;
            case 'Em preparação':
                setProgress(50);
                setColor('warning'); // Amarelo para status 'Em preparação'
                break;
            case 'A caminho':
                setProgress(75);
                setColor('primary'); // Azul escuro para status 'A caminho'
                break;
            case 'Entregue':
                setProgress(100);
                setColor('success');
                break;
            case 'Finalizado':
                setProgress(100);
                setColor('success');
                break;
            case 'Cancelado':
                setProgress(100);
                setColor('danger');
                break;
            default:
                setProgress(0);
                setColor('secondary'); // Cor padrão para status indefinido
        }
    }, [status]);

    return (
        <div>
            <div className='container_between'>

                <p style={{ marginBottom: '0px' }}>Status:</p>
                <p style={{
                    color: getColor(status),
                    fontWeight: 'bold', marginBottom: '0px'
                }}>{status}</p>
            </div>
            <Progress value={progress} color={color} />
        </div>
    );
};

export default OrderStatusProgress;
