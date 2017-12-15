## Speedrunning Database

The Speedrunning Database contains information about world record speedruns for the most popular speedrunning video games. 

A speedrun is a play-through (or a recording thereof) of a video game performed with the intention of completing it as fast as possible. Speedruns may cover a whole game or a selected part, such as a single level. While all speedruns aim for quick completion, some speedruns are characterized by additional rules that players promise to obey, such as collecting all key items. Players attempt speedruns mainly to challenge themselves and to entertain and compete with others.[1](http://www.speedrunslive.com/faq/)

The Speedrunning Database is a [RESTful api](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful") and uses JSON Web Tokens ([JWTs](https://jwt.io/introduction/)) for authentication purposes.

The return format for all endpoints is [JSON](http://json.org/ "JSON").

To recieve a token you can visit our page [here](https://speed-running-database.herokuapp.com).

***

## Endpoints

- [**GET games**](https://github.com/francylang/byob/blob/master/docs/GET-games.md)
- [**GET records**](https://github.com/francylang/byob/blob/master/docs/GET-records.md)
- [**POST authenticate**](https://github.com/francylang/byob/blob/master/docs/POST-authenticate.md)
- [**POST games**](https://github.com/francylang/byob/blob/master/docs/POST-games.md)
- [**POST records**](https://github.com/francylang/byob/blob/master/docs/POST-records.md)
- [**DELETE records**](https://github.com/francylang/byob/blob/master/docs/DELETE-records.md)
- [**DELETE games**](https://github.com/francylang/byob/blob/master/docs/DELETE-games.md)
- [**PATCH records**](https://github.com/francylang/byob/blob/master/docs/PATCH-records.md)
- [**PATCH games**](https://github.com/francylang/byob/blob/master/docs/PATCH-games.md)
