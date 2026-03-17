require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const app = express();
app.use(cors());
app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/auth/google", async (req, res) => {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const user = {
        email: payload.email,
        name: payload.name
    };

    const jwtToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token: jwtToken, user });
});

app.listen(5000, () => console.log("Server running on port 5000"));