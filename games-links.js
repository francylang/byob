const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

// remove this!

const links = [
  "/smo",
  "/sm64",
  "/cuphead",
  "/ahit",
  "/supermetroid",
  "/smw",
  "/wf",
  "/smb1",
  "/sonicforces",
  "/oot",
  "/Getting_Over_It_With_Bennett_Foddy",
  "/alttp",
  "/sonicmania",
  "/sms",
  "/Refunct",
  "/robloxsr4",
  "/mk8dx",
  "/destiny2",
  "/nsmbw",
  "/mmx"
];

links.reduce((acc, url) => {
  return acc.then(results => {
    return nightmare
      .goto(`https://www.speedrun.com${url}`)
      .wait('body')
      .evaluate(() => {
        let gamesArray = [];
        let gameTitle = document.querySelector('h5 a').innerText;
        gamesArray.push(gameTitle);
        return gamesArray;
      })
      .then(result => {
        results.push(result);
        return results;
      })
  })
}, Promise.resolve([]))
  .then(results => console.log('you scraped games links', results))
  .catch(error => console.error({error}))
