const express = require('express');
const http = require('http');
const cors = require('cors')
const app = express();
const gqlSchema = require('./schema');
const gqlResolver = require('./resolver')

const { graphqlHTTP } = require('express-graphql');
app.use(cors())
app.use('/graphql', graphqlHTTP({
schema: gqlSchema,
rootValue: gqlResolver
}));

const server = http.createServer(app);
server.listen(4000, () => {
    console.log('Server up and running on port 4000');
})