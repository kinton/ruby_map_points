class MapController < ApplicationController
  def index
  	@mapCenter = [55.76, 37.64]
  	@zoom = 10
  	@apiKey = 'PASTE_YOUR_API_KEY_HERE'

  	@map_points = MapPoint.all
  end
end
