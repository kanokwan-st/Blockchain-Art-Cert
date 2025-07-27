import { v4 as uuidv4 } from "uuid";

function createArtCert(title, artist, owner) {
    return {
        type: "CREATE",
        artId: uuidv4(),
        title,
        artist,
        owner
    };
}

function transferArtCert(artId, previousOwner, newOwner) {
    return {
        type: "TRANSFER",
        artId,
        from: previousOwner,
        to: newOwner
    };
}

export { createArtCert, transferArtCert };
