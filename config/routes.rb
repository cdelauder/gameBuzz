Rails.application.routes.draw do
  get 'login' => 'sessions#new' :as =>'login'
  get 'logout' => 'sessions#destroy', :as => 'logout'
  root :to => 'users#show', :as => 'home'
end
