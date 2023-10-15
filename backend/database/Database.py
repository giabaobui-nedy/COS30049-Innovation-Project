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

    def updatePrice(self, tokenId, amount):
        self.connect()
        cur = self.con.cursor()
        query = f'''UPDATE ASSET SET price = '{amount}' WHERE tokenId = '{tokenId}';'''
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

def TestGetUsername():
    dtb = Database("localhost", "root", "root", "COS30049")
    print(dtb.getUsernameFromAddress("0x2db355e3cb258F9095e33e45CD7b8417C4108Ec5"))

# TestGetUsername()


def generateSampleUsers():
    dtb = Database("localhost", "root", "root", "COS30049")
    user = User("admin", "admin",
                "0x3446F14EE3628345eB5eB2FE2EABf6D26cC947D1", #address
                "0x1d9e6d130d08f435bf3eda23bfefd8d47ca386a2dbaa49d4a5f05a58a956e788") #private key
    user1 = User("admin1", "admin1",
                 "0xcAC3D4DeB1B462C1D8873cc09Fd7648339A68371",
                 "0x3f5067fc8daefe53ee65c80329e2459ae5b504b28c8e210c68f04d247262ab68")
    user2 = User("admin2", "admin2",
                 "0xd88e1bA3fAF4DEd6dAC99EaCf9b203F801c13291",
                 "0x5565aa59492f3603c4fb22abcf0eb6895f09acbad328a258fcd738ca71780b30")
    dtb.addUser(user)
    dtb.addUser(user1)
    dtb.addUser(user2)

# generateSampleUsers()
