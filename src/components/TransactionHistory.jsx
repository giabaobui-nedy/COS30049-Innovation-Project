import Transaction from "./Transaction"

function TransactionHistory() {
    const transactions = require('../res/transaction_by_an_account.json').transactions;
    return (
        <div className="container-fluid pt-3 trans_tb">
            <h2 className="bg-dark text-white p-3"><span>Transactions</span></h2>
            <div className="tb_overflow">
                <table className="table table-striped mt-3 tran_tb">
                    <tr className="sticky-top">
                        <th scope="col" className="bg-secondary text-white">Txn Hash</th>
                        <th scope="col" className="bg-secondary text-white">Method</th>
                        <th scope="col" className="bg-secondary text-white">Block</th>
                        <th scope="col" className="bg-secondary text-white">Time</th>
                        <th scope="col" className="bg-secondary text-white">From</th>
                        <th scope="col" className="bg-secondary text-white">To</th>
                    </tr>


                    {transactions.map((transaction) => {
                        return <Transaction transaction={transaction}></Transaction>
                    }
                    )}
                </table>
            </div>
        </div>
    )
}

export default TransactionHistory