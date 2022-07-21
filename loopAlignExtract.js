const shelljs = require("shelljs")
const glob = require('glob');
const sprintf = require('sprintf-js').sprintf

glob("FAVE-align/*.wav", function (er, files) {
    for(var i = 0; i < files.length; i++) {

    	let fileName = files[i].replace(/\.[^/.]+$/, "")
    	
    	console.log(sprintf("Currently aligning for %s...", fileName))

    	shelljs.cd("FAVE-align")
        let cmd = sprintf("python FAAValign.py -v -i %s.wav %s.txt", fileName)
        console.log(sprintf("COMMAND: %s", cmd))
    	shelljs.exec(cmd)
    	shelljs.cd("..")

    	console.log(sprintf("Currently extracting for %s...", fileName))

    	shelljs.cd("FAVE-extract")
        cmd = sprintf("python bin/FAAVextract.py -v -i ../FAVE-align/%s.wav ../FAVE-align/%s.TextGrid ", fileName)
        console.log(sprintf("COMMAND: %s", cmd))
    	shelljs.exec(cmd)
    	shelljs.cd("..")

    }

})


