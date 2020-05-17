const process = require('process');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
	let inputData;

	while ((chunk = process.stdin.read()) !== null) {
		var reversedChunk = reverseString(chunk); 
	process.stdout.write(reversedChunk);
	}
});



function reverseString(chunk){
	var splitedString = chunk.split('');
	var enterSring = splitedString.pop();
	splitedString.reverse();
	splitedString.push(enterSring);
	return splitedString.join("");
}


