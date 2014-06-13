Rails.application.routes.draw do
  get 'login' => 'sessions#new', :as =>'login'
  get 'logout' => 'sessions#destroy', :as => 'logout'

  resources :quizzes, :only => [:index, :show]

  root :to => 'quizzes#index'
end
