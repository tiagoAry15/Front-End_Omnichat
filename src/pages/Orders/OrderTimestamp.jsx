import React from 'react';

const OrderTimestamp = ({ timestamp }) => {
    const monthNames = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };

    const parts = timestamp.split('_');
    const year = parts[2];
    const month = monthNames[parts[1]];
    const day = parts[0];
    const hour = parts[3];
    const minute = parts[4];

    const formattedTimestamp = `${day}/${month}/${year} ${hour}:${minute}`;

    let time = formattedTimestamp.split(' ')[1];
    let date = formattedTimestamp.split(' ')[0];
    return (
        <p>{date}, {time}</p>
    );
}

export default OrderTimestamp;

