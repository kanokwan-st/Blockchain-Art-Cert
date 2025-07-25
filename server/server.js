import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createArtCert, transferArtCert } from "./artCert.js";
import { Blockchain } from "./blockchain.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
const chain = new Blockchain();

// Send HTML file when visiting root URL
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, "../client")));


//------ Endpoint ------//
// Get chain (all block)
app.get('/api/chain', (req, res) => {
    res.json(chain.chain);
})

// Create certificate
app.post('/api/create', (req, res) => {
    const { title, artist, owner } = req.body;
    const certData = createArtCert(title, artist, owner);
    chain.addBlock(certData);
    res.json({ sucess: true, artId: certData.artId });
});

// Transfer ownership
app.post('/api/transfer', (req, res) => {
    const { artId, previousOwner, newOwner } = req.body;
    const transferData = transferArtCert(artId, previousOwner, newOwner);
    chain.addBlock(transferData);
    res.json({ success: true });
})

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
