const bcrypt = require('bcrypt');

const saltRounds = 10;
const plainPassword = 'Gayathri';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log(`Hashed password: ${hash}`);

});
