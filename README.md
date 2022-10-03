### Bookly
A book sharing application where you can share books with your friends and write your book 

### Features
- for every book you place on the libarary you gain a borrowing token
- system based on trust (used book sharing)
- supply and demand currency calibration, users get tokens for selling book valued on the basis of demand

### To-Do
- [x] add customer api

### Developer notes
- put request invalid datat types causing errors add try and accept to part where we enter data and try additional validation if needed

### Depreciated warnings for updating code base
 (node:56526) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future  version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
    at connect (/Users/hughsignoriello/Code/Bookly/node_modules/mongoose/node_modules/mongodb/lib/operations/connect.js:283:3)
    at /Users/hughsignoriello/Code/Bookly/node_modules/mongoose/node_modules/mongodb/lib/mongo_client.js:284:5
    at maybePromise (/Users/hughsignoriello/Code/Bookly/node_modules/mongoose/node_modules/mongodb/lib/utils.js:692:3)
    at MongoClient.connect (/Users/hughsignoriello/Code/Bookly/node_modules/mongoose/node_modules/mongodb/lib/mongo_client.js:280:10)
    at /Users/hughsignoriello/Code/Bookly/node_modules/mongoose/lib/connection.js:836:12
    at new Promise (<anonymous>)
    at Connection.openUri (/Users/hughsignoriello/Code/Bookly/node_modules/mongoose/lib/connection.js:832:19)
    at /Users/hughsignoriello/Code/Bookly/node_modules/mongoose/lib/index.js:351:10
    at /Users/hughsignoriello/Code/Bookly/node_modules/mongoose/lib/helpers/promiseOrCallback.js:32:5
    at new Promise (<anonymous>)
    at promiseOrCallback (/Users/hughsignoriello/Code/Bookly/node_modules/mongoose/lib/helpers/promiseOrCallback.js:31:10)
    at Mongoose._promiseOrCallback (/Users/hughsignoriello/Code/Bookly/node_modules/mongoose/lib/index.js:1149:10)
    at Mongoose.connect (/Users/hughsignoriello/Code/Bookly/node_modules/mongoose/lib/index.js:350:20)
    at Object.<anonymous> (/Users/hughsignoriello/Code/Bookly/index.js:9:10)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1159:10)