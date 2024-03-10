// pages/api/fetchData.js

import axios from 'axios';

export default async function handler(req, res) {
  const { year, make, model } = req.query;
  const endpoint = process.env.FETCH_DATA_ENDPOINT; // Assuming you have a new endpoint in your environment variables

  try {
    const response = await axios.get(`${endpoint}?year=${year}&make=${make}&model=${model}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
