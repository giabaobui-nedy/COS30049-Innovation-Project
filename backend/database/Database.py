import mysql.connector

from database.User import User


class Database:
    con = None

    def __init__(self, host, user, password, database):
        print("Database is ready!")
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def connect(self):
        if self.con is None:
            print("-- A new database connection is created")
            self.con = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
                port=8889
            )
        else:
            self.con.connect()
            print("-- Return the created connection")

    def disconnect(self):
        if self.con is not None:
            print("-- Close the opened connection")
            self.con.close()

    # get all the available assets for trading
    def getAllAssets(self, sortBy=None, sortOrder="ASC"):
        # connect to the db
        self.connect()
        # take the cursor
        cur = self.con.cursor()
        if sortBy is None:
            query = '''SELECT * FROM Asset;'''
        else:
            query = f'''SELECT * FROM Asset ORDER BY {sortBy} {sortOrder};'''
        # execute the query
        print("Query to be executed: " + query)
        cur.execute(query)
        # fetch all rows
        rows = cur.fetchall()
        assets = [dict(zip(cur.column_names, row)) for row in rows]
        # close the connection
        self.disconnect()
        return assets

    # get the asset by search keyword
    def getAssetBySearch(self, keyword):
        self.connect()
        cur = self.con.cursor()
        query = f''' SELECT * FROM Asset WHERE name LIKE '%{keyword}%';'''
        # execute the query
        print("Query to be executed: " + query)
        cur.execute(query)
        # fetch all rows
        rows = cur.fetchall()
        assetsBySearch = [dict(zip(cur.column_names, row)) for row in rows]
        self.disconnect()
        return assetsBySearch

    # get the asset by their category
    def getAssetByCategory(self, cat):
        self.connect()
        cur = self.con.cursor()
        query = f'''SELECT * FROM ASSET WHERE category = '{cat}';'''
        print("Query to be executed: " + query)
        cur.execute(query)
        rows = cur.fetchall()
        assetsByCategory = [dict(zip(cur.column_names, row)) for row in rows]
        self.disconnect()
        return assetsByCategory

    # get the asset of a user
    def getAssetOfAUser(self, username):
        self.connect()
        cur = self.con.cursor()
        query = f''' SELECT * FROM Asset WHERE currentOwner = '{username}';'''
        # execute the query
        print("Query to be executed: " + query)
        cur.execute(query)
        # fetch all rows
        rows = cur.fetchall()
        assetsBySearch = [dict(zip(cur.column_names, row)) for row in rows]
        self.disconnect()
        return assetsBySearch


    # get the contract address of an asset
    def getContractAddress(self, tokenID):
        self.connect()
        cur = self.con.cursor()
        query = f'''SELECT contractAddress FROM Asset WHERE tokenID = '{tokenID}';'''
        # execute the query
        print("Query to be executed: " + query)
        cur.execute(query)
        # get the result
        contractAddress = cur.fetchone()
        self.disconnect()
        if contractAddress:
            return contractAddress[0]
        else:
            return None

    # add asset to the local database
    def addAsset(self, asset):
        self.connect()
        cur = self.con.cursor()
        cur.execute('''INSERT INTO Asset VALUES (%s, %s, %s, %s, %s, %s, %s, %s);''',
                    (asset.tokenID, asset.name, asset.category,
                     asset.price, asset.description, asset.currentOwner,
                     asset.contractAddress, asset.imgUrl))
        self.con.commit()
        print("Asset added successfully.")
        self.disconnect()

    # add user to the local database
    def addUser(self, user):
        self.connect()
        cur = self.con.cursor()
        cur.execute('''INSERT INTO User VALUES (%s, %s, %s, %s);''',
                    (user.username, user.password, user.address, user.privateKey))
        self.con.commit()
        print("User added successfully.")
        self.disconnect()

    # get the next available token id
    def getTokenId(self):
        self.connect()
        cur = self.con.cursor()
        cur.execute('''SELECT COUNT(*) FROM ASSET''')
        currentNumberOfAssets = cur.fetchone()
        print("The next token id is: " + str(currentNumberOfAssets[0]))
        self.disconnect()
        return currentNumberOfAssets[0] + 1

    # get user private key and address
    def getUserInfo(self, username):
        self.connect()
        cur = self.con.cursor()
        query = f'''SELECT address, privateKey FROM User WHERE username = '{username}';'''
        # execute the query
        print("Query to be executed: " + query)
        cur.execute(query)
        # get the result
        result = cur.fetchone()
        user = None
        if result:
            user = User(username, None, result[0], result[1])
        self.disconnect()
        return user

    # update the current user in the local database
    def updateOwnerOfAsset(self, tokenId, newOwner):
        self.connect()
        cur = self.con.cursor()
        query = f'''UPDATE ASSET SET currentOwner = '{newOwner}' WHERE tokenId = '{tokenId}';'''
        print("Query to be executed: " + query)
        cur.execute(query)
        self.con.commit()
        result = cur.rowcount
        self.disconnect()
        if result == 1:
            print("Asset has been updated added successfully.")
            return True
        else:
            print("Nothing was updated.")
            return False


    def getUsernameFromAddress(self, address):
        self.connect()
        cur = self.con.cursor()
        query = f'''SELECT username FROM User WHERE address = '{address}';'''
        # execute the query
        print("Query to be executed: " + query)
        cur.execute(query)
        # get the result
        result = cur.fetchone()
        username = None
        if result:
            username = result[0]
        self.disconnect()
        return username

    def authenticate(self, username, password):
        self.connect()
        cur = self.con.cursor()
        query = f'''SELECT password FROM User WHERE username = '{username}';'''
        print("Query to be executed: " + query)
        cur.execute(query)
        result = cur.fetchone()
        if result[0] is not None:
            if result[0] == password:
                return True
        else:
            return False

def TestGetUsername():
    dtb = Database("localhost", "root", "root", "COS30049")
    print(dtb.getUsernameFromAddress("0x2db355e3cb258F9095e33e45CD7b8417C4108Ec5"))

# TestGetUsername()


def generateSampleUsers():
    dtb = Database("localhost", "root", "root", "COS30049")
    user = User("admin", "admin",
                "0x61D375982B3E7a216626E9FEE4fBeee05e32d30F", #address
                "0xcce3d66776d94f8808406006815036e37212be2b6c88c496f605c563fdc7d024") #private key
    user1 = User("admin1", "admin1",
                 "0xfcEFcd85dee8160E19EA72ED6c5fFC52A23D1941",
                 "0xeed18e75aa273032c2199f346174377ac8c20c179d5f8df55bc46a67b4c54165")
    user2 = User("admin2", "admin2",
                 "0xE1aBe120d1e83502986aC7eB34709D5258D68A3f",
                 "0xcaca6b1d70c7a1f96c6c82458d2c8feef6d66b6011b41cace75927e7123cbf67")
    dtb.addUser(user)
    dtb.addUser(user1)
    dtb.addUser(user2)

# generateSampleUsers()
