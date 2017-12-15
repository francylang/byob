# User Resources

    DELETE games

## Description
Delete a game from the database

***

## Requires authentication
This endpoint requires the user to have submitted their email and application name.  In order to delete from the database, the user must have an email issued by Turing School of Software and Design, ending in `@turing.io`.  This will create a JSON Web Token with administrative access that can then be used to authenticate the user.

***

## Parameters
This endpoint will accept a JSON Web Token query parameter in the url, a token in the request body or authorization in the header.

    /api/v1/games/22/?token=(jwt goes here)


```
{
  "game_id": 22,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2tAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InNwZWVkcnVubmluZyIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTMyOTk5MzgsImV4cCI6MTUxMzQ3MjczOH0.Q-ARMd5U4mnH_wAWFA67mTVusFpS6pkBarS9XTVJifo"
}
```

## Return format

Will return a status code of 204
***

## Errors
This endpoint will throw a 422 and 500 error

``
{
  error: 'Error message will be here'
}
``

***

## Example

    /api/v1/games/6

**Return**

`204 No Content`

