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

    # grabbing the current price from the API response
    current_price = response_hash["latestPrice"]
    total_price = current_price * quantity
    user_money = session_user.money
    # only buy the stock if the user has enough money
    if user_money >= total_price
      stock = Stock.new({
        ticker: ticker,
        quantity: quantity,
        purchase_price: current_price,
        current_price: current_price,
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

  private

  def stock_params
    params.require(:stock).permit(:ticker, :quantity)
  end

end
