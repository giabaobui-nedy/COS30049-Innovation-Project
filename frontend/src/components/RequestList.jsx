import { useEffect, useState } from "react"
import axios from 'axios'

function RequestList(props) {
    const [serverResponse, setServerResponse] = useState("")
    const [requestsToBuyAssets, setRequestsToBuyAssets] = useState([])

    const approve = (address, amount, tokenId) => {
        console.log("Approving...")

        const options = {
            method: 'GET',
            url: `http://127.0.0.1:8000/approve/${props.username}/${address}/${amount}/${tokenId}`,
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                setServerResponse(response.data.result)
            })
            .catch(error => {
                console.error(error)
            });

        // get all the requests AGAIN
        getAllRequests(props.username)
    }

    const getAllRequests = async () => {
        console.log("Get All Requests From UserDashboard()")
        const options = {
            method: 'GET',
            url: `http://127.0.0.1:8000/getRequestsToBuyAssets/${props.username}`,
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                setRequestsToBuyAssets(response.data)
            })
            .catch(error => {
                console.error(error)
            });
    }

    try {

        useEffect(() => {
            getAllRequests();
        }, [])

        return (
            <div>
                {serverResponse !== "" ? <div class="alert alert-success" role="alert">{serverResponse}</div> : <div />}
                <h1>Requests List</h1>
                <ul className="request-list">
                    {requestsToBuyAssets.map((request) => (
                        <li className="request-item" key={request.tokenId}>
                            <h3 className="request-header">Token ID: {request.tokenId}</h3>
                            <ul className="participants-list">
                                {request.participants.map(([address, amount], index) => (
                                    <li className="participant-item" key={index}>
                                        <p className="participant-info">Address <strong>{address}</strong> suggests an amount of <strong>{amount}</strong> for the asset <button className="approve-button" onClick={() => { approve(address, amount, request.tokenId) }}>Approve</button></p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } catch {
        return (
            <div>Error fetching data from server!</div>
        )
    }

}

export default RequestList