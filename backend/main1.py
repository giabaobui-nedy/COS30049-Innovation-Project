from web3 import Web3
from solcx import compile_standard, install_solc
import json

# global variable
# type your address here
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
# Default is 1337 or with the PORT in your Gaanche
chain_id = 1337

#function called to deploy smart contract associated with an asset
#pass in owner address, private key and asset's token ID
def deploy_smart_contract(address, priv_key, tokenID):
    # owner address
    my_address = address
    # owner private key
    private_key = priv_key
    # Asset's token id
    token_ID = tokenID

    with open("./AssetSC.sol", "r") as file:
        storage_file = file.read()

    #compile the smart contract
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

    #write compile info to the json file
    with open("compiled_code.json", "w") as file:
        json.dump(compiled_sol, file)

    # get bytecode
    bytecode = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["evm"][
        "bytecode"
    ]["object"]

    # get abi
    abi = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["abi"]

    #get number of transactions of the address
    nonce = w3.eth.get_transaction_count(my_address)

    #deploy the smart contract
    #contract creation transaction
    AssetSC = w3.eth.contract(abi=abi, bytecode=bytecode)

    transaction = AssetSC.constructor(token_ID).build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "nonce": nonce,
        }
    )
    transaction.pop('to')

    #signed contract
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    #store contract's details to json file
    with open("data.json", "w") as file:
        json.dump({"contractAddress": tx_receipt.contractAddress
                   , "abi": abi
                   , "tokenID": tokenID}, file)

    return "Deploy succeed"


#function called by an account to register to buy an asset
#pass in user's address, private key and asset's token ID

def registerToBuy(my_address, private_key, tokenID):
    with open("./data.json", "r") as file:
        data_file = json.load(file)

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