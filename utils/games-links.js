const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

const links = [
  '/smo',
  '/sm64',
  '/cuphead',
  '/ahit',
  '/supermetroid',
  '/smw',
  '/wf',
  '/smb1',
  '/sonicforces',
  '/oot',
  '/Getting_Over_It_With_Bennett_Foddy',
  '/alttp',
  '/sonicmania',
  '/sms',
  '/Refunct',
  '/robloxsr4',
  '/mk8dx',
  '/destiny2',
  '/nsmbw',
  '/mmx'
];

links.reduce((acc, url) => {
  return acc.then(results => {
    return nightmare
      .goto(`https://www.speedrun.com${url}`)
      .wait('body')
      .evaluate(() => {
        let runnersArray = [];
        let recordsArray = [];
        let gameTitle = document.querySelector('h5 a').innerText;
        let gameImg = document.querySelector('h5 + p img').src;
        let runners = document.querySelectorAll('.username');
        let recordsTable = $('tbody tr');
        for (let i = 0; i < runners.length; i++) {
          runnersArray.push(runners[i].innerText);
        }
        for (let i = 1; i < recordsTable.length; i++) {
          let ranking = recordsTable[i].children[0].innerText;
          let username = recordsTable[i].children[1].innerText;
          let time = recordsTable[i].children[2].innerText;
          recordsArray.push({
            ranking,
            username,
            time,
          });
        }
        return [
          { game: {
            title: gameTitle,
            image: gameImg,
          }
          },
          { runners: runnersArray },
          { records: recordsArray },
        ]
      })
      .then(result => {
        results.push(result);
        return results;
      })
  })
}, Promise.resolve([]))
  .then(results => {
    fs.writeFile(
      'game-results.json',
      JSON.stringify(results, null, 2),
      'utf8',
      (error) => {
        if (error) throw error;
        console.log('Games saved to game-results.js')
      }
    );
  })
  .catch(error => console.error({error}))
