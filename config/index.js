require('dotenv-flow').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    database: {
        dbURI: process.env.dbURI,
        poolSize: process.env.poolSize,
        useNewUrlParser: process.env.useNewUrlParser,
        useCreateIndex: process.env.useCreateIndex,
        useUnifiedTopology: process.env.useUnifiedTopology,
        useFindAndModify: process.env.useFindAndModify,
        socketTimeoutMS: process.env.socketTimeoutMS,
        connectTimeoutMS: process.env.connectTimeoutMS,
    },
};
