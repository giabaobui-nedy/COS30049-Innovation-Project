import MySQLdb;
import json;

con = MySQLdb.connect(
    host="feenix-mariadb.swin.edu.au",
    user="s103843994",
    password = "120203",
    database = "s103843994_db"
)

cur = con.cursor()

data = cur.execute('''SELECT
    username,
    password,
    address,
    privateKey,
    FROM Account''')

rows = cur.fetchall()

result = [
    {
        'Username': row[0],
        'password': row[1],
        'address': row[2],
        'privateKey': row[3]
    }
    for row in rows
]

json_result = json.dumps(result, indent=2)

print(json_result)
print("Save successfully!")

con.close()