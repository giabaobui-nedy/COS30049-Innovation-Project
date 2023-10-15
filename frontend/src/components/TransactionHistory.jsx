import { useEffect, useState } from "react"
import Transaction from "./Transaction"
import axios from 'axios'

function TransactionHistory(props) {
    const [apiData, setApiData] = useState([])

    const fetchApiData = async () => {
        console.log("Get All Transactions From TransactionHistory()")
        // fetch data from alchemy
        const options = {
            method: 'GET',
            // replace with session data
            url: `http://127.0.0.1:8000/getTransactions/${props.username}`,
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                setApiData(response.data.Transactions)
            })
            .catch(error => {
                console.error(error)
            });
    }

    try {

        useEffect(() => {
            fetchApiData();
        })

        return (
            <div className="container-fluid pt-3 trans_tb">
                <h2 className="bg-dark text-white p-3"><span>Transactions of {props.username}</span></h2>
                <div className="tb_overflow">
                    <table className="table table-striped mt-3 tran_tb">
                        <thead>
                            <tr className="sticky-top">
                                <th scope="col" className="bg-secondary text-white">Txn Hash</th>
                                <th scope="col" className="bg-secondary text-white">Method</th>
                                <th scope="col" className="bg-secondary text-white">Block</th>
                                <th scope="col" className="bg-secondary text-white">Value (WEI)</th>
                                <th scope="col" className="bg-secondary text-white">From</th>
                                <th scope="col" className="bg-secondary text-white">To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData.map((transaction) => {
                                return <Transaction
                                    key={transaction.TxHash}
                                    transactionHash={transaction.TxHash}
                                    transactionMethod={transaction.Method}
                                    transactionFrom={transaction.From}
                                    transactionTo={transaction.To}
                                    transactionValue={transaction.Value}
                                    transactionBlockNumber={transaction.BlockNumber}>
                                </Transaction>
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } catch {
        return (
            <div>Error fetching data from server!</div>
        )
    }

}

export default TransactionHistory