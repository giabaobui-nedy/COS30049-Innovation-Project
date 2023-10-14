from database.Asset import Asset


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