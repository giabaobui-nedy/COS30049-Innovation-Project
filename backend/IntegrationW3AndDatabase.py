import random

from web3 import Web3

from database.Asset import Asset
from database.DatabaseForMac import Database
from web3Project.Web3Instance import Web3Instance


class BackendController:
    dtb = None
    w3 = None

    def __init__(self, w3, dtb):
        if self.w3 is None:
            self.w3 = w3
        if self.dtb is None:
            self.dtb = dtb

    def addAssetToPlatform(self, username, assetName, assetCategory, assetPrice, assetDes, assetUrl):
        user = self.dtb.getUserInfo(username)
        tokenId = self.dtb.getTokenId()
        contractAddress = self.w3.deployAssetToBlockChain(user.address, user.privateKey, tokenId)
        assetToBeAdded = Asset(tokenId, assetName, assetCategory, assetPrice, assetDes, user.username, contractAddress,
                               assetUrl)
        self.dtb.addAsset(assetToBeAdded)

    def addMultipleAssetsToPlatform(self, assets):
        [self.addAssetToPlatform(asset.currentOwner, asset.name, asset.category,
                                 asset.price, asset.description, asset.imgUrl) for asset in assets]


def generateSampleData():
    # Define the list of random owners, categories, and quotes for description
    owners = ["admin", "admin1", "admin2"]
    random_location_names = [
        "Paris",
        "Tokyo",
        "Venice",
        "New York",
        "Sydney",
        "Rio de Janeiro",
        "Cairo",
        "Barcelona",
        "Dubai",
    ]
    categories = ["Art",
                  "Gaming",
                  "Membership",
                  "PFPs",
                  "Photography",
                  "Music"]
    quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "In the middle of every difficulty lies opportunity. - Albert Einstein",
        "Life is what happens when you're busy making other plans. - John Lennon",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "The best way to predict the future is to create it. - Peter Drucker",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "The only thing necessary for the triumph of evil is for good men to do nothing. - Edmund Burke",
        "Life is really simple, but we insist on making it complicated. - Confucius",
        "It does not matter how slowly you go as long as you do not stop. - Confucius"
    ]
    # Create a list of 9 assets with random attributes
    assets = []
    for i in range(9):
        owner = random.choice(owners)
        name = random_location_names[i]
        category = random.choice(categories)
        price = round(random.uniform(100, 1000))
        description = quotes[i]
        img_url = f"https://picsum.photos/id/{i + 10}/200/200"
        asset = Asset(None, name, category, price, description, owner, None, img_url)
        assets.append(asset)

    dtb = Database("localhost", "root", "root", "COS30049")
    w3 = Web3Instance(Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545")))

    backend_controller = BackendController(w3, dtb)
    backend_controller.addMultipleAssetsToPlatform(assets)


# generateSampleData()
