class Api::V1::StocksController < ApplicationController
  def index
    stocks = Stock.all
    render json: stocks
  end

  def create
    stock = Stock.new({
      ticker: stock_params[:ticker],
      purchase_price: stock_params[:purchase_price],
      current_price: stock_params[:current_price],
      user: session_user
  })
    if stock.save
      render json: stock, status: :created
    else
      render json: { errors: stock.errors.full_messages }, status: :not_acceptable
    end
  end

  private

  def stock_params
    params.require(:stock).permit(:ticker, :purchase_price, :current_price)
  end

end
