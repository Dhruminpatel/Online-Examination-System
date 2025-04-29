require('dotenv').config();
const express = require('express');
const app = express();
const authroute = require('./router/auth-router');
const contactroute = require('./router/contact-router');
const examdetails = require('./router/exam-router');
const connectdatabase = require('./utils/databaseconnect');
const errormiddleware = require('./middlewares/error-middleware');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
};
//tackling cors
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Server is live and working!');
});
// Add this middleware to parse  JSON body
app.use(express.json());
//login and register
app.use('/api/auth', authroute);
//contactform
app.use('/api/form', contactroute);
//exam details
app.use('/api/exam', examdetails);
// app.get("/",(req,res)=>{
//     res.status(200).send('Welcome to besst mern stack series')
// })

// app.get("/register",(req,res)= >{
//     res.status(200).send('Welcome to registration Page')
// })
app.use(errormiddleware);
connectdatabase().then(() => {
  // const PORT = process.env.PORT || 5000;
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
});
