from database.DatabaseForMac import Database
from database.Asset import Asset
from web3 import Web3
from solcx import compile_standard, install_solc
import json



# global variable
# type your address here
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
# Default is 1337 or with the PORT in your Gaanche
chain_id = 1337
dtb = Database("feenix-mariadb.swin.edu.au", "s103843994", "120203", "s103843994_db")
con = dtb.connect()
