Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :things
    resources :users
    get "properties", to: "properties#index"
    get "properties1", to: "properties#index1"
    get "city_list", to: "properties#city_list"
    get "cities/:city", to: "properties#city"
    get "agents", to: "agents#index"
    get "agents/:id_yo", to: "agents#show"
    get "buyers/:id", to: "buyers#show"
    get "properties/city_cost", to: "properties#city_cost"
  end
end
