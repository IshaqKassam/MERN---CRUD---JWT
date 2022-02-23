const express = require( 'express' )
const cors = require( 'cors' )
const Cookies = require( 'universal-cookie')

const app = express()
// app.use(cors())

app.get( '/auth', (req, res) => {
    const cookie = req.headers.cookie
    console.log( cookie )
    
    res.send("received", cookie.value)
})



app.listen(4005, () => {
    console.log("Dummy Server Up and Running 4005...")
})