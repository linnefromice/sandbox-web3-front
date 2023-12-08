const fs = require('fs');

// Read the input file
const inputFile = 'etc/data-relayer.txt';
const inputData = fs.readFileSync(inputFile, 'utf8');

// Extract date:balance pairs from the input data
const outputData = inputData
  .match(/(\d+);\s+record\s+{[\s\S]+?balance\s*=\s*(\d+)/g)
  .map((record) => {
    const [date, balance] = record
      .match(/(\d+);\s+record\s+{[\s\S]+?balance\s*=\s*(\d+)/)
      .slice(1);
    const isoDate = new Date(Math.floor(parseInt(date) / 1000000)).toISOString();
    return `${isoDate},${balance}`;
  })
  .join('\n');

// Write the output to a file
console.log(outputData)

console.log('Output generated successfully.');