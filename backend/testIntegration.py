from web3 import Web3
from database.DatabaseForMac import Database
from database.Asset import Asset
from web3Project.Web3Instance import Web3Instance


class BackendController:
    dtb = Database("localhost", "root", "root", "COS30049")
    w3 = Web3Instance(Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545")))

    def __init__(self):
        print("Hello World!")

    def addAssetToPlatform(self, username, assetName, assetCategory, assetPrice, assetDes, assetUrl):
        user = self.dtb.getUserInfo(username)
        tokenId = self.dtb.getTokenId()
        contractAddress = self.w3.deployAssetToBlockChain(user.address, user.privateKey, tokenId)
        assetToBeAdded = Asset(tokenId, assetName, assetCategory, assetPrice, assetDes, user.username, contractAddress,
                               assetUrl)
        self.dtb.addAsset(assetToBeAdded)
