// use for password hasing
const bcrypt = require('bcrypt')

// asycronous version used so we can serve other clients (default value is 10)
async function run() {
    const salt =  await bcrypt.genSalt(10) // returns a proimse
    const hashed = await bcrypt.hash('1234', salt);
    console.log(hashed)
}

run();