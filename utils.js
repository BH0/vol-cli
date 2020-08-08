const audio = require('win-audio').speaker; 
const fs = require('fs'); 
// green = volume higher / unmuted  
// blue = volume lower / muted 
// red = error / warning 
// I do not think "chaining commands" is supported ie "vol-cli set-vol 20 mute" etc 

module.exports = {
    settingsFile: "./volcli-settings.json", 
    getSettings() {
        const data = fs.readFileSync(this.settingsFile, {encoding:'utf8', flag:'r'}); 
        const settings = JSON.parse(data); 
        return settings;  
    }, 
    setSetting(prop, value) {
        const old = this.getSettings(); 
        old[prop] = value; 
        const data = JSON.stringify(old); 
        fs.writeFileSync(this.settingsFile, data); 
    }, 
    getSetting(prop) { 
        return this.getSettings()[prop]; 
    }, 
    precUnmute() { 
        // technically this param is needed as it can be obtained via getSetting
        // instead of an env var, local file system storage has been used 
        if (this.getSetting("prec-unmute-val") == "true") {
            audio.unmute(); 
        }
    }, 
    setAudio(value) { // not sure if I should allow the initial-text as a param as it means I'll have to maintain unit test 
        // should this use precUnmute? 
        audio.set(Number(value)); 
        let initialText = "set audio to "; 
        const text = initialText + Number(value); 
        this.logColouredText("blue", text); 
        return text; 
    }, 
    increaseAudio() { // technically this need not be a function 
        this.precUnmute(); 
        // audio.increase(audio.get() + 1); 
        audio.set(audio.get() + 1); 
        let initialText = "increased audio: "; 
        const text = initialText + audio.get(); 
        this.logColouredText("green", text); 
        return text; 
    }, 
    decreaseAudio() { // can this code be more DRY?  
        this.precUnmute(); 
        // audio.decrease(Number(audio.get()) - 1); 
        audio.set(audio.get() - 1); 
        let initialText = "decreased audio"; 
        const text = initialText + Number(audio.get() - 1); 
        this.logColouredText("green", text); 
        return text; 
    }, 
    decreaseAudioBy(value) { // can this code be more DRY?  
        this.precUnmute(); 
        // not sure why audio.increase & audio.decrease were not working 
        // may be due to polling 
        // audio.decrease(Number(audio.get()) - Number(value)); 
        audio.set(audio.get() - Number(value)); 
        let initialText = "decreased audio by "; 
        const text = initialText + Number(value); 
        this.logColouredText("blue", text); 
        return text; 
    }, 
    increaseAudioBy(value) { // can this code be more DRY?  
        this.precUnmute(); 
        // audio.increase(Number(audio.get()) - Number(value)); 
        audio.set(audio.get() + Number(value)); 
        let initialText = "increased audio by "; 
        const text = initialText + Number(value); 
        this.logColouredText("blue", text); 
        return text; 
    }, 
    isMuted() {
        const text = audio.isMuted() == true ? ["blue", "speakers are muted"] : ["green", "speakers are not muted"]; 
        console.log(text); 
        this.logColouredText(text[0], text[1]); 
        return text; 
    }, 
    /* 
    Not sure if I am comfortable with this setPrecUnmuteVal function:
    - I tried to use the same function to update a value
    - whilst outputting the value regardless of changes 
    - the code reads/writes to file system more than once (not sure if this is needed) 
    */ 
    setPrecUnmuteVal(value) { // prev, new 
        let precUnmuteVal = this.getSetting("prec-unmute-val"); 
        if (value != "true" && value != "false") {
            this.logColouredText("blue", "PUM: " + precUnmuteVal); 
            return precUnmuteVal; 
        } else {
            this.setSetting("prec-unmute-val", value); 
            /*
            I done this so the unit test wouldn't fail [not good], but I'd like to ensure the number of read/writes are as small as possible 
            */ 
            precUnmuteVal = this.getSetting("prec-unmute-val"); 
            // console.log(precUnmuteVal)
            this.logColouredText("blue", "[changes made] PUM: " + value); 
            // console.log(precUnmuteVal); 
            return precUnmuteVal;     
        } 
    }, 
    logColouredText(colour, text) {
        // https://stackoverflow.com/a/41407246
        const reset = "%s\x1b[0m"; 
        const red = "\x1b[31m"+reset; 
        const green = "\x1b[32m"+reset; 
        const blue = "\x1b[34m"+reset; 
        switch (colour) {
            case "red": 
                console.log(red, text); 
                return text; 
                break;                 
            case "green": 
                console.log(green, text); 
                return text; 
                break; 
            case "blue": 
                console.log(blue, text); 
                return text; 
                break; 
            default:
                // console.log(`${reset}`,`${text}`); 
                return text; 
        }
    }
} 


