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


def Main():
    w3Instance = Web3Instance()
    print(w3Instance.deployAssetToBlockChain("0x7A2F46c7CAB756beA84BE395b1075a2aC79f73aB",
                                             "0x2e99aa9b93e0ca18764c4a2d560eefe34ff84c36d9979c3c9e734191242f1c73",
                                             1))


Main()
