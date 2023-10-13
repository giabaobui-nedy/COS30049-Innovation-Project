from fastapi import FastAPI
from database.DatabaseForMac import Database
from web3 import Web3
from solcx import compile_standard, install_solc
import json

w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))

app = FastAPI()
# global variable
dtb = Database("feenix-mariadb.swin.edu.au", "s103843994", "120203", "s103843994_db")
# type your address here
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
# Default is 1337 or with the PORT in your Ganache
chain_id = 1337


@app.get("/getAllAssets")
async def getAllAssets():
    con = dtb.connect()
    data = dtb.getAllAssets(con)
    dtb.disconnect(con)
    return data
