import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchEmojis } from './controllers/emojiController.js';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/emojis', searchEmojis);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
