# technical-assessment-be

### Stack Used: ###

* NodeJS
* Express
* PostgreSQL
* Knex Query Builder
* Json Web Token
* BcryptJS

### How do I get set up? ###

* Clone the Repository
* Make an environment file (.env) using the values given in the `Environment` section below
* Install the dependencies using `npm install` command
* Run `npx knex migrate:latest` command to execute the migration file(s) and update on your local database schema
* Start to run this app by using `npm run start` command, and we're all done!

### Environment: ###

* NODE_ENV=development
* PORT=3001
* JWT_SECRET=1jwtSecretKey1
* JWT_LIFETIME=10
* DB_NAME=ta_db
* DB_USER=postgres
* DB_PWD=postgres

# Contract API & Documentation


# A. Pokemon Endpoints

### 1. Get List of Pokemon Endpoint
## GET /pokemon

Request Query (Optional):
​
Key | Desc
--- | ---
search | search pokemon by name
type | filter pokemon by type, can be multiple value, separated by comma
sortBy | sort list of pokemon by id or name, default to id
sortType | order the sortBy to be ascending or descending, default to ascending

Example:
`/pokemon?type=water,electric&search=pika&sortBy=name&sortType=desc`
​

Response (200 - OK):
​
```json
{
  "message": "Successfully fetch all pokemons!",
  "data": [
    {
      "id": 1,
      "name": "Ivysaur",
      "monster_category": "Leaf Monster",
      "type": ["GRASS"],
      "image": "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/2.svg",
      "is_captured": false
    },
    {
      "id": 2,
      "name": "Charlizard",
      "monster_category": "Fire Monster",
      "type": ["FIRE", "FLYING"],
      "image": "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/6.svg",
      "is_captured": false
    },
    { ... }
  ],
  "request": {
    "type": "GET",
    "url": "/pokemon"
  }
}
```

### 2. Get Pokemon Detail Endpoint
## GET /pokemon/:id

Request Params:
Key | Desc
--- | ---
id | Pokemon ID from a pokemon that wants to be shown

Response (200 - OK):
​
```json
{
  "message": "Successfully get pokemon detail!",
  "data": {
    "id": 2,
    "name": "Charlizard",
    "monster_category": "Fire Monster",
    "type": ["FIRE", "FLYING"],
    "base_stats": { "hp": 340, "speed": 250, "def": 150, "attack": 340 },
    "description": "Charlizard is a flying and fire type pokemon",
    "image": "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/6.svg",
    "is_captured": false
  },
  "request": {
    "type": "PUT",
    "url": "/pokemon/2"
  }
}
```
​
### 3. Create Pokemon Endpoint
## POST /pokemon

Headers:

Key | Desc
--- | ---
Authorization | Using Bearer Auth Token (required, 'Admin' role only)

Request body:

Key | Detail
--- | ---
name | string/required
type | array of strings/required
description | string/required
monster_category | string/required
base_stats | object/required
image | string/optional

Example:
```json
{
  "name": "Spearrow",
  "type": ["flying"],
  "description": "Spearrow is a flying type pokemon",
  "monster_category": "Flying Monster",
  "base_stats": { "hp": 340, "speed": 250, "def": 150, "attack": 340 },
  "image": "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/21.svg"
}
```
​
Response (201 - CREATED):
​
```json
{
  "message": "Successfully insert new pokemon!",
  "data": {
    "id": 4,
    "name": "Spearrow",
    "monster_category": "Flying Monster",
    "type": ["FLYING"],
    "base_stats": { "hp": 340, "speed": 250, "def": 150, "attack": 340 },
    "description": "Spearrow is a flying type pokemon",
    "image": "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/21.svg",
  },
  "request": {
    "type": "POST",
    "url": "/pokemon"
  }
}
```
### 4. Update Pokemon Endpoint
## PUT /pokemon/:id

Headers:
Key | Desc
--- | ---
Authorization | Using Bearer Auth Token (required, 'Admin' role only)

Request Params:
Key | Desc
--- | ---
id | Pokemon ID from a pokemon that wants to be updated

Request body:
​
Key | Detail
--- | ---
name | string/required
type | array of strings/required
description | string/required
monster_category | string/required
base_stats | object/required
image | string/optional

Example:
```json
{
  "name": "Spearrow",
  "type": ["flying"],
  "description": "Spearrow is a flying type pokemon",
  "monster_category": "Flying Monster",
  "base_stats": { "hp": 340, "speed": 250, "def": 150, "attack": 340 },
  "image": "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/21.svg"
}
```
​
Response (200 - OK):
​
```json
{
  "message": "Successfully update pokemon data!",
  "data": {
    "id": 4,
    "name": "Spearrow",
    "monster_category": "Flying Monster",
    "type": ["FLYING"],
    "base_stats": { "hp": 340, "speed": 250, "def": 150, "attack": 340 },
    "description": "Spearrow is a flying type pokemon",
    "image": "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/21.svg",
  },
  "request": {
    "type": "PUT",
    "url": "/pokemon/4"
  }
}
```

### 5. Delete Pokemon Endpoint
## PATCH /pokemon/delete/:id

Headers:
Key | Desc
--- | ---
Authorization | Using Bearer Auth Token (required, 'Admin' role only)

Request Params:
Key | Desc
--- | ---
id | Pokemon ID from a pokemon that wants to be deleted


Response (200 - OK):​
​
```json
{
  "message": "Successfully delete pokemon data!",
  "request": {
    "type": "DELETE",
    "url": "/pokemon/4"
  }
}
```

# B. User Endpoints

### 1. Register User Endpoint
## POST /users/register

Request body:

Key | Detail
--- | ---
name | string/required
username | string/required
password | string/required
role | string/required

Example:
```json
{
  "name": "Ash",
  "username": "ashketchum123",
  "password": "securePassword123",
  "role": "Admin",
}
```
​
Response (201 - CREATED):
​
```json
{
  "message": "Successfully register!",
  "request": {
    "type": "POST",
    "url": "/users/register"
  }
}
```

### 2. Login User Endpoint
## POST /users/login

Request body:

Key | Detail
--- | ---
username | string/required
password | string/required

Example:
```json
{
  "username": "ashketchum123",
  "password": "securePassword123",
}
```
​
Response (200 - OK):
​
```json
{
  "message": "Successfully login!",
  "accesToken": "Your Access Token",
  "request": {
    "type": "POST",
    "url": "/users/login"
  }
}
```


# C. User Captured Pokemon Endpoints

### 1. Capture Pokemon Endpoint
## POST /user-captured-pokemon

Request body:

Key | Detail
--- | ---
pokemon_id | integer/required

Example:
```json
{
  "pokemon_id": 4
}
```
​
Response (201 - CREATED):
​
```json
{
  "message": "Successfully marked pokemon as captured!",
  "request": {
    "type": "POST",
    "url": "/user-captured-pokemon"
  }
}
```

### 2. Uncaptured Pokemon Endpoint
## DELETE /user-captured-pokemon/:pokemonId

Request Params:
Key | Desc
--- | ---
pokemonId | Pokemon ID from a pokemon that wants to be uncaptured


Response (200 - OK):
​
```json
{
  "message": "Successfully unmarked pokemon!",
  "request": {
    "type": "DELETE",
    "url": "/user-captured-pokemon"
  }
}
```