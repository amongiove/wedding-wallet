Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  Rails.application.routes.draw do
    namespace :api do
      namespace :v1 do
        resources :users, only: [:create]
        post '/login', to: 'auth#create'
        get '/profile', to: 'users#profile'
        resources :budgets, only: [:create, :update]
        resources :categories, only: [:index, :show]
        resources :expenses, only: [:create, :show, :update, :destroy]
      end
    end
  end

end
