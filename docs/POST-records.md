# User Resources

    POST records

## Description
Create a new record in the database.

***

## Requires authentication
This endpoint requires the user to have submitted their email and application name.  In order to post to the database, the user must have an email issued by Turing School of Software and Design ending in `@turing.io`.  This will create a JSON Web Token with administrative access that will be used to authenticate the user.

***

## Parameters
This endpoint will accept a JSON Web Token query parameter in the url, a token in the request body or authorization in the header. The id of the game associated with the record is to be included at ':id'.

    /api/v1/games/:id/records?token=(jwt goes here)

```
{
  "rank": "25nd",
  "time": "A trillon seconds",
  "handle": "nicktu12",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2tAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InNwZWVkcnVubmluZyIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTMyOTk5MzgsImV4cCI6MTUxMzQ3MjczOH0.Q-ARMd5U4mnH_wAWFA67mTVusFpS6pkBarS9XTVJifo",
  "game_id": :id
}
```    

## Return format

Will return a status code of 201, along with a JSON object of the posted information

- **id**  - Unique id
- **game_title** - Name of the game
- **game_image** - Cover art for the game

## Errors
This endpoint will throw a 422 and a 500 error

``
{
    error: 'Error message will be here.'
}
``

***

## Example

    POST /api/v1/games/22/records

**Return**

```
{
  "rank": "25nd",
  "time": "A trillon seconds",
  "handle": "nicktu12",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2tAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InNwZWVkcnVubmluZyIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTMyOTk5MzgsImV4cCI6MTUxMzQ3MjczOH0.Q-ARMd5U4mnH_wAWFA67mTVusFpS6pkBarS9XTVJifo",
  "game_id": 22
}
```
