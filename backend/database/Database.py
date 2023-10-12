import MySQLdb;
import json;
import Asset;
import User;

class Database:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def connect(self):
        con = MySQLdb.connect(
            host = self.host,
            user = self.user,
            password = self.password,
            database = self.database
        )
        return con

    def disconnect(self, con):
        return con.close()
    
    def getAllAssets(self, con, sortBy = None, sortOrder = "ASC"):
        cur = con.cursor()
        if sortBy is None:
            query = '''
            SELECT * FROM Asset
            '''
        else:
            query = f'''
            SELECT * FROM Asset
            ORDER BY {sortBy} {sortOrder}
            '''
        cur.execute(query)
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
        jsonAssets = json.dumps(assets, indent=2)
        return jsonAssets
    
    def getAssetBySearch(self, con, pattern):
        cur = con.cursor()
        query = cur.execute(f'''
        SELECT * FROM Asset
        WHERE name LIKE '%{pattern}%' OR description LIKE '%{pattern}%'
        ''')
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
        return  jsonMatchedAssets      

    def getAssetByCategory(self, con, cat):
        cur = con.cursor()
        query = cur.execute('''
        SELECT * FROM Asset WHERE category = %s
        ''', cat)
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
        return jsonFilteredAssets

    def getContractAddress(self, con, tokenID):
        cur = con.cursor()
        query = cur.execute('''
        SELECT contractAddress FROM Asset WHERE tokenID = %s                    
        ''', tokenID)
        contractAdd = cur.fetchone()
        if contractAdd:
            return contractAdd[0]
        else:
            return None
    
    def getAddressOfUser(self, con, username):
        cur = con.cursor()
        query = cur.execute('''
        SELECT address FROM Asset WHERE username = %s                    
        ''', username)
        userAdd = cur.fetchone()
        if userAdd:
            return userAdd[0]
        else:
            return None
        
    def addAsset(self, con, asset):
        cur = con.cursor()
        query = cur.execute('''
        INSERT INTO Asset
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)                    
        ''', (asset.tokenID, asset.name, asset.category, asset.price, asset.description, asset.currentOwner, asset.contractAddress, asset.imgUrl))
        con.commit()
        if query > 0:
            print("Asset added successfully.")
        else:
            print("Failed to add asset.")

    def addUser(self, con, user):
        cur = con.cursor()
        query = cur.execute('''
        INSERT INTO User
        VALUES (%s, %s, %s, %s)                    
        ''', (user.username, user.password, user.address, user.privateKey))
        con.commit()
        if query > 0:
            print("User added successfully.")
        else:
            print("Failed to add user.")

    




dtb = Database("feenix-mariadb.swin.edu.au", "s103843994", "120203", "s103843994_db")
con = dtb.connect()
dtb.getAllAssets(con, "price")
dtb.getAssetBySearch(con, "star")
dtb.getAssetByCategory(con, "photography")
dtb.getAddressOfUser(con, "Zuychin")
dtb.getContractAddress(con, 6)

user = User("Someone", "pwd", "479d58d7EA5DA499f7Baf6EAB5B54A6D8c014F15", "flkjasdflkjwo")
dtb.addUser(con, user)
dtb.disconnect(con)
