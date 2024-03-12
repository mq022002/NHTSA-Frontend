import axios from "axios";

export default async function handler(req, res) {
  const { year, make, model } = req.query;
  const endpoint = process.env.FETCH_DATA_ENDPOINT; // Ensure this points to the correct endpoint

  try {
    const response = await axios.get(
      `${endpoint}?year=${year}&make=${make}&model=${model}`
    );
    // The new response format is different from the old one.
    const data = response.data.body
      ? JSON.parse(response.data.body)
      : response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error("uh oh 🦧, error fetching data:", error);
    res.status(500).json({ error: "uh oh 🦧, error fetching data" });
  }
}
