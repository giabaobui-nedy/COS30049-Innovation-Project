from fastapi import FastAPI
from web3 import Web3
from database.DatabaseForMac import Database
from web3Project.Web3Instance import Web3Instance
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()
dtb = Database("localhost", "root", "root", "COS30049")
w3 = Web3Instance(Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545")))

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/getAllAssets")
async def getAllAssets():
    data = dtb.getAllAssets()
    return data
