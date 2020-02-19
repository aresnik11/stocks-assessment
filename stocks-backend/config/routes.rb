Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :stocks, only: [:index, :create, :update]
      resources :users, only: [:update]
      post "/signup", to: "users#create"
      post "/login", to: "auth#login"
      get "/auto_login", to: "auth#auto_login"
      get "/refresh_stocks", to: "stocks#refresh"
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
