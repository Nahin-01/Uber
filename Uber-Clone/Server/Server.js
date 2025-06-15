import express from "express";
import cors from "cors";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-rfpqaxunspryydeu.us.auth0.com/.well-known/jwks.json", 
  }),
  audience: "https://dev-rfpqaxunspryydeu.us.auth0.com/api/v2/", 
  issuer: "https://dev-rfpqaxunspryydeu.us.auth0.com",  
  algorithms: ["RS256"],
});


app.get("/api/protected", checkJwt, (req, res) => {
  res.json({ message: "You have accessed protected data!" });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Express route: server.js
app.post('/api/update-location', async (req, res) => {
  const { driverId, lat, lng } = req.body;
  await db.query("UPDATE drivers SET lat = ?, lng = ? WHERE id = ?", [lat, lng, driverId]);
  res.send({ success: true });
});


app.get('/api/driver-locations/:vehicleType', async (req, res) => {
  const { vehicleType } = req.params;
  const [rows] = await db.query("SELECT * FROM drivers WHERE vehicleType = ?", [vehicleType]);
  res.json(rows);
});
