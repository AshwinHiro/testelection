const { Pool } = require('pg');
const express = require('express');
const { exec } = require('child_process');

const app = express();

POSTGRES_URL="postgres://default:2jsLywPhBUR0@ep-proud-frost-a43l5fbh-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"

const pool = new Pool({
  connectionString: POSTGRES_URL ,
})

app.get('/', (req, res) => {
	res.send('hello world')

})

app.get('/api/election_data', async (req, res) => {
  try {
    const client = await pool.connect();
    console.log(client)
    const result = await client.query('SELECT * FROM Election_2024');
    const rows = result.rows;
    await client.release();
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error retrieving data');
  }
});

const PORT = process.env.PORT || 3001;
const API_PATH = '/api/election_data';

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  
  // Open Chrome with the specified URL after the server starts
});
