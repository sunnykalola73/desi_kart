import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_CONNECTIONSTRING,{
    useNewUrlParser : true
})

