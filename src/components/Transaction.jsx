import transactions from './json_file/transaction_by_an_account.json';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import React, { Component } from "react";
export class Transaction extends Component {
    constructor(hash){
        this.hash = hash;
    }
    render() {
        return (
            <div className="container">
                {transactions.map((tran, i) => {
                    if (tran.transaction_hash == hash) {
                        <table className="text-uppercase">
                            <tr>
                                <th>Transaction Hash:</th>
                                <td>{tran.transaction_hash}</td>
                            </tr>
                            <tr>
                                <th>Status:</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Block:</th>
                                <td>{tran.block_number}</td>
                            </tr>
                            <tr>
                                <th>Timstamp:</th>
                                <td>{tran.transaction_date}</td>
                            </tr>
                            <tr>
                                <th>Transaction Action:</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>From:</th>
                                <td>{tran.transfer_from}</td>
                            </tr>
                            <tr>
                                <th>To:</th>
                                <td>{tran.transfer_to}</td>
                            </tr>
                            <tr>
                                <th>Value:</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Transaction Fee:</th>
                                <td></td>
                            </tr>
                        </table>
                    }
                })}

                <a href="TransactionHistory.jsx" className="btn btn-white rounded-pill"><ArrowLeftIcon /> Back</a>
            </div>
        );
    }
}