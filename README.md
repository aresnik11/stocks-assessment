# Super Stocks - NYC Tech Talent Pipeline Fullstack Assessment

For this assessment I was asked to implement a web-based stock portfolio app with the user stories listed below. I'm calling my app Super Stocks and it can be viewed at [https://super-stocks.netlify.com](https://super-stocks.netlify.com).

The frontend subdirectory is deployed via Netlify and the backend subdirectory is deployed via Heroku.

[![Netlify Status](https://api.netlify.com/api/v1/badges/8f007487-7e03-401c-bbef-8d9625b0a1c4/deploy-status)](https://app.netlify.com/sites/super-stocks/deploys)

![Super Stocks Portfolio](https://user-images.githubusercontent.com/8761638/74884662-b0a7fb80-5341-11ea-858d-41eae7da4969.png)

![Super Stocks Transactions](https://user-images.githubusercontent.com/8761638/74884670-b4d41900-5341-11ea-8098-e82e85bfeed6.png)


## User Stories

1. As a user, I want to create a new account with my name, email, and password so that I can buy and
trade stocks.
    * Default the user’s cash account balance to $5000.00 USD.
    * A user can only register once with any given email.

2. As a user, I want to authenticate via email and password so that I can access my account.

3. As a user, I want to buy shares of stock at its current price by specifying its ticker symbol and the
number of shares so that I can invest.
    * A user can only buy whole number quantities of shares.
    * A user can only buy shares if they have enough cash in their account for a given purchase.
    * A user can only buy shares if the ticker symbol is valid.

4. As a user, I want to view a list of all transactions I’ve made to date (trades) so that I can perform an
audit.

5. As a user, I want to view my portfolio (a list of all the stocks I own along with their current values) so
that I can review performance.
    * Current values should be based on the latest price and quantity owned for a given stock.
    * Each stock owned should only appear once.

6. As a user, I’d like to see the font color of stock symbols and current prices in my portfolio change
dynamically to indicate performance.
    * Display red when the current price is less than the day’s open price.
    * Display grey when the current price is equal to the day’s open price.
    * Display green when the current price is greater than the day’s open price.


## Technology Used

* React
* Ruby on Rails
* IEX Cloud API
* React Router
* PostgreSQL database
* ActiveModel Serializer
* Semantic UI React
* JWT Authentication
* BCrypt

## How To Use

Visit the site at [https://super-stocks.netlify.com](https://super-stocks.netlify.com).

To test on your own machine:
1. Clone this repository
2. Go to [https://iexcloud.io/](https://iexcloud.io/) to create an account and get an API key
3. Switch to Ruby version `2.6.1`
4. Make sure `postgreSQL` is running on your computer, if not, download and run it
5. Create an `.env` file within the `stocks-backend` directory
6. In the `.env` file, create a constant variable `JWT_SECRET_KEY` and set it equal to whatever you want your secret key to be. Ex:
```
JWT_SECRET_KEY=test123
```
7. In the `.env` file, create a constant variable `IEX_API_KEY` and set it equal to your API key from Step 2
8. Within the `stocks-backend` directory, in terminal run
```
bundle install
rails db:create
rails db:migrate
rails s -p 3001
```
9. Within the `stocks-frontend` directory, update all fetch request URLs in `App.js` to the url where your rails server is running (if you followed above instructions, this is `http://localhost:3001`)
10. Within the `stocks-frontend` directory, in terminal run
```
npm install
npm start
```

## Enjoy!
