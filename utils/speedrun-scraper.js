const Nightmare = require('nightmare');

const nightmare = new Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://www.speedrun.com/games')
  .wait(2000)
  .evaluate(() => {
    const outputLinks = [];
    // eslint-disable-next-line
    const linksNode = document.querySelectorAll('.listcell a');
    for (let i = 0; i < linksNode.length; i + 1) {
      outputLinks.push(linksNode[i].getAttribute('href'));
    }
    return outputLinks;
  })
  .end()
  .then((result) => {
    fs.writeFile('games-links.js', JSON.stringify(result, null, 2), 'utf8', (error) => {
      if (error) throw error;
      // eslint-disable-next-line
      console.log('You scraped it! Saved to games-links.js')
    });
  })
  .catch((error) => { throw error; });
