const express = require('express');
const aiRoutes = require("./routes/ai.routes");
const cors=require('cors')

const app = express();

app.use(cors())

// Add json middleware BEFORE routes
app.use(express.json());

// Then routes
app.use("/ai", aiRoutes);

// Then catch-all route
app.use('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;