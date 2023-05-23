	# O-shortener

  

## Installation

  

```bash

$ npm install

```

  

## Running the app

  

```bash

# development

$ npm run start

  

# watch mode

$ npm run start:dev

  

# production mode

$ npm run start:prod

```
---------
## Routing system
---------
  
## sign up route 

```
POST : https://o-shortner.up.railway.app/auth/signup
```
```json
{
    "name":"omar",
    "email":"omar@test.com",
    "password":"test123"
}
```
response will be 
```json
{
    "status": true,
    "res": {
        "name": "omar",
        "email": "omar@test.com"
    }
} 
``` 
---------
## login rout 

```
POST : https://o-shortner.up.railway.app/auth/login
```

```json
{
    "email": "omar@test.com",
    "password": "test123"
}
```

	the response will be the access token

```json
{
    "access_token": "token........"
}
```
---------

## create new short URl 

```
POST : https://o-shortner.up.railway.app/urls/to_short
```

NOTE: 
---------
but your token in authorization header bearer token to create new short URl

---------

```json
{
    "long_url":"https://...test.com/test.etc..."
}   
```
	the response will be the new short URl 🔥
```json 
{
    "newURL": "http://o-shortner.up.railway.app/shortcode",
}
```

## get the user short URls and the hits of his urls 

will be follow this rout 

```
GET: http://o-shortner.up.railway.app/shortcode/urls/user
```
Note TOKEN needed todo this 

the response will be 
```json 
{
    "res": {
        "name": "omar",
        "email": "omar@test.com",
        "urls": [
            {
                "hits": "number",
                "short_code": "code"
            },
        ]
    },
    "status": true
}
```
## To delete the short URL

```
DELETE: http://o-shortner.up.railway.app/urls/delete/shortcode
```
Note TOKEN needed todo this 

the response will be 
```json 
{
    "status": true,
    "res": "Delete Done"
}
```
### License

  

O-shortener is [MIT licensed](LICENSE).