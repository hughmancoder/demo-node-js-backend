### Bookly
A book sharing application where you can share books with your friends and write your book 

### Features
- for every book you place on the libarary you gain a borrowing token
- system based on trust (used book sharing)
- supply and demand currency calibration, users get tokens for selling book valued on the basis of demand

### setup
- brew services start mongodb-community@6.0
- export bookly_private_env = "varname"

### To-Do
- [x] add customer api
- [ ] add auth middleware to protect api only where we modify data

### Developer notes
- put request invalid datat types causing errors add try and accept to part where we enter data and try additional validation if needed
- bad practice to store authentication tokens on db  as we want to protect api endpoints
- if you do decide to store it in db, make sure to encrypt (such as hasing it)
- store on client not server
- use https for secure encrypted client-server transactions
- export bookly_jwtPrivateKey="mySecureKey"