const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vote", function () {
  async function deployOnFirst() {
    [owner, cand1, cand2, voter1, voter2, voter3, voter4, voter5] = await ethers.getSigners();

    const Vote = await ethers.getContractFactory("Vote");
    const vote = await Vote.deploy();
  }
  describe("Settings", function () {
    it("Should Add Candidate", async function() {
      await vote.connect(owner).addCandidate(0, "test");
      expect(vote.candidates(0)).to.equal("test");
    });
  });
});
