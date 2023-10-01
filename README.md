# Gsklep
Website Application with management system for online shopping.

## Live website

https://gsklep.gjda.pl

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
- Create, delete shopping methods (admin)
- Create, update, display, delete products (admin) - not implemented
