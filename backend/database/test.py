import Database;
import Asset;
import User;
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