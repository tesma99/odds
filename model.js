function countDiceCombinations(numDice, numSides, successFunc) {
	console.log(successFunc);
	let numberOfCombis = Math.pow(numSides, numDice);
	const dice = new Array(numDice).fill(0).map(() => new Array(numberOfCombis).fill(0));
	//console.log(`dice=${dice}`);

	const currDiceValue = new Array(numDice).fill(1);

	const successes = new Array(numberOfCombis).fill(false);

	let successCount = 0;
	let failCount = 0;

	for (let valueIdx = 0; valueIdx < numberOfCombis; valueIdx++) {


		for (let dieIdx = 0; dieIdx < numDice; dieIdx++) {
			dice[dieIdx][valueIdx] = currDiceValue[dieIdx];
		}

		currDiceValue[0] = currDiceValue[0] + 1;
		for (let dieIdx = 0; dieIdx < numDice; dieIdx++) {
			if (currDiceValue[dieIdx] > numSides) {
				currDiceValue[dieIdx] = 1;

				nextDieIdx = dieIdx + 1;
				if (nextDieIdx < numDice) {
					currDiceValue[nextDieIdx] = currDiceValue[nextDieIdx] + 1;
				}
			}
		}

		const currValues = new Array(numDice);
		for (let dieIdx = 0; dieIdx < numDice; dieIdx++) {
			currValues[dieIdx] = dice[dieIdx][valueIdx];
		}
		let success = successFunc.calc(currValues);
		if (success) {
			successCount++;
			successes[valueIdx] = true;
		} else {
			failCount++;
		}

	}
	let successChance = successCount / numberOfCombis;


	return {
		numberOfCombis: numberOfCombis, successCount: successCount, failCount: failCount, results: dice,
		successChance: successChance, successes: successes 
	};
}


class SuccessCalculator {
	constructor() {
		this.debugName = this.constructor.name;
	}
}


class MinValueAtLeastOnce extends SuccessCalculator {
	constructor(minValue) {
		super();
		this.minValue = minValue;
	}

	calc(values) {
		let sum = 0;
		for (let dieIdx = 0; dieIdx < values.length; dieIdx++) {
			if (values[dieIdx] >= this.minValue) {
				return true;
			}
		}
		return false;
	}
}

class AllResultsWithMinValue extends SuccessCalculator {
	constructor(minValue) {
		super();
		this.minValue = minValue;
	}

	calc(values) {
		for (let dieIdx = 0; dieIdx < values.length; dieIdx++) {
			if (values[dieIdx] < this.minValue) {
				return false;
			}
		}
		return true;
	}
}

class SumAtLeast extends SuccessCalculator {
	constructor(targetSum) {
		super();
		this.targetSum = targetSum;
	}

	calc(values) {
		let sum = 0;
		for (let dieIdx = 0; dieIdx < values.length; dieIdx++) {
			sum = sum + values[dieIdx];
		}
		if (sum >= this.targetSum) {
			return true;
		} else {
			false;
		}
	}
}


function calc(){
	// Beispielaufruf
	const numDice = 2;
	const numSides = 6;
	let successCalc = new SumAtLeast(7);
	successCalc = new MinValueAtLeastOnce(6);
	successCalc = new AllResultsWithMinValue(6);

	const { numberOfCombis, successCount, failCount, results, successChance, successes } = countDiceCombinations(
		numDice, numSides, successCalc
	);

	console.log(`numberOfCombis: ${numberOfCombis}`);
	console.log(`successCount: ${successCount}`);
	console.log(`failCount: ${failCount}`);
	console.log(`Alle Würfelergebnisse: ${results}`);
	console.log(`successChance: ${successChance}`);
	console.log(`successes: ${successes}`);	
}

/*
// Beispielaufruf
const numDice = 2;
const numSides = 6;
let successCalc = new Sum(7);
successCalc = new MinValueAtLeastOnce(6);
successCalc = new AllResultsWithMinValue(6);

const { numberOfCombis, successCount, failCount, results, successChance, successes } = countDiceCombinations(
	numDice, numSides, successCalc
);

console.log(`numberOfCombis: ${numberOfCombis}`);
console.log(`successCount: ${successCount}`);
console.log(`failCount: ${failCount}`);
console.log(`Alle Würfelergebnisse: ${results}`);
console.log(`successChance: ${successChance}`);
console.log(`successes: ${successes}`);
*/