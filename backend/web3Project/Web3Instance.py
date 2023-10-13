from web3 import Web3
from solcx import compile_standard, install_solc
import json


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
        with open("compiled_code.json", "w") as file:
            json.dump(compiled_sol, file)
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


class Web3Instance:
    w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
    chainId = 1337

    def __init__(self):
        print("Web3 is ready!")

    def deployAssetToBlockChain(self, ownerAddress, privateKey, tokenId):
        print("Start deploying asset")
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
        print("deploy successfully")
        return tx_receipt.contractAddress

    def registerToBuy(self, my_address, private_key, contractAddress, amount):
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

        return "Registered!"

    def getParticipants (self, contractAddress):
        simple_storage = self.w3.eth.contract(address=contractAddress, abi=getAbi())

        result = simple_storage.functions.getParticipants().call()

        return result

    #get address of asset's owner
    def getOwnerAddress(self, contractAddress):
        simple_storage = self.w3.eth.contract(address=contractAddress, abi=getAbi())
        result = simple_storage.functions.getCurrentOwner().call()
        return result

    def approve(self, my_address, private_key, contract_address, index):

        simple_storage = self.w3.eth.contract(address=contract_address, abi=getAbi())

        nonce = self.w3.eth.get_transaction_count(my_address)

        store_transaction = simple_storage.functions.approve(index).build_transaction(
            {
                "chainId": self.chainId,
                "gasPrice": self.w3.eth.gas_price,
                "from": my_address,
                "nonce": nonce
            }
        )

        signed_store_txn = self.w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
        send_store_tx = self.w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
        tx_receipt = self.w3.eth.wait_for_transaction_receipt(send_store_tx)

        return "Approved!"

    def get_transactions(self, address):
        latest_block = self.w3.eth.block_number
        for block_number in range(latest_block + 1):
            block = self.w3.eth.get_block(block_number, full_transactions=True)
            if block and "transactions" in block:
                for tx in block["transactions"]:
                    if tx['from'] == address:
                        print(f"Transaction Hash: {tx['hash'].hex()}")
                        print(f"From: {tx['from']}")
                        print(f"To: {tx['to']}")
                        print(f"Value: {tx['value']/1000000000000000000} Ether")
                        print('-----------------------------------')


    def getBalanceOf(self, address):
        balance = self.w3.eth.get_balance(address)
        return balance/1000000000000000000


def Main():
    w3Instance = Web3Instance()
    #compileSmartContract()
    #print(w3Instance.deployAssetToBlockChain("0x48a6586996313C9cB25B6945f94212C5C91c8732","0x80fa94d9941be505fff0136842abd44d80869b786128426cf9b28e1c88f9ec7f", 1))
    #print(w3Instance.registerToBuy("0x7D0967D987284654d9495138154F8722f970f6CD","0xd3573873a3d929716929ebc346da11255ff8c57f7a925a4929e317847defef81", "0xc112e9E7A5a28AaC3F16239455FA54E7F2D29d9d", 100))
    #print(w3Instance.getParticipants("0xc112e9E7A5a28AaC3F16239455FA54E7F2D29d9d"))
    #get owner's address of an asset by contract address of smart contract
    #print(w3Instance.getOwnerAddress("0xc112e9E7A5a28AaC3F16239455FA54E7F2D29d9d"))
    #print(w3Instance.approve("0x48a6586996313C9cB25B6945f94212C5C91c8732","0x80fa94d9941be505fff0136842abd44d80869b786128426cf9b28e1c88f9ec7f","0xc112e9E7A5a28AaC3F16239455FA54E7F2D29d9d", 0))
    #print(w3Instance.getOwnerAddress("0xc112e9E7A5a28AaC3F16239455FA54E7F2D29d9d"))
    #w3Instance.get_transactions("0x7D0967D987284654d9495138154F8722f970f6CD")
    print(w3Instance.getBalanceOf("0x7D0967D987284654d9495138154F8722f970f6CD"))

Main()
