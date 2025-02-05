const express = require('express')
const cors =  require('cors')
const {
    connectDb,
    insertDocument,
    findDocuments,
    findDocumentById,
    updateDocument,
    deleteDocument
} = require("./common/db");


const app = express();
app.use(express.json()); // Parses JSON request body
app.use(express.urlencoded({ extended: true }));
app.use(cors())
connectDb();
app.get('/',async (req,res)=>{
    // res.send(process.env.PASSWORD)
    res.send(await findDocuments('feedback'))
})
app.post('/submitfeedback',async(req,res)=>{
    const result = await insertDocument('feedback',req.body)
    res.send({message:'sucess'})
})
app.listen(process.env.PORT||4000)