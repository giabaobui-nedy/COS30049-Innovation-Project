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
    Username,
    Owner_ID,
    Pw,
    Email
    FROM Account''')

rows = cur.fetchall()

result = [
    {
        'Username': row[0],
        'Owner_ID': row[1],
        'Pw': row[2],
        'Email': row[3]
    }
    for row in rows
]

json_result = json.dumps(result, indent=2)

with open('account.json', 'w') as file:
    file.write(json_result)

print(json_result)
print("Save successfully!")

con.close()