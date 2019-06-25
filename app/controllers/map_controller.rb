class MapController < ApplicationController
  def index
  	@map_center = [55.76, 37.64]
  	@zoom = 7
  	@maps_token = "";

  	@map_points = MapPoint.all.map{|x| {id: x.id, coords:[x.lat, x.lon]}}
  end
end
