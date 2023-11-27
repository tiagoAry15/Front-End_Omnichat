import React, { useState, useEffect } from 'react';
import { Progress } from 'reactstrap';

const OrderStatusProgress = ({ status }) => {
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState('secondary'); // Define a cor padrão como 'secondary'

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
                setColor('success'); // Verde para status 'Entregue'
                break;
            default:
                setProgress(0);
                setColor('secondary'); // Cor padrão para status indefinido
        }
    }, [status]);

    return (
        <div>

            <Progress value={progress} color={color} />
        </div>
    );
};

export default OrderStatusProgress;
