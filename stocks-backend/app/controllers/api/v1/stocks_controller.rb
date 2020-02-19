require 'rest-client'
require 'json'
require 'dotenv/load'

API_KEY = ENV['IEX_API_KEY']

class Api::V1::StocksController < ApplicationController
  def index
    stocks = Stock.all
    render json: stocks
  end

  def create
    # grab ticket and quantity from the fetch body
    ticker = stock_params[:ticker].upcase
    quantity = stock_params[:quantity].to_i

    # ignore any errors from the get request, since want to handle 404 for unknown symbol
    # {|response, request, result| response } makes it so that it won't throw an exception for non-200 responses
    begin
      response_string = RestClient.get("https://cloud.iexapis.com/stable/stock/#{ticker}/quote?token=#{API_KEY}"){|response, request, result| response }
    rescue
      nil
    end

    # if we input an unknown symbol, send back an error
    if response_string == "Unknown symbol"
      render json: { errors: 'Unknown stock symbol. Please try again.' }, status: :not_acceptable and return
    # otherwise, try to parse as JSON. send back an error if run into an issue 
    else
      begin
        response_hash = JSON.parse(response_string)
      rescue
        render json: { errors: 'Error. Please try again.' }, status: :not_acceptable and return
      end
    end

    # grabbing the current price from the API response and calculaing total price
    current_price = response_hash["latestPrice"]
    total_price = current_price * quantity
    user_money = session_user.money

    # grabbing the change from the API response - this is the change from the latest opening
    # sometimes the change value is null after hours for stocks, if that is the case, defaulting to showing in grey
    change = response_hash["change"]
    if !!change && change > 0
      color = "green"
    elsif !!change && change < 0
      color = "red"
    else
      color = "grey"
    end

    # only buy the stock if the user has enough money
    if user_money >= total_price
      stock = Stock.new({
        ticker: ticker,
        quantity: quantity,
        purchase_price: current_price,
        current_price: current_price,
        color: color,
        user: session_user
      })
      if stock.save
        # deduct money for the stock from the users money
        updated_money = user_money - total_price
        session_user.update(money: updated_money)
        # send back serialized user which has updated money and stocks
        render json: { user: UserSerializer.new(session_user) }
      else
        render json: { errors: stock.errors.full_messages }, status: :not_acceptable
      end
    # otherwise send back error
    else
      render json: { errors: 'Not enough money, try buying less shares' }, status: :not_acceptable
    end
  end

  def refresh
    # get just the ticker from the users stock, unique them, and join into a comma separated string
    tickers = session_user.stocks.map do |stock|
      stock.ticker
    end.uniq.join(",")

    # pass the comma separated string of tickers into the batch API call
    begin
      response_string = RestClient.get("https://cloud.iexapis.com/stable/stock/market/batch?symbols=#{tickers}&types=quote&token=#{API_KEY}")
      response_hash = JSON.parse(response_string)
    rescue
      render json: { errors: 'Error updating stocks. Please try again.' } and return
    end

    # loop over the response hash to find the stocks we need to update and update the current_price and color
    response_hash.each do |key, value|
      # storing all of the info we need to variables for ease of use later
      ticker = key
      current_price = value["quote"]["latestPrice"]
      change = value["quote"]["change"]
      # sometimes the change value is null after hours for stocks, if that is the case, defaulting to showing in grey
      if !!change && change > 0
        color = "green"
      elsif !!change && change < 0
        color = "red"
      else
        color = "grey"
      end

      # finding the users stocks that match this ticker
      # stocks_to_update = session_user.stocks.filter do |stock|
      #   stock.ticker == ticker
      # end
      # updating to use "where" since it is more efficient than filter, runs directly on the DB
      stocks_to_update = session_user.stocks.where(ticker: ticker)

      # for each of those stocks, update the current_price and color attributes
      stocks_to_update.each do |stock|
        stock.update(current_price: current_price, color: color)
      end
    end

    # send back serialized user which has updated stocks
    render json: { user: UserSerializer.new(session_user) }
    
  end

  private

  def stock_params
    params.require(:stock).permit(:ticker, :quantity)
  end

end
