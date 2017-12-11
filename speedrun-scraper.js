const Nightmare = require('nightmare');
const nightmare = new Nightmare({show: true});
const fs = require('fs');

// remove this comment

nightmare
  .goto('https://www.speedrun.com/games')
  .wait(2000)
  .evaluate(() => {
    const outputLinks = [];
    const linksNode = document.querySelectorAll('.listcell a');
    for (let i = 0; i < linksNode.length; i++) {
      outputLinks.push(linksNode[i].getAttribute('href'))
    }
    return outputLinks;
  })
  .end()
  .then(result => {
    fs.writeFile('games-links.js', JSON.stringify(result, null, 2), 'utf8', (error) => {
      if (error) throw error;
      console.log('You scraped it! Saved to games-links.js')
    })
  })
  .catch(result => { throw error; });
