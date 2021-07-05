
const mongoose = require('mongoose');

const url = 'mongodb+srv://'+process.env.MONGO_ATLAS_USERNAME+':'+process.env.MONGO_ATLAS_PW+'@cluster0.iuexk.mongodb.net/'+process.env.MONGO_ATLAS_DB_NAME+'?retryWrites=true&w=majority';

const option = {
    useUnifiedTopology: true,
    useNewUrlParser: true

}
mongoose.connect(url, option);

module.exports = mongoose;