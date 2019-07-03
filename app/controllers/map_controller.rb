class MapController < ApplicationController
  def index
  	@map_center = [55.76, 37.64]
  	@zoom = 7
  	@maps_token = "";

  	@map_points = Walon.all.map{|x| {id: x.id, walonId: x.walon_id, coords:[x.lat, x.lon]}}
  	#@map_points = {}
  	#MapPoint.all.map{|x| @map_points[x.id] = {coords: [x.lat, x.lon]}}
  end
end
