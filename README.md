# Air bean examination 2


### Login & Signup - signup with role, login without role
```
{
    "username": "Azmodan",
    "password": "mjaumjau",
    "role": "user"
}

{
    "username": "Lucky",
    "password": "voffvoff",
    "role": "admin"
}
```
### Add to menu - token in headers
```
{
    "title": "Pupcakes",
    "desc": "Smarrig leversmak",
    "price": 35
}
```
### Update menu item - token in headers
```
{
    "title": "Gott kaffe",
    "desc": "Oj så gott!",
    "price": 9000,
    "id": "0r37aGoFvsWUCzad"
}
```
### Delete menu item - token in headers 
```
http://localhost:5000/api/menu/delete/{menu id}
```
### Add campaign
```
{
    "products": [
        {
            "_id": "cw01DxvL60yTApq5"
        },
        {
            "_id": "bH7DC60FtvAgWoXn"
        }
    ],
    "price": 40
}
```

## Created by:
### Charlotte
