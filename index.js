
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const API_URL = 'https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4328';
 // Premier League sample

app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    console.log('API response data:', response.data);

    const events = response.data.events || [];

    if (events.length === 0) {
      console.log('No upcoming events found in API response');
      return res.status(404).json({ error: 'No upcoming matches found' });
    }

    const matches = events.map(event => ({
      date: event.dateEvent,
      time: event.strTime || 'TBD',
      homeTeam: event.strHomeTeam,
      awayTeam: event.strAwayTeam,
      venue: event.strVenue || 'TBD',
      winRatio: `${Math.floor(Math.random() * 21) + 40}% – ${100 - (Math.floor(Math.random() * 21) + 40)}%`
    }));

    res.json(matches.slice(0, 20)); // Limit to 20
  } catch (error) {
    console.error('Error fetching match data:', error.message);
    res.status(500).json({ error: 'Failed to fetch match data' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Server is running. Try /api/matches to see football data.');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
