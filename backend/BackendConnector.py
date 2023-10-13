from database.DatabaseForMac import Database
from database import Asset
from web3Project.Web3Instance import Web3Instance


class BackendController:
    web3Instance = Web3Instance
    dtb = Database("feenix-mariadb.swin.edu.au", "s103843994", "120203", "s103843994_db")

    def __init__(self):
        print("Hello World!")

    def addAssetToPlatform(self, ownerAddress, privateKey, tokenId, name, category, price, description, currentOwner, imgUrl):
        try:
            # get tokenID from local dtb
            # tokenId = self.dtb.getTokenId()
            # 1: deploy the token (Asset) to BlockChain
            smartContractAddress = self.web3Instance.deployAssetToBlockChain(ownerAddress, privateKey, tokenId)
            asset = Asset(tokenId, name, category, price, description, currentOwner, smartContractAddress, imgUrl)
            # 2:
            con = self.dtb.connect()
            self.dtb.addAsset(con, asset)
            return "Success"
        except:
            return "Error"
