const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("hello", salt);

console.log(hash);

console.log(bcrypt.compareSync("sh2", hash));
