const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vote", function () {
  let vote;
  let Vote;

  beforeEach(async function () {
    [owner, voter1, voter2, voter3, voter4, voter5, voter6] = await ethers.getSigners();

    Vote = await ethers.getContractFactory("Vote");
    vote = await Vote.deploy();
  });
  describe("Fails", function () {
    it("Should Fail Out Of Limit", async function() {
      await expect(vote.connect(owner).addCandidate(1, "test")).to.be.revertedWith("Out of limit.");
    });
  
    it("Should Fail This Candidate Already Added", async function() {
      await vote.connect(owner).addCandidate(0, "test");
      await expect(vote.connect(owner).addCandidate(0, "test")).to.be.revertedWith("This Candidate already added.");
    });

    it("Should Fail Votes Are Finished", async function() {
      await vote.connect(owner).announceResult();
      await expect(vote.connect(owner).addCandidate(0, "test")).to.be.revertedWith("Votes are finished.");
    });
    
    it("Should Fail You Already Voted", async function() {
      await vote.connect(owner).addCandidate(0, "t1");
      await vote.connect(owner).addCandidate(1, "t2");

      await vote.connect(voter1).vote(0);
      await expect(vote.connect(voter1).vote(1)).to.be.revertedWith("You already voted.");
    });

    it("Should Fail Invalid Candidate", async function() {
      //Invalid Candidate.
      await vote.connect(owner).addCandidate(0, "t1");
      
      await expect(vote.connect(voter1).vote(1)).to.be.revertedWith("Invalid Candidate.");
    });
  });
  describe("Settings", function() {
    it("Should Add Candidate", async function() {
      await vote.connect(owner).addCandidate(0, "cn1");
      await vote.connect(owner).addCandidate(1, "cn2");
      expect(await vote.candidates(0)).to.equal("cn1");
      expect(await vote.candidates(1)).to.equal("cn2");
    });

    it("Should Vote", async function () {
      await vote.connect(owner).addCandidate(0, "cn1");
      await vote.connect(voter1).vote(0);
      await vote.connect(voter2).vote(0);

      expect(await vote.getResult(0)).to.equal(2);
    });

    it("Should Announce Result", async function() {
      await vote.connect(owner).addCandidate(0, "cn1");
      await vote.connect(owner).addCandidate(1, "cn2");
      await vote.connect(owner).addCandidate(2, "cn3");
      await vote.connect(voter1).vote(0);
      await vote.connect(voter2).vote(0);
      await vote.connect(voter3).vote(0);
      await vote.connect(voter4).vote(1);
      await vote.connect(voter5).vote(1);
      await vote.connect(voter6).vote(2);

      await vote.connect(owner).announceResult();
      expect(await vote.winner()).to.equal("cn1");
    });
  });
});