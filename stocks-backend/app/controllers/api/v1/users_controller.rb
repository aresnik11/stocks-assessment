class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      # encode the user id (function in application controller)
      token = encode_token(user.id)
      # send back the user with the token
      render json: { user: user, token: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :not_acceptable
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
