// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import React from "react";

function Transaction(props) {
    return (
        <tr>
            <td>{props.transaction.transaction_hash}</td>
            <td><span className="badge text-bg-light">{props.transaction.type}</span></td>
            <td>{props.transaction.block_number}</td>
            <td>{props.transaction.transaction_date}</td>
            <td>{props.transaction.transfer_from}</td>
            <td>{props.transaction.transfer_to}</td>
        </tr>
    )
}

export default Transaction