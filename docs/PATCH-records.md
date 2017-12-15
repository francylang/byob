# User Resources

    PATCH records

## Description
Update the records database with current information about a specific record

***

## Requires authentication
This endpoint requires the user to have submitted their email and application name.  In order to patch to the database, the user must have an email issued by Turing School of Software and Design ending in `@turing.io`.  This will create a JSON Web Token with administrative access that will be used to authenticate the user.

***

## Parameters
This endpoint will accept a JSON Web Token query parameter in the url

    /api/v1/records/:id?token=(jwt goes here)

**id** - This endpoint must contain an id that associates it with a specific port

***

## Required format
Object

  -- Should contain the following keys with a string value `handle, rank, time` with a string value 

  -- example

``
{
  handle: "nicktu12",
  rank: "12th",
  time: "3h 24m 07s"
}
``

## Return format

A JSON array of objects with key-value pairs

- **handle** - The username of the runner.
- **rank** - The ranking of the record.
- **time** - The time of the record.

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

    /api/v1/records/10

**Return**

```
OK
```
