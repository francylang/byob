# User Resources

    GET records

## Description
Returns all the records from the database, including the runner's handle, rank, time and a foreign key reference to the game of the record. 

***

## Parameters
**id** - The id parameter will select the specific record from the database where the record's id matches the given parameter

    /api/v1/records/:id

**game_id** - The game id parameter will select all the records from the database that match the game id in the given parameter.

    /api/v1/records?game_id:22

***

## Return format

A JSON array of objects with key-value pairs

- **id**  - Unique id
- **handle** - The handle of the speedrunner
- **rank** - The rank of the record
- **time** - The time of the record
- **game_id** - A foreign key referencing the id of the record's game

***

## Errors
This endpoint will throw a 404 and a 500 error

```
{
    error: 'Error message will be here.'
}
```

***

## Example

    /api/v1/records

**Return** (This is a shortened example)

```
[
    {
        "id": 9687,
        "handle": "Yoshim",
        "rank": "31st",
        "time": "",
        "game_id": 34,
        "created_at": "2017-12-13T23:39:58.035Z",
        "updated_at": "2017-12-13T23:39:58.035Z"
    },
    {
        "id": 9696,
        "handle": "markpro",
        "rank": "40th",
        "time": "2m 51s 310ms",
        "game_id": 34,
        "created_at": "2017-12-13T23:39:58.037Z",
        "updated_at": "2017-12-13T23:39:58.037Z"
    },
    {
        "id": 9705,
        "handle": "Nimputs",
        "rank": "49th",
        "time": "2m 52s 180ms",
        "game_id": 34,
        "created_at": "2017-12-13T23:39:58.040Z",
        "updated_at": "2017-12-13T23:39:58.040Z"
    },
    {
        "id": 9715,
        "handle": "Malefaz",
        "rank": "59th",
        "time": "2m 52s 560ms",
        "game_id": 34,
        "created_at": "2017-12-13T23:39:58.042Z",
        "updated_at": "2017-12-13T23:39:58.042Z"
    }
]
```
