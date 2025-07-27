const API_URL = "https://blockchain-art-cert.onrender.com/";

//------------------ Create Certificate ------------------//
const createCertBtn = document.getElementById("createCertBtn");

createCertBtn.addEventListener("click", async () => {
  try {
    // Get input elements
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");
    const owner = document.getElementById("owner");

    // Verify input value
    if (!title.value.trim() || !artist.value.trim() || !owner.value.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    // Get value from input
    const certData = {
      title: title.value.trim(),
      artist: artist.value.trim(),
      owner: owner.value.trim(),
    };

    // Send certificate data to server
    await axios.post(`${API_URL}/api/create`, certData);

    // Notify user
    alert("✅ Certificate created!");

    // Clear input fields
    title.value = "";
    artist.value = "";
    owner.value = "";
  } catch (err) {
    console.log("Error creating certificate: ", err);
    alert("Failed to create certificate.");
  }
});

//------------------ Show Blockchain ------------------//
const blockchainBox = document.getElementById("blockchain-box");

// Fetch blockchain data from server
setInterval(async () => {
  try {
    const response = await axios.get(`${API_URL}/api/chain`);
    const blockchainData = JSON.stringify(response.data, null, 2);
    blockchainBox.textContent = blockchainData;
  } catch (err) {
    console.log("Error fetching blockchain data: ", err);
  }
}, 3000);

//------------------ Transfer Owner ------------------//
const transferBtn = document.getElementById("transferBtn");

transferBtn.addEventListener("click", async () => {
  try {
    // Get input elements
    const artId = document.getElementById("artId");
    const previousOwner = document.getElementById("previousOwner");
    const newOwner = document.getElementById("newOwner");

    // Verify input value
    if (!artId.value.trim() || !previousOwner.value.trim() || !newOwner.value.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    // Get value from input
    const transferData = {
      artId: artId.value.trim(),
      previousOwner: previousOwner.value.trim(),
      newOwner: newOwner.value.trim(),
    };

    // Send transfer data to server
    await axios.post(`${API_URL}/api/transfer`, transferData);

    // Notify user
    alert("Certificate transfered! ✅");

    // Clear input fields
    artId.value = "";
    previousOwner.value = "";
    newOwner.value = "";
  } catch (err) {
    console.log("Error transfering owner", err);
    
    if (err.response && err.response.data.message) {
        alert(err.response.data.message);
    } else {
        alert("Unexpected error occurred.");
    };
  }
});

//------------------ Check current owner ------------------//
const checkOwnerBtn = document.getElementById("checkOwnerBtn");

checkOwnerBtn.addEventListener("click", async () => {
  try {
    // Get art Id from input
    const checkArtId = document.getElementById("checkArtId");
    const artId = checkArtId.value.trim();

    const id = { artId };

    // Send art Id to server
    const response = await axios.post(`${API_URL}/api/check/owner`, id);
    let owner = response.data.latestOwner;

    if (!owner) {
      const message = response.data.message;
      alert(message);
      owner = "";
    }

    // Display owner
    const currentOwner = document.getElementById("currentOwner");
    currentOwner.value = owner;
  } catch (err) {
    console.log("Error checking owner", err);
    alert("Failed to check owner");
  }
});
