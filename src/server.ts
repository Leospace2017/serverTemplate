import express from "express"
import "dotenv/config"


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.PORT || 3500;



app.listen(port, () => console.log(`server started at port ${port}`))