const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const blogPostRoutes = require('./routes/blogPostRoutes');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/blogposts', blogPostRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
