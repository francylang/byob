/* eslint-disable no-undef, arrow-body-style */
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
  '/mmx',
];

links.reduce((acc, url) => {
  return acc.then((results) => {
    return nightmare
      .goto(`https://www.speedrun.com${url}`)
      .wait('body')
      .evaluate(() => {
        const runnersArray = [];
        const recordsArray = [];
        const gameTitle = document.querySelector('h5 a').innerText;
        const gameImg = document.querySelector('h5 + p img').src;
        const runners = document.querySelectorAll('.username');
        const recordsTable = $('tbody tr');
        for (let i = 0; i < runners.length; i + 1) {
          runnersArray.push(runners[i].innerText);
        }
        for (let i = 1; i < recordsTable.length; i + 1) {
          const ranking = recordsTable[i].children[0].innerText;
          const username = recordsTable[i].children[1].innerText;
          const time = recordsTable[i].children[2].innerText;
          recordsArray.push({
            ranking,
            username,
            time,
          });
        }
        return [
          {
            game: {
              title: gameTitle,
              image: gameImg,
            },
          },
          { runners: runnersArray },
          { records: recordsArray },
        ];
      })
      .then((result) => {
        results.push(result);
        return results;
      });
  });
}, Promise.resolve([]))
  .then((results) => {
    fs.writeFile(
      'game-results.json',
      JSON.stringify(results, null, 2),
      'utf8',
      (error) => {
        if (error) throw error;
        // eslint-disable-next-line
        console.log('Games saved to game-results.js');
      },
    );
  })
  // eslint-disable-next-line
  .catch(error => console.error({ error }));
