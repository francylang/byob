# User Resources

    GET games

## Description
Returns all the games from the database along with a link to the game's cover art.

***

## Parameters
**id** - The id parameter will select the specific game from the database where the game's id matches the given parameter

    /api/v1/games/:id

***

## Return format

A JSON array of objects with key-value pairs

- **id**  - Unique id
- **game_title** - Name of the game
- **game_image** - Cover art for the game

***

## Errors
This endpoint will throw a 404 and a 500 error

``
{
    error: 'Error message will be here.'
}
``

***

## Example

    /api/v1/games

**Return** (This is a shortened example)

```
[
    {
        "id": 22,
        "game_title": "Super Mario Odyssey",
        "game_image": "https://www.speedrun.com/themes/smo/cover-256.png",
        "created_at": "2017-12-13T23:39:56.555Z",
        "updated_at": "2017-12-13T23:39:56.555Z"
    },
    {
        "id": 23,
        "game_title": "Cuphead",
        "game_image": "https://www.speedrun.com/themes/cuphead/cover-256.png",
        "created_at": "2017-12-13T23:39:56.566Z",
        "updated_at": "2017-12-13T23:39:56.566Z"
    },
    {
        "id": 24,
        "game_title": "Super Metroid",
        "game_image": "https://www.speedrun.com/themes/supermetroid/cover-256.png",
        "created_at": "2017-12-13T23:39:56.585Z",
        "updated_at": "2017-12-13T23:39:56.585Z"
    },
    {
        "id": 25,
        "game_title": "A Hat in Time",
        "game_image": "https://www.speedrun.com/themes/ahit/cover-256.png",
        "created_at": "2017-12-13T23:39:56.585Z",
        "updated_at": "2017-12-13T23:39:56.585Z"
    }
]
```
