// https://www.npmjs.com/package/win-audio 
// https://github.com/vercel/pkg/blob/master/examples/express/package.json 
const utils = require("./utils"); 
const audio = require('win-audio').speaker;
let precUnmuteVal = utils.getSetting("prec-unmute-val"); 
process.argv.forEach((arg, i) => { 
    // flag will be left hand , value will be 1 to the right 
    // flag = arg value = arg (or i [index]) + 1 
    let value = process.argv[i + 1]; 
    // audio.unmute(); // precautionary (may become optional) 
    switch(arg) { // arg or flag? 
        case "set": case "set-vol": // set flag (technically not a real flag)
            utils.setAudio(value); // has inner logging 
        break; 
        case "increase": 
            utils.increaseAudio(); 
            break; 
        case "decrease": 
            utils.decreaseAudio(); 
            break; 
        case "increase-by":
            utils.increaseAudioBy(Number(value)); 
            break; 
        case "decrease-by":
            utils.decreaseAudioBy(Number(value)); 
            break; 
        case "is-mute": case "muted": case "is-muted": 
            utils.isMuted(); 
            break; 
        case "mute": 
            audio.mute(); 
            break; 
        case "unmute": 
            audio.unmute(); 
            break; 
        case "toggle": case "toggle-vol": case "toggle-volume": case "toggle-mute":
            audio.toggle(); 
            break; 
        case "volume": case "vol":
            console.log("outputting volume"); 
            console.log(audio.get()); 
            break; 
        case "precUnmute": case "pum": case "PUM": case "prec-unmute": 
            precUnmuteVal = utils.setPrecUnmuteVal(value); 
            break; 
        default: 
            console.log("args: " + process.argv.length , "arg: " + arg, "value: " + process.argv[i + 1], "index: " + i); 
            return; 
    }
}); 

