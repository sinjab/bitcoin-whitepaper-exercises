"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// insert each line into blockchain
for (let line of poem) {
	Blockchain.blocks.push(
		createBlock(line)
	)
}
console.log("Blocks");

console.table(Blockchain.blocks, ['hash', 'prevHash']);
console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

console.table(Blockchain.blocks, ['hash', 'data']);
let i = 7
Blockchain.blocks[i].data = "the power of wind can chill."
Blockchain.blocks[i].hash = blockHash(Blockchain.blocks[i])
Blockchain.blocks[i+1].prevHash = Blockchain.blocks[i].hash
console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		bl.data
	).digest("hex");
}

// function which takes the text for its data, creates an object for the block, and computes its hash, finally returning the block object
function createBlock(text) {
	var obj = {};
	obj.index = Blockchain.blocks[Blockchain.blocks.length - 1].index + 1;
	obj.prevHash = Blockchain.blocks[Blockchain.blocks.length - 1].hash;
	obj.data = text;
	obj.timestamp = Date.now();
	obj.hash = blockHash(obj);

	return obj;
}

// checks all blocks in the chain to ensure the chain is valid, and returns true or false accordingly
function verifyChain(bc) {
	for (let i = 1; i < bc.blocks.length; i++) {
		if (!verifyBlock(bc.blocks[i]))
			return false
		if (bc.blocks[i-1].hash != bc.blocks[i].prevHash)
			return false
	}

	return true
}

// checks a block to ensure that it is valid, and returns true or false accordingly
function verifyBlock(bl) {
	if (bl.index == 0 && bl.hash == "000000")
		return true

	if (bl.index < 0)
		return false

	if (bl.data == "")
		return false

	if (bl.hash != blockHash(bl))
		return false

	return true
}
