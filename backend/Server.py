from fastapi import FastAPI
from web3 import Web3
from IntegrationW3AndDatabase import BackendController
from database.Database import Database
from web3Project.Web3Instance import Web3Instance
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
dtb = Database("localhost", "root", "root", "COS30049")
w3 = Web3Instance(Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545")))
backendController = BackendController(w3, dtb)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# F1 + F2: Users can view digital assets available for trading.
@app.get("/getAllAssets")
async def getAllAssets():
    data = dtb.getAllAssets()
    return data

# F3: The system should provide a search and filter functionality for users to discover specific assets of interest.
@app.get("/getAllAssets/category/{category}")
async def getAllAssetsByCategory(category: str):
    data = dtb.getAssetByCategory(category)
    return data

# F3: The system should provide a search and filter functionality for users to discover specific assets of interest.
@app.get("/getAllAssets/search/{keyword}")
async def getAllAssetsBySearch(keyword: str):
    data = dtb.getAssetBySearch(keyword)
    return data


@app.get("/getAllAssets/user/{username}")
async def getAllAssetsOfUser(username: str):
    data = dtb.getAssetBySearch(username)
    return data

# F5: Users should have access to a transaction history to view their past trades.
@app.get("/getTransactions/{username}")
async def getUserTransactions(username):
    blockchainAddress = dtb.getUserInfo(username).address
    data = w3.get_transactions(blockchainAddress)
    return data

# F4: Trading
@app.get("/getAllRequestsOfAnAsset/{tokenID}")
async def getBidders(tokenID):
    contractAddress = dtb.getContractAddress(tokenID)
    data = w3.getParticipants(contractAddress)
    return data


# @app.get("/getOwnerAddress/{tokenID}")
# async def getOwnerAddress(tokenID):
#     contractAddress = dtb.getContractAddress(tokenID)
#     data = w3.getOwnerAddress(contractAddress)
#     return data

# F4:
@app.get("/registerToBuy/{username}/{tokenID}/{amount}")
async def registerToBuy(username, tokenID, amount: int):
    userInfo = dtb.getUserInfo(username)
    contractAddress = dtb.getContractAddress(tokenID)
    data = w3.registerToBuy(userInfo.address, userInfo.privateKey, contractAddress, amount)
    return {"result": data}


@app.get("/getBalanceOf/{username}")
async def getBalanceOf(username):
    userInfo = dtb.getUserInfo(username)
    data = w3.getBalanceOf(userInfo.address)
    return data

# F4:
@app.get("/getRequestsToBuyAssets/{username}")
async def getRequestsToBuyAssets(username):
    data = backendController.getAllCurrentRequestsForAUser(username)
    return data

# F4:
@app.get("/approve/{currentOwnerUsername}/{newOwnerAddress}/{tokenId}")
async def approve(currentOwnerUsername, newOwnerAddress, tokenId:int):
    data = backendController.approve(currentOwnerUsername, newOwnerAddress, tokenId)
    return {"result": data}


