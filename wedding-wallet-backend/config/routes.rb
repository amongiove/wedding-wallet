Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  Rails.application.routes.draw do
    namespace :api do
      namespace :v1 do
        resources :users, only: [:create]
        resources :budget, only: [:create]
        # resources :categories, only: [:index, :create]
        # resources :expenses, only: [:index, :create, :patch]
        # post '/login', to: 'auth#create'
      end
    end
  end

end
