// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import React from "react";

function Transaction(props) {
    return (
        <tr>
            <td>{props.transactionHash}</td>
            {/* <td><span className="badge text-bg-light">{props.transaction.type}</span></td> */}
            <td>{props.transactionBlockNumber}</td>
            {/* <td>N/A</td> */}
            <td>{props.transactionFrom}</td>
            <td>{props.transactionTo}</td>
        </tr>
    )
}

export default Transaction