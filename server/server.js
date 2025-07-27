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

    // Check if previous owner match with art ID
    if (!chain.isValidOwner(artId, previousOwner)) {
        return (
            res.status(400).json({ success: false, message: "Previous owner does not match the Art ID." })
        )
    };

    const transferData = transferArtCert(artId, previousOwner, newOwner);
    chain.addBlock(transferData);

    res.json({ success: true, message: "Transferring is success." });
})

// Check current owner
app.post('/api/check/owner', (req, res) => {
    const { artId } = req.body;

    if (!artId) {
        return res.json({ success: false, message: "Art ID is required."});
    };

    const latestOwner = chain.checkLatestOwner(artId);

    if (latestOwner) {
        return res.json({ success: true, latestOwner });
    } else {
        return res.json({ success: false, message: "Cannot find owner for this Art ID."});
    }
})

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
