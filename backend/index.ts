const server = require('./api/sever');
// require('dotenv').config();

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`\n=== Server listening on port ${port} ===\n`);
});