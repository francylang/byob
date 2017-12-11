const Nightmare = require('nightmare');
const nightmare = new Nightmare({show: true});
const fs = require('fs');

nightmare
  .goto('https://www.speedrun.com/games')
  .wait(2000)
  .evaluate(function (){
    const outputLinks = [];
    const linksNode = document.querySelectorAll('.listcell a');
    for (let i = 0; i < linksNode.length; i++) {
      outputLinks.push(linksNode[i].getAttribute('href'))
    }
    return outputLinks;
  })
  .end()
  .then(function(result) {
    console.log(result)
  })
  .catch(function(result){ throw error; });
