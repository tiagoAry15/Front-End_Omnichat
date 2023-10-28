import React from 'react';
import { Input } from 'reactstrap';
import NumberFormat from 'react-number-format';


const CurrencyInput = (props) => {
    return (
        <NumberFormat
            thousandSeparator={true}
            prefix={'R$ '}
            decimalScale={2}
            fixedDecimalScale={true}
            allowNegative={false}
            customInput={Input}
            {...props}
        />
    );
}

export default CurrencyInput;
