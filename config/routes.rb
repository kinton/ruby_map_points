Rails.application.routes.draw do
	get 'map/index'

	#resources :walons do
	#	resources :map_points
	#end
	resources :walons, :map_points

	root 'map#index' 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
