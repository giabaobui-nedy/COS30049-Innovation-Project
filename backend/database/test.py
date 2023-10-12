from User import User;
from Database import Database;

dtb = Database("feenix-mariadb.swin.edu.au", "s103843994", "120203", "s103843994_db")
con = dtb.connect()
assets = dtb.getAllAssets(con, "price")
assets2 = dtb.getAssetBySearch(con, "star")
assets3 = dtb.getAssetByCategory(con, "photography")
address = dtb.getAddressOfUser(con, "Zuychin")
print(address)
contAdd = dtb.getContractAddress(con, 6)
print(contAdd)
user = User("Someone", "pwd", "479d58d7EA5DA499f7Baf6EAB5B54A6D8c014F15", "flkjasdflkjwo")
#dtb.addUser(con, user)
dtb.disconnect(con)