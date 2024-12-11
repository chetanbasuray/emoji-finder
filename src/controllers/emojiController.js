import { search } from 'node-emoji';
import axios from 'axios';

async function getRelatedTerms(word) {
  try {
    const response = await axios.get(`https://api.datamuse.com/words?rel_syn=${word}`);
    return response.data.map(item => item.word); // Extract related words
  } catch (error) {
    console.error("Error fetching related terms:", error);
    return [];
  }
}

export const searchEmojis = async (req, res) => {
  try {
    const { query } = req.query;

    // Validate the query
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid query parameter' });
    }

    // Fetch related terms
    const searchTerms = await getRelatedTerms(query);
    searchTerms.push(query);
    if(searchTerms.length > 0) {
    let emojis = [];

    // Collect emojis for all related terms
    searchTerms.forEach(term => {
      emojis = emojis.concat(search(term));
    });

    // Deduplicate emojis
    const uniqueEmojis = [];
    const seen = new Set();

    emojis.forEach(e => {
      if (!seen.has(e.emoji)) {
        seen.add(e.emoji);
        uniqueEmojis.push(e);
      }
    });

console.log(uniqueEmojis);

    // Format filtered emojis
    const filteredEmojis = uniqueEmojis.map(e => ({
      name: e.name,
      char: e.emoji,
      category: e.name,
      keywords: searchTerms
    }));

    // Send the result
    res.json(filteredEmojis);
  }
  } catch (error) {
    console.error('Error in searchEmojis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
