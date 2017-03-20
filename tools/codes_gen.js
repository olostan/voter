const codeMap = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
function randomString() {
    return (new Array(7)).fill(0).map((_,i)=>i==3?'-':Math.random()*9|0).join('');
}
let codes = (new Array(650)).fill(0).map(() => randomString());
const fs = require('fs');
fs.writeFileSync('codes.json',JSON.stringify(codes));