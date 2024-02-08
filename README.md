# Gsklep
Web Application with management system for online shopping.

![https://github.com/mg300/Gsklep/GIF.gif](https://github.com/mg300/Gsklep/blob/main/GIF.gif)

## Live website

https://gsklep.mgjda.pl
API: https://api.mgjda.pl

###### admin 
login: admin@admin.pl password: admin123

###### user
login: user@user.pl password: user1234

## Technologies

- Typescript
- SCSS
- HTML
- React
- Redux
- Node.js
- Mongoose
- Express.js
- MongoDB
- JWT, Bcrypt, Cookies, React Router, Persist, Multer

## Features

##### Online shop

- Displaying products,
- Searching products,
- Adding to cart,
- Placing an order,
- Authorization with cookie and JWT (Sign In, Sign Up).


##### Management system

- Displaying orders,
- Displaying user data,
- Changing shipping address,
- Changing password
- Displaying all orders (admin)
- Displaying all users (admin)
- Create, delete shipping methods (admin)
- Create, update, display, delete products (admin) - not implemented


## Usage

1. Run MongoDB, get connection string and password
2. Add and configure config.env file in backend/ directiory like:

```
DATABASE_PASSWORD=[your_data]
PORT=9000
PRIVATE_KEY=[your_data]
DATABASE_STRING=mongodb+srv://abc:<PASSWORD>@cluster.pabcda.mongodb.net/folder?retryWrites=true // your connection string should look like [your_string]<PASSWORD>[your_string]
NODE_ENV=development
FRONTEND_URL=localhost:3000
DOMAIN=[your_data]
DOMAIN_DEV=localhost
```
3. Create .env file in frontend/ directory like:

```
REACT_APP_URL=http://localhost:9000
```
4. Run in terminal with following commands:
```
git clone https://github.com/mg300/Gsklep
cd gsklep
cd backend
npm install
npm run dev
```
5. Run second terminal with following commands:

```
cd gsklep
cd frontend
npm install
npm start
```

5. Run app in browser: http://localhost:3000

## API Doc

#### Default link
```
https://api.gjda.pl/api
```

#### Filtering methods

example:
```
https://api.gjda.pl/api/product/?price[gte]=1241&name=Xiaomi&fields=name,_id,image&limit=2&sort=-price
```
Get all products where: 
- price[gte]=1241 price is greater or equal 1241
- name=Xiaomi - name is Xiaomi
- fields=name,_id,image - display only this fields
- limit=2 - display only two first results
- sort=-price - sort by price DESC

#### Products

###### Create //disabled
```
https://api.gjda.pl/api/product

method: POST

form-data:
photo,
inStock
description
name
price
category
```
###### Get all
```
https://api.gjda.pl/api/product
//method:GET
```
###### Get one
```
https://api.gjda.pl/api/product/[ID]
//method:GET
```
###### Update //disabled
```
https://api.gjda.pl/api/product/[ID]
body:{
field to change: new value
}
//method: PATCH
```
###### Delete //disabled
```
https://api.gjda.pl/api/product/[ID]
//method:DELETE
```

#### Orders
###### Create
```
https://api.gjda.pl/api/order
body{
    "orderNumber":2,
    "orderProducts":[
        {
        "product":"64ca37c3f76645559eb9ed7b",
        "quantity":2,
        "price":123

        }
    ],
    "address": {
      "firstName": "Mateusz",
      "lastName": "G",
      "street": "Akacjowa",
      "houseNumber": "18",
      "zipCode": "85-489",
      "city": "Łaziska",
      "phoneNumber": "731912912",
      "email": "abc@wp.pl"
    },
    "shipping":{
        "_id": "dpdP", "name": "Kuier DPD", "price": 21.99, "cashOnDelivery": true,"company":"DPD"
    },
    "totalPriceWithoutShipping":1234,
    "user": "64a4241b6f53d972c448fb2c"

//method: POST
```

###### Get all
```
https://api.gjda.pl/api/order/all
//method: GET
```
###### Get one
```
https://api.gjda.pl/api/order/[id]
//method: GET
```
###### Update
```
https://api.gjda.pl/api/order/[ID]
body{
field: newValue
}
//method: PATCH

```
###### Delete
```
https://api.gjda.pl/api/order/[ID]
//method:DELETE
```

#### Users

###### Login
```
https://api.gjda.pl/api/auth/login
body{
    "email":"admin@admin.pl",
    "password":"admin123"
}
//method:POST
```
###### Logout
```
https://api.gjda.pl/api/auth/logout
//method: GET
```
###### Create
```
https://api.gjda.pl/api/auth/signup
body
{
    "email":"user@user2.pl",
    "userType":"user",
    "userData":{
        "firstName":"Mati",
        "lastName": "G",
        "street": "abc",
        "houseNumber":10,
        "zipCode":"21-123",
        "city":"city",
        "phoneNumber":123456789
    },
    "password":"123456789",
    "passwordConfirm":"123456789"
}
//method: POST
```
###### Get all users
```
https://api.gjda.pl/api/auth
//method GET
```

###### Get current user
```
https://api.gjda.pl/api/auth/getuser
//method GET
credentials: include
```
###### Update password
```
https://api.gjda.pl/api/auth/updatepassword
body {  
    "password":"1234567899",
    "newPassword":"123456789"
}
//method POST
credentials: include

```

###### Update / add user address

```
https://api.gjda.pl/api/auth/updateaddress
body {  
"firstName": "Jan",
"lastName": "G",
"street": "Akacjowa",
"houseNumber": "18",
"zipCode": "85-489",
"city": "City",
"phoneNumber": 731912912
}
//method POST
credentials: include

```

#### Shop config

###### Shipping get
```
https://api.gjda.pl/api/config?fields=shipping
method: GET

```
###### Shipping add
```
https://api.gjda.pl/api/config/shipping
body
{  
    "name":"Kurier",
    "price":"22",
    "company":"DHL",
    "cashOnDelivery":true
}
method: PUT

```
###### Shipping delete
```
https://api.gjda.pl/api/config/shipping/[ID]
method: DELETE

```


