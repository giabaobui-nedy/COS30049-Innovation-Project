from web3 import Web3
from solc import compile_standard, install_solc
import json

# global variable
# type your address here
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
# Default is 1337 or with the PORT in your Gaanche
chain_id = 1337


# function called by an account to register to buy an asset
# pass in user's address, private key and asset's token ID
def registerToBuy(my_address, private_key, tokenID, amount):
    with open("./data.json", "r") as file:
        data_file = json.load(file)

    for asset in data_file["item"]:
        if asset["tokenID"] == tokenID:
            found_asset = asset
            break

    simple_storage = w3.eth.contract(address=found_asset["contractAddress"], abi=found_asset["abi"])

    nonce = w3.eth.get_transaction_count(my_address)

    store_transaction = simple_storage.functions.registerToBuy().build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "value": amount,
            "nonce": nonce
        }
    )

    signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
    send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)

    return "Registered!"


def getArray(tokenID):
    with open("./data.json", "r") as file:
        data_file = json.load(file)

    for item in data_file["item"]:
        if item["tokenID"] == tokenID:
            data = item
            break

    simple_storage = w3.eth.contract(address=data["contractAddress"], abi=data["abi"])

    result = simple_storage.functions.getParticipants().call()
    print(result)

    return result


def getOwner(tokenID):
    with open("./data.json", "r") as file:
        data_file = json.load(file)

    for item in data_file["item"]:
        if item["tokenID"] == tokenID:
            data = item
            break

    simple_storage = w3.eth.contract(address=data["contractAddress"], abi=data["abi"])

    result = simple_storage.functions.getCurrentOwner().call()
    return result


def approve(my_address, private_key, tokenID):
    with open("./data.json", "r") as file:
        data_file = json.load(file)

    for item in data_file["item"]:
        if item["tokenID"] == tokenID:
            data = item
            break

    simple_storage = w3.eth.contract(address=data["contractAddress"], abi=data["abi"])

    nonce = w3.eth.get_transaction_count(my_address)

    store_transaction = simple_storage.functions.approve(tokenID).build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "nonce": nonce
        }
    )

    signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
    send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)

    return "Approved!"
