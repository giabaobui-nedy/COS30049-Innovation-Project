from fastapi import FastAPI, Depends

from web3 import Web3
import os
from solcx import compile_standard, install_solc
import json

# blockchain variables
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
chain_id = 1337
my_address = "0x1Bf52eF94394fDC8735B07Ac12BB6f1A5C87A1aF"
private_key = "0x582f12f96eca1f247412e173db188b529c68a1dfa1ccfd02a5430e03b33ea5c9"
# fastAPI instance
app = FastAPI()

