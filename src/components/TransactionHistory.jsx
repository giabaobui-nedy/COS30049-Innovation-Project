import Transaction from "./Transaction"

function TransactionHistory() {
    const transactions = require('../res/transaction_by_an_account.json').transactions;
    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Txn Hash</th>
                        <th scope="col">Method</th>
                        <th scope="col">Block</th>
                        <th scope="col">Time</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => {
                        return <Transaction transaction={transaction}></Transaction>
                    }
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionHistory