process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
	let inputData;

	while ((chunk = process.stdin.read()) !== null) {
		let reversedChunk = reverseChunk(chunk); 
	process.stdout.write(reversedChunk);
	}
});



function reverseChunk(chunk){
	return chunk.split('').reverse().join('');
}


