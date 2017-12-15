# User Resources

    PATCH games

## Description
Update the games database with current information about a specific game

***

## Requires authentication
This endpoint requires the user to have submitted their email and application name.  In order to patch to the database, the user must have an email issued by Turing School of Software and Design ending in `@turing.io`.  This will create a JSON Web Token with administrative access that will be used to authenticate the user.

***

## Parameters
This endpoint will accept a JSON Web Token query parameter in the url

    /api/v1/games/:id?token=(jwt goes here)

**id** - This endpoint must contain an id that associates it with a specific port

***

## Required format
Object

  -- Should contain one or both of the following keys of `game_title` with a string value and/or `game_image` with a string value

  -- example

``
{
  game_title: "My favorite game",
  game_image: "...img.jpeg"
}
``

## Return format

A JSON array of objects with key-value pairs

- **game_title** - The title of the game.
- **game_image** - An image of the game's cover art.

***

## Errors
This endpoint will throw a 422  and 500 error

```
{
  error: 'Error message will be here'
}
```

***

## Example

    /api/v1/games/10

**Return**

```
OK
```
