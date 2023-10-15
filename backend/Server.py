from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3

from IntegrationW3AndDatabase import BackendController
from database.Database import Database
from web3Project.Web3Instance import Web3Instance

app = FastAPI()
# config
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
@app.get("/getAllAssets/search/{keyword}")
async def getAllAssetsBySearch(keyword: str):
    data = dtb.getAssetBySearch(keyword)
    return data

# F3: The system should provide a search and filter functionality for users to discover specific assets of interest.
@app.get("/getAllAssets/category/{category}")
async def getAllAssetsBySearch(category: str):
    data = dtb.getAssetByCategory(category)
    return data

# F5:
@app.get("/getUserDetails/{username}")
async def getUserDetails(username: str):
    userDetails = dtb.getUserInfo(username)
    balance = w3.getBalanceOf(userDetails.address)
    return {"userDetails": userDetails, "balance": balance}

# F5: Users should have access to a transaction history to view their past trades.
@app.get("/getTransactions/{username}")
async def getUserTransactions(username):
    blockchainAddress = dtb.getUserInfo(username).address
    data = w3.get_transactions(blockchainAddress)
    return data

# F4:
@app.get("/registerToBuy/{username}/{tokenID}/{amount}")
async def registerToBuy(username, tokenID, amount: int):
    userInfo = dtb.getUserInfo(username)
    contractAddress = dtb.getContractAddress(tokenID)
    data = "Errors in server!"
    if dtb.updatePrice(tokenID, amount):
        data = w3.registerToBuy(userInfo.address, userInfo.privateKey, contractAddress, amount)
    return {"result": data}

# F4:
@app.get("/getRequestsToBuyAssets/{username}")
async def getRequestsToBuyAssets(username):
    data = backendController.getAllCurrentRequestsForAUser(username)
    return data

# F4:
@app.get("/approve/{currentOwnerUsername}/{newOwnerAddress}/{value}/{tokenId}")
async def approve(currentOwnerUsername, newOwnerAddress, value: int, tokenId: int):
    data = backendController.approve(currentOwnerUsername, newOwnerAddress, tokenId, value)
    return {"result": data}

# testing
@app.get("/authenticate/{username}/{password}")
async def authenticate(username, password):
    if dtb.authenticate(username, password):
        return {"result": "authenticated"}
    else:
        return {"result": "Invalid credentials!"}
