from web3 import Web3
from solcx import compile_standard, install_solc
import json

# global variable
# type your address here
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
# Default is 1337 or with the PORT in your Gaanche
chain_id = 1337

# function called to deploy smart contract associated with an asset
# pass in owner address, private key and asset's token ID
def deploy_smart_contract(my_address, private_key, tokenID):
    with open("./AssetSC.sol", "r") as file:
        storage_file = file.read()

    # compile the smart contract
    install_solc("0.8.11")
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"AssetSC.sol": {"content": storage_file}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.8.11",
    )

    # write compile info to the json file
    with open("compiled_code.json", "w") as file:
        json.dump(compiled_sol, file)

    # get bytecode
    bytecode = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["evm"][
        "bytecode"
    ]["object"]

    # get abi
    abi = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["abi"]

    # get number of transactions of the address
    nonce = w3.eth.get_transaction_count(my_address)

    # deploy the smart contract
    # contract creation transaction
    AssetSC = w3.eth.contract(abi=abi, bytecode=bytecode)

    transaction = AssetSC.constructor(tokenID).build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "nonce": nonce,
        }
    )
    transaction.pop('to')

    # signed contract
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # Load the existing JSON data from the file
    with open("sample.json", "r") as file:
        data = json.load(file)

    # Add the new employees to the existing data
    new_asset = {"contractAddress": tx_receipt.contractAddress
        , "abi": abi
        , "tokenID": tokenID}
    data.extend(new_asset)

    # store contract's details to json file
    with open("data.json", "w") as file:
        json.dump(data, file)

    return "Deploy succeed"


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

def get_transactions_of_an_address(my_address):

    # Connect to your Ganache instance
    web3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))

    # Fetch all transactions
    latest_block = web3.eth.block_number
    for block_number in range(latest_block + 1):
        block = web3.eth.get_block(block_number, full_transactions=True)
        if block and "transactions" in block:
            for tx in block["transactions"]:
                if tx['from'] == my_address:
                    print(f"Transaction Hash: {tx['hash'].hex()}")
                    print(f"From: {tx['from']}")
                    print(f"To: {tx['to']}")
                    print(f"Value: {tx['value']} Wei")
                    print('-----------------------------------')
