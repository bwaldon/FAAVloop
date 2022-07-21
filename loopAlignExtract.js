const shelljs = require("shelljs")
const glob = require('glob');
const sprintf = require('sprintf-js').sprintf

glob("FAVE-align/*.wav", function (er, files) {
    for(var i = 0; i < files.length; i++) {

    	let fileName = files[i].replace(/\.[^/.]+$/, "")
    	
    	console.log(sprintf("Currently aligning for %s...", fileName))

    	shelljs.exec("cd FAVE-align")
    	shelljs.exec(sprintf("python FAAValign.py -v -i %s.wav %s.txt"), fileName, fileName)
    	shelljs.exec("cd ..")

    	console.log(sprintf("Currently extracting for %s...", fileName))

    	shelljs.exec("cd FAVE-extract")
    	shelljs.exec(sprintf("python bin/FAAVextract.py -v -i ../FAVE-align/%s.wav ../FAVE-align/%s.TextGrid "), fileName, fileName)
    	shelljs.exec("cd ..")

    }

})


