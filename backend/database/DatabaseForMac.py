import mysql.connector
import json


class Database:
    con = None

    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def connect(self):
        if self.con is not None:
            print("-- A new database connection is created")
            self.con = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            print("-- Return the created connection")

    def disconnect(self):
        if self.con is not None:
            print("-- Close the opened connection")
            self.con.close()

    def getAllAssets(self, sortBy=None, sortOrder="ASC"):
        # connect to the db
        self.connect()
        # take the cursor
        cur = self.con.cursor()
        if sortBy is None:
            query = '''
            SELECT * FROM Asset;
            '''
        else:
            query = f'''
            SELECT * FROM Asset
            ORDER BY {sortBy} {sortOrder};
            '''
        # execute the query
        print("Query to be executed: " + query)
        cur.execute(query)
        # fetch all rows
        rows = cur.fetchall()
        assets = [
            {
                'tokenID': row[0],
                'name': row[1],
                'description': row[2],
                'price': row[3],
                'category': row[4],
                'currentOwner': row[5],
                'contractAddress': row[6],
                'imgUrl': row[7]
            }
            for row in rows
        ]

        # return json assets
        jsonAssets = json.dumps(assets, indent=2)

        # close the connection
        self.disconnect()
        return jsonAssets

    def getAssetBySearch(self, keyword):
        self.connect()
        cur = self.con.cursor()
        query = f'''
        SELECT * FROM Asset
        WHERE name LIKE '%{keyword}%' OR description LIKE '%{keyword}%';
        '''
        # execute the query
        print("Query to be executed: " + query)
        cur.execute(query)
        # fetch all rows
        rows = cur.fetchall()
        matchedAssets = [
            {
                'tokenID': row[0],
                'name': row[1],
                'description': row[2],
                'price': row[3],
                'category': row[4],
                'currentOwner': row[5],
                'contractAddress': row[6],
                'imgUrl': row[7]
            }
            for row in rows
        ]
        jsonMatchedAssets = json.dumps(matchedAssets, indent=2)
        self.disconnect()
        return jsonMatchedAssets

    def getAssetByCategory(self, con, cat):
        self.connect()
        cur = con.cursor()
        query = f'''
        SELECT * FROM Asset WHERE category = '{cat}';
        '''
        cur.execute(query)
        rows = cur.fetchall()
        filteredAssets = [
            {
                'tokenID': row[0],
                'name': row[1],
                'category': row[2],
                'price': row[3],
                'description': row[4],
                'currentOwner': row[5],
                'contractAddress': row[6],
                'imgUrl': row[7]
            }
            for row in rows
        ]
        jsonFilteredAssets = json.dumps(filteredAssets, indent=2)
        self.disconnect()
        return jsonFilteredAssets

    def getContractAddress(self, tokenID):
        self.connect()
        cur = self.con.cursor()
        query = f'''
        SELECT contractAddress FROM Asset WHERE tokenID = '{tokenID}';                    
        '''
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

    def getAddressOfUser(self, username):
        self.connect()
        cur = self.con.cursor()
        query = f'''
        SELECT address FROM User WHERE username = '{username}';                    
        '''
        # execute the query
        print("Query to be executed: " + query)
        cur.execute(query)
        # get the result
        userAddress = cur.fetchone()
        self.disconnect()
        if userAddress:
            return userAddress[0]
        else:
            return None

    # add asset to the local database
    def addAsset(self, asset):
        self.connect()
        cur = self.con.cursor()
        rowCount = cur.execute('''
        INSERT INTO Asset
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);                    
        ''', (asset.tokenID, asset.name, asset.category, asset.price, asset.description, asset.currentOwner,
              asset.contractAddress, asset.imgUrl))
        self.con.commit()
        if rowCount > 0:
            print("Asset added successfully.")
        else:
            print("Failed to add asset.")
        self.disconnect()

    # add user to the local database
    def addUser(self, user):
        self.connect()
        cur = self.con.cursor()
        rowCount = cur.execute('''
        INSERT INTO User
        VALUES (%s, %s, %s, %s);                    
        ''', (user.username, user.password, user.address, user.privateKey))
        self.con.commit()
        if rowCount > 0:
            print("User added successfully.")
        else:
            print("Failed to add user.")
        self.disconnect()

    # get the next available token id
    def getTokenId(self):
        pass
