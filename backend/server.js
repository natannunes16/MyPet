require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const postRoutes = require('./routes/postRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const storyRoutes = require('./routes/storyRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/locations', locationRoutes);

app.get('/', (req, res) => {
  res.send('MyPet API está rodando!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
