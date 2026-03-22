const fs = require('fs');
const txt = fs.readFileSync('.setfarm-step-output.txt', 'utf8');
const start = txt.indexOf('STORIES_JSON:') + 13;
let depth = 0;
let end = start;
for (let i = start; i < txt.length; i++) {
  if (txt[i] === '[') depth++;
  if (txt[i] === ']') { depth--; if (depth === 0) { end = i+1; break; } }
}
const storiesJson = txt.substring(start, end);
console.log('First 200 chars:', JSON.stringify(storiesJson.substring(0, 200)));
console.log('Last 100 chars:', JSON.stringify(storiesJson.substring(storiesJson.length - 100)));
// Try to find US-005
const idx = storiesJson.indexOf('US-005');
console.log('US-005 at index:', idx);
