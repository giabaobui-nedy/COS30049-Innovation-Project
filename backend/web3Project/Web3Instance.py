import json

from solcx import compile_standard, install_solc

# static method to compile the smart contract
def compileSmartContract():
    try:
        print("Start to compile!")
        # read the system smart contract
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
        with open("./compiled_code.json", "w") as file:
            json.dump(compiled_sol, file)
        print("Compile OK!")
    except:
        print("Error when compiling the smart contract")
    finally:
        print("End compiling")


def getAbi():
    # get abi
    with open("compiled_code.json", "r") as file:
        compiled_sol = json.load(file)
    abi = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["abi"]
    return abi


def getBytecode():
    # get bytecode
    with open("compiled_code.json", "r") as file:
        compiled_sol = json.load(file)
    bytecode = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["evm"]["bytecode"]["object"]
    return bytecode

def Main():
    compileSmartContract()

# Main()

class Web3Instance:
    w3 = None
    chainId = 1337

    def __init__(self, w3):
        if self.w3 is None:
            self.w3 = w3
            print("Web3 is ready!")

    def deployAssetToBlockChain(self, ownerAddress, privateKey, tokenId):
        print("Start deploying asset!")
        # 1. getAbi() getBytecode() from local file (as it has one version)
        abi = getAbi()
        bytecode = getBytecode()
        # 2. get the nonce of the address
        nonce = self.w3.eth.get_transaction_count(ownerAddress)
        # 3. get the smart contract & create transaction
        # 4. provide the token ID to the constructor & provide detail to the transaction
        AssetSC = self.w3.eth.contract(abi=abi, bytecode=bytecode)
        transaction = AssetSC.constructor(tokenId).build_transaction(
            {
                "chainId": self.chainId,
                "gasPrice": self.w3.eth.gas_price,
                "from": ownerAddress,
                "nonce": nonce,
            }
        )
        transaction.pop('to')
        # sign contract
        signed_txn = self.w3.eth.account.sign_transaction(transaction, private_key=privateKey)
        tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        tx_receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        print("Deploy asset successfully")
        return tx_receipt.contractAddress

    def registerToBuy(self, my_address, private_key, contractAddress, amount):
        try:
            abi = getAbi()
            simple_storage = self.w3.eth.contract(address=contractAddress, abi=abi)

            nonce = self.w3.eth.get_transaction_count(my_address)

            store_transaction = simple_storage.functions.registerToBuy().build_transaction(
                {
                    "chainId": self.chainId,
                    "gasPrice": self.w3.eth.gas_price,
                    "from": my_address,
                    "value": amount,
                    "nonce": nonce
                }
            )

            signed_store_txn = self.w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
            send_store_tx = self.w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
            tx_receipt = self.w3.eth.wait_for_transaction_receipt(send_store_tx)
            return "Registered Successfully!"
        except:
            return "Failed to register!"

    def getParticipants(self, contractAddress):
        simple_storage = self.w3.eth.contract(address=contractAddress, abi=getAbi())
        result = simple_storage.functions.getParticipants().call()
        return result

    # get address of asset's owner
    def getOwnerAddress(self, contractAddress):
        simple_storage = self.w3.eth.contract(address=contractAddress, abi=getAbi())
        result = simple_storage.functions.getCurrentOwner().call()
        return result

    def approve(self, currentOwnerAddress, currentOwnerPrivateKey, contractAddressOfAsset, newOwnerAddress, value):
        simple_storage = self.w3.eth.contract(address=contractAddressOfAsset, abi=getAbi())
        nonce = self.w3.eth.get_transaction_count(currentOwnerAddress)
        store_transaction = simple_storage.functions.approve(newOwnerAddress, value).build_transaction(
            {
                "chainId": self.chainId,
                "gasPrice": self.w3.eth.gas_price,
                "from": currentOwnerAddress,
                "nonce": nonce
            }
        )
        signed_store_txn = self.w3.eth.account.sign_transaction(store_transaction, private_key=currentOwnerPrivateKey)
        send_store_tx = self.w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
        tx_receipt = self.w3.eth.wait_for_transaction_receipt(send_store_tx)
        return True

    def get_transactions(self, address):
        my_dict = {}
        my_list = []

        latest_block = self.w3.eth.block_number

        for block_number in range(latest_block + 1):
            block = self.w3.eth.get_block(block_number, full_transactions=True)

            if block and "transactions" in block:
                for tx in block["transactions"]:
                    if tx["from"] == address or tx["to"] == address:
                        transaction_data = {
                            "TxHash": tx['hash'].hex(),
                            "From": tx['from'],
                            "To" : tx['to'],
                            "Value": tx['value'],
                            "BlockNumber": tx["blockNumber"],
                        }
                        if tx['to']:
                            if tx['to'] == address:
                                transaction_data["Method"] = "Receive"
                            else:
                                transaction_data["Method"] = "Transfer"
                        else:
                            transaction_data["Method"] = "Create Asset"
                        my_list.append(transaction_data)
        my_dict["Transactions"] = my_list
        return my_dict

    def getBalanceOf(self, address):
        balance = self.w3.eth.get_balance(address)
        return balance / 1000000000000000000
