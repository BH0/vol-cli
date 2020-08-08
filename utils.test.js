const utils = require("./utils"); 

test("set audio", () => {
    // https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4 
    utils.logColouredText = jest.fn().mockReturnValue('');
    expect(utils.setAudio(20)).toBe("set audio to 20"); 
}); 

test("decrease audio by", () => {
    // https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4 
    utils.logColouredText = jest.fn().mockReturnValue(''); // should be in global scope? 
    utils.precUnmute = jest.fn().mockReturnValue(''); // should be in global scope? 
    expect(utils.decreaseAudioBy(30)).toBe("decreased audio by 30"); 
}); 

test("ensure speakers are NOT muted", () => { // will fail when muted  
    utils.logColouredText = jest.fn().mockReturnValue(''); // should be in global scope? 
    expect(utils.isMuted()).toEqual(expect.arrayContaining(["green", "speakers are not muted"])); 
}); 


test("set precautionary unmute to true", () => {
    // https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4 
    utils.logColouredText = jest.fn().mockReturnValue(''); // should be in global scope? 
    utils.precUnmute = jest.fn().mockReturnValue(''); // should be in global scope? 
    expect(utils.setPrecUnmuteVal("true")).toBe("true"); 
}); 

test("set precautionary unmute to false", () => {
    // https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4 
    utils.logColouredText = jest.fn().mockReturnValue(''); // should be in global scope? 
    utils.precUnmute = jest.fn().mockReturnValue(''); // should be in global scope? 
    expect(utils.setPrecUnmuteVal("false")).toBe("false"); 
}); 
test("set precautionary unmute from false to false", () => {
    // https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4 
    utils.logColouredText = jest.fn().mockReturnValue(''); // should be in global scope? 
    utils.precUnmute = jest.fn().mockReturnValue(''); // should be in global scope? 
    expect(utils.setPrecUnmuteVal("false")).toBe("false"); 
}); 
