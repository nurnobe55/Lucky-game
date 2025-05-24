require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 5000;
mongoose.mongodb+srv://rjnur55:<@m6j%q5fNcFdraV>@clusternur.ddpkkt8.mongodb.net/(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));

