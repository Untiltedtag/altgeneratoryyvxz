const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const response = await fetch(`https://discord.com/api/guilds/1463607459946954794/members/${userId}`, {
      headers: {
        Authorization: `Bot MTQ2MzYwOTQyMTYxOTAwNzY3NA.G8i4WQ.gRYWistbBI8xnLJo34kqg3Y4SyAicsmJUU8Rz0`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const member = await response.json();
    const hasPremium = member.roles.includes('1463612380318535785');

    res.status(200).json({ hasPremium });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
