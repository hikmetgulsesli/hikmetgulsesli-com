const fs = require('fs');
const txt = fs.readFileSync('.setfarm-step-output.txt', 'utf8');

// Extract and validate stories JSON
const storiesStart = txt.indexOf('STORIES_JSON:') + 13;
let depth = 0;
let storiesEnd = storiesStart;
for (let i = storiesStart; i < txt.length; i++) {
  if (txt[i] === '[') depth++;
  if (txt[i] === ']') { depth--; if (depth === 0) { storiesEnd = i+1; break; } }
}
const storiesJson = txt.substring(storiesStart, storiesEnd).trim();

// Extract and validate screenMap JSON - +25 skips "SCREEN_MAP_WITH_STORIES:\n"
const smStart = txt.indexOf('SCREEN_MAP_WITH_STORIES:') + 25;
depth = 0;
let smEnd = smStart;
for (let i = smStart; i < txt.length; i++) {
  if (txt[i] === '[') depth++;
  if (txt[i] === ']') { depth--; if (depth === 0) { smEnd = i+1; break; } }
}
const smJson = txt.substring(smStart, smEnd).trim();

console.log('SM first 50 chars:', JSON.stringify(smJson.substring(0, 50)));

let stories, screenMap;
try {
  stories = JSON.parse(storiesJson);
  console.log('Stories JSON valid, count:', stories.length);
} catch(e) {
  console.log('Stories JSON error:', e.message);
  process.exit(1);
}
try {
  screenMap = JSON.parse(smJson);
  console.log('ScreenMap JSON valid, count:', screenMap.length);
} catch(e) {
  console.log('ScreenMap JSON error:', e.message);
  console.log('SM first 100:', JSON.stringify(smJson.substring(0, 100)));
  process.exit(1);
}

const output = { status: 'done', stories, screenMap };
fs.writeFileSync('step_output.json', JSON.stringify(output, null, 2));
console.log('Written step_output.json');
