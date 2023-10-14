# DAO
class Asset:
    def __init__(self, tokenID, name, category, price, description, currentOwner, contractAddress, imgUrl):
        self.tokenID = tokenID
        self.name = name
        self.category = category
        self.price = price
        self.description = description
        self.currentOwner = currentOwner
        self.contractAddress = contractAddress
        self.imgUrl = imgUrl
