const localPort = process.env.PORT || 3500;
const dbPort = `${process.env.DB_URI}${process.env.DB_NAME}`

const allowedOrigins = [
    localPort,
    dbPort
    
]

export default allowedOrigins;