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
        return new Block(0, new Date().toISOString(), { message: "Genesis Block" }, "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const prevBlock = this.getLatestBlock();
        const newBlock = new Block(
            prevBlock.index + 1,
            new Date().toISOString(),
            data,
            prevBlock.hash,
        );
        this.chain.push(newBlock);
    }

    isValidOwner(artId, previousOwner) {
        for (let i = this.chain.length - 1; i >= 0; i--) {
            const block = this.chain[i];
            if (block.data.artId === artId) {
                return block.data.owner === previousOwner || block.data.to === previousOwner;
            }
        }
    }

    checkLatestOwner(artId) {
        for (let i = this.chain.length - 1; i >=0; i--) {
            const block = this.chain[i];
            if (block.data.artId === artId) {
                return block.data.owner || block.data.to;
            }
        }
    }
}

export { Blockchain };