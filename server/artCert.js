import { v4 as uuidv4 } from "uuid";

function createArtCert(title, artist, owner) {
    return {
        type: "CREATE",
        artId: uuidv4(),
        title,
        artist,
        owner,
        createdAt: new Date().toISOString()
    };
}

function transferArtCert(artId, previousOwner, newOwner) {
    return {
        type: "TRANSFER",
        artId,
        from: previousOwner,
        to: newOwner,
        transferred: new Date().toISOString()
    };
}

export { createArtCert, transferArtCert };
