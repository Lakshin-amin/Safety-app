import Twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { phone, message } = req.body;
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const fromNumber = process.env.TWILIO_FROM; 

  const client = Twilio(accountSid, authToken);
  try {
    const sent = await client.messages.create({ body: message, from: fromNumber, to: phone });
    res.status(200).json({ sid: sent.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
