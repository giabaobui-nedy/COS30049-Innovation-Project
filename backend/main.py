from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from web3 import Web3
import os
from solcx import compile_standard, install_solc
import json
from database.Database import Database
import MySQLdb

# blockchain variables
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
chain_id = 1337
my_address = "0x1Bf52eF94394fDC8735B07Ac12BB6f1A5C87A1aF"
private_key = "0x582f12f96eca1f247412e173db188b529c68a1dfa1ccfd02a5430e03b33ea5c9"
# fastAPI instance
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dtb = Database("feenix-mariadb.swin.edu.au", "s103843994", "120203", "s103843994_db")

class AssetResponse(BaseModel):
    tokenID: int
    name: str
    category: str
    price: float
    description: str
    currentOwner: str
    contractAddress: str
    imgUrl: str
    

@app.get("/", response_model=list[AssetResponse])
def get_all_assets():
    con = dtb.connect()
    try:
        assets = dtb.getAllAssets(con)
        return assets
    except MySQLdb.Error as err:
        return {"error": f"Error: {err}"}
    finally:
        dtb.disconnect()

@app.get("/search/{pattern}", response_model=list[AssetResponse])
async def get_assets_by_search(pattern: str):
    con = dtb.connect()
    try:
        assets = dtb.getAssetBySearch(con, pattern)
        return assets
    except MySQLdb.Error as err:
        return {"error": f"Error: {err}"}
    finally:
        dtb.disconnect(con)

@app.get("/category/{category}", response_model=list[AssetResponse])
async def get_assets_by_category(category: str):
    con = dtb.connect()
    try:
        assets = dtb.getAssetByCategory(con, category)
        return assets
    except MySQLdb.Error as err:
        return {"error": f"Error: {err}"}
    finally:
        dtb.disconnect(con)
