from web3 import Web3
from solcx import compile_standard, install_solc
import json


class Web3Instance:
    w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
    chainId = 1337

    def __init__(self):
        print("Web3 is ready!")


    def compileSmartContract(self):
        pass

    def getAbi(self):
        pass

    def deployAssetToBlockChain(self, ownerAddress, privateKey, tokenId):
        # 1. getAbi() getBytecode() from local file (as it has one version)
        # 2. get the smart contract
        # 3. provide the token ID to the constructor
        # 4. get the nonce of the address
        # 5. provide the owner address & nonce to the contract
        print("The code goes here!")
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
        # get bytecode
        bytecode = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["evm"]["bytecode"]["object"]
        # get abi
        abi = compiled_sol["contracts"]["AssetSC.sol"]["AssetSC"]["abi"]
        # get number of transactions of the address
        nonce = self.w3.eth.get_transaction_count(ownerAddress)
        # deploy the smart contract
        # create transaction (get the smart contract from the Blockchain)
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

        return tx_receipt.contractAddress
