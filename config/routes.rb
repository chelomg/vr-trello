Rails.application.routes.draw do
  root 'home#index'
  namespace :api do 
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      resources :boards do
        resources :lists, except: [:new, :edit] do
          member do
            put :drag
          end
        end
      end
    end
  end
  get '/*path', to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
