from fastapi import FastAPI, Depends
from web3 import Web3
import os
from solc import compile_standard, install_solc
import json

w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))

app = FastAPI()

# global variable
# type your address here
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
# Default is 1337 or with the PORT in your Ganache
chain_id = 1337


@app.get("/deployAsset")
async def deployAsset():
    # Find in you account
    my_address = "0x48a6586996313C9cB25B6945f94212C5C91c8732"
    # Find in you account
    private_key = "0x80fa94d9941be505fff0136842abd44d80869b786128426cf9b28e1c88f9ec7f"
    # Asset's token id
    tokenID = 1

    with open("../AssetSC.sol", "r") as file:
        simple_storage_file = file.read()

    install_solc("0.8.11")
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"AssetSC.sol": {"content": simple_storage_file}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.8.11",
    )

    with open("compiled_code1.json", "w") as file:
        json.dump(compiled_sol, file)

    # get bytecode
    bytecode = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["evm"][
        "bytecode"
    ]["object"]

    # get abi
    abi = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["abi"]

    nonce = w3.eth.get_transaction_count(my_address)

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

    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # Load the existing JSON data from the file
    with open("data.json", "r") as file:
        data = json.load(file)

    # Add the new asset to the existing data
    new_asset = [{"contractAddress": tx_receipt.contractAddress
        , "abi": abi
        , "tokenID": tokenID}]

    data["item"].extend(new_asset)

    # store contract's details to json file
    with open("data.json", "w") as file:
        json.dump(data, file, indent=4)

    return "deploy"

@app.get("/buy1")
async def requestToBuy():
    with open("./data.json", "r") as file:
        data_file = json.load(file)["item"][0]

    my_address = "0x7D0967D987284654d9495138154F8722f970f6CD"
    private_key ="0xd3573873a3d929716929ebc346da11255ff8c57f7a925a4929e317847defef81"

    simple_storage = w3.eth.contract(address=data_file["contractAddress"], abi=data_file["abi"])

    nonce = w3.eth.get_transaction_count(my_address)

    store_transaction = simple_storage.functions.registerToBuy().build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "value": 1000000000000000,
            "nonce": nonce
        }
    )

    signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
    send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)

    return "Registered!"

@app.get("/buy2")
async def requestToBuy():
    with open("./data.json", "r") as file:
        data_file = json.load(file)["item"][0]


    my_address = "0xf202751077760d15db7a24f8f150C863252b7F17"
    private_key ="0x3f46b7b1588d75cb6e862f841ea9472f4707ad1d5c33137cb66349fb36e42ede"

    simple_storage = w3.eth.contract(address=data_file["contractAddress"], abi=data_file["abi"])

    nonce = w3.eth.get_transaction_count(my_address)

    store_transaction = simple_storage.functions.registerToBuy().build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "value": 20000000000000,
            "nonce": nonce
        }
    )

    signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
    send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)

    return "Registered!"


@app.get("/array")
async def getArray():
    with open("./data.json", "r") as file:
        data_file = json.load(file)

    for item in data_file["item"]:
        if item["tokenID"] == 1:
            data = item
            break

    #my_address = "0x7D0967D987284654d9495138154F8722f970f6CD"
    #private_key ="0xd3573873a3d929716929ebc346da11255ff8c57f7a925a4929e317847defef81"

    simple_storage = w3.eth.contract(address=data["contractAddress"], abi=data["abi"])

    #nonce = w3.eth.get_transaction_count(my_address)

    result = simple_storage.functions.getParticipants().call()
    print(result)

    return result

@app.get("/owner")
async def getOwner():
    with open("./data.json", "r") as file:
        data_file = json.load(file)["item"][0]

    #my_address = "0x7D0967D987284654d9495138154F8722f970f6CD"
    #private_key ="0xd3573873a3d929716929ebc346da11255ff8c57f7a925a4929e317847defef81"

    simple_storage = w3.eth.contract(address=data_file["contractAddress"], abi=data_file["abi"])

    #nonce = w3.eth.get_transaction_count(my_address)

    result = simple_storage.functions.getCurrentOwner().call()
    print(result)

    return result

@app.get("/balance")
async def getBalance():
    with open("./data.json", "r") as file:
        data_file = json.load(file)["item"][0]

    #my_address = "0x7D0967D987284654d9495138154F8722f970f6CD"
    #private_key ="0xd3573873a3d929716929ebc346da11255ff8c57f7a925a4929e317847defef81"

    simple_storage = w3.eth.contract(address=data_file["contractAddress"], abi=data_file["abi"])

    #nonce = w3.eth.get_transaction_count(my_address)

    result = simple_storage.functions.getCurrentOwnerBalance().call()
    print(result)

    return result

@app.get("/finalize")
async def approve():
    with open("./data.json", "r") as file:
        data_file = json.load(file)

    for item in data_file["item"]:
        if item["tokenID"] == 1:
            data = item
            break

    my_address = "0x48a6586996313C9cB25B6945f94212C5C91c8732"
    private_key = "0x80fa94d9941be505fff0136842abd44d80869b786128426cf9b28e1c88f9ec7f"

    simple_storage = w3.eth.contract(address=data["contractAddress"], abi=data["abi"])

    nonce = w3.eth.get_transaction_count(my_address)

    store_transaction = simple_storage.functions.approve(1).build_transaction(
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

@app.get("/getTransaction")
def get_transactions():
    latest_block = w3.eth.block_number
    for block_number in range(latest_block + 1):
        block = w3.eth.get_block(block_number, full_transactions=True)
        if block and "transactions" in block:
            for tx in block["transactions"]:
                print(f"Transaction Hash: {tx['hash'].hex()}")
                print(f"From: {tx['from']}")
                print(f"To: {tx['to']}")
                print(f"Value: {w3.fromWei(tx['value'], 'ether')} Ether")
                print('-----------------------------------')
    return "success"


