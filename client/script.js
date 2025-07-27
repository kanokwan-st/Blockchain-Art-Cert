const API_URL = "http://localhost:3000";

//------------------ Create Certificate ------------------//
const createCertBtn = document.getElementById("createCertBtn");

createCertBtn.addEventListener("click", async () => {
  try {
    // Get input elements
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");
    const owner = document.getElementById("owner");

    // Get value from input
    const certData = {
      title: title.value,
      artist: artist.value,
      owner: owner.value,
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

    // Get value from input
    const transferData = {
      artId: artId.value,
      previousOwner: previousOwner.value,
      newOwner: newOwner.value,
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
    alert("Failed to transfer owner");
  }
});

