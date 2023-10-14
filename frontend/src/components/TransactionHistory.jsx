import { useEffect, useState } from "react"
import Transaction from "./Transaction"
import axios from 'axios'

function TransactionHistory() {
    const [apiData, setApiData] = useState([])

    const fetchApiData = () => {
        // fetch data from alchemy
        const options = {
            method: 'GET',
            // replace with session data
            url: 'http://127.0.0.1:8000/getTransactions/admin1',
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                setApiData(response.data.Transactions)
                console.log(response.data.Transactions)
            })
            .catch(error => {
                console.error(error)
            });
    }

    try {

        useEffect(() => {
            fetchApiData();
        }, [])

        return (
            <div className="container-fluid pt-3 trans_tb">
                <h2 className="bg-dark text-white p-3"><span>Transactions</span></h2>
                <div className="tb_overflow">
                    <table className="table table-striped mt-3 tran_tb">
                        <tr className="sticky-top">
                            <th scope="col" className="bg-secondary text-white">Txn Hash</th>
                            {/* <th scope="col" className="bg-secondary text-white">Method</th> */}
                            <th scope="col" className="bg-secondary text-white">Block</th>
                            {/* <th scope="col" className="bg-secondary text-white">Time</th> */}
                            <th scope="col" className="bg-secondary text-white">From</th>
                            <th scope="col" className="bg-secondary text-white">To</th>
                        </tr>
                        {apiData.map((transaction) => {
                            return <Transaction
                                transactionHash={transaction.TxHash}
                                transactionFrom={transaction.From}
                                transactionTo={transaction.To}
                                transactionValue={transaction.Value}
                                transactionBlockNumber={transaction.BlockNumber}>
                            </Transaction>
                        }
                        )}
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