import axios from 'axios';

export default async function handler(req, res) {
  const { year, make, model } = req.query;
  const endpoint = process.env.RATING_API_ENDPOINT;

  try {
    const response = await axios.get(`${endpoint}?year=${year}&make=${make}&model=${model}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching rating data' });
  }
}