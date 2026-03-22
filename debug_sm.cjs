const fs = require('fs');
const txt = fs.readFileSync('.setfarm-step-output.txt', 'utf8');

const smStart = txt.indexOf('SCREEN_MAP_WITH_STORIES:') + 23;
let depth = 0;
let end2 = smStart;
for (let i = smStart; i < txt.length; i++) {
  if (txt[i] === '[') depth++;
  if (txt[i] === ']') { depth--; if (depth === 0) { end2 = i+1; break; } }
}
const smJson = txt.substring(smStart, end2).trim();
console.log('SM JSON first 300 chars:');
console.log(smJson.substring(0, 300));
console.log('\nSM JSON last 100 chars:');
console.log(smJson.substring(smJson.length - 100));
