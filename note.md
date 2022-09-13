MERN - Stack
M- Mongo/Mongoose
E - Express
R - React
N - Node
Traditional Database
Databases - collection of tables (users, products, movies)
Tables - Primary Key (Id), Columns of data, and Rows of Data
Records - actual values that are stored in a table

Mongo Database
Database
Collections = Tables
Documents = Records

## MongoShell

- Start the monogo shell in terminal you must type in `mongosh`
- `show dbs` - show all your databases
- `use [database name] - this not only take to that database it will also create one if it does not exisit
- `show collections` - shows the collections/tables

- `db.[collection name].insertOne({key: value})` will insert on document(record)

- `db.[collection name].find()` - find all docuements/records that are in the collection
- db.[collection name].find({"firstName": "Josh"}) - find all documents (records that the firstname = Josh) - Returns ARRAY

- db.[collection name].findOne({"firstName": "Josh"}) - find first documents (records that the firstname = Josh) - Returns OBJECT
