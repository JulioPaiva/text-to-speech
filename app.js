var app = require('./config/server');    

app.listen(process.env.PORT, async () => console.log('Servidor ON'));