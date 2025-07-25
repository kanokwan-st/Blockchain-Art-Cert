import crypto from "crypto";

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash)
      .digest("hex");
  }
};

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now().toString(), { message: "Genesis Block" }, "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const prevBlock = this.getLatestBlock();
        const newBlock = new Block(
            prevBlock.index + 1,
            Date.now().toString(),
            data,
            prevBlock.hash,
        );
        this.chain.push(newBlock);
    }
}
