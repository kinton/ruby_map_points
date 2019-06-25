class MapPointsController < ApplicationController

	def index
		map_points = MapPoint.all
		
		render json: map_points
	end

	skip_before_action :verify_authenticity_token

	def create
		if params.blank?
			format.json {render json: params, status: :unprocessable_entity}
			return
		end

		params[:events].each do |dot|

			if Walon.where(walon_id: dot[:i]).count != 0
				@walon = Walon.find_by(walon_id: dot[:i])
			else
				@walon = Walon.new
				@walon.walon_id = dot[:i]
			end

			if (dot[:d].has_key?(:pos))
				@walon.lat = dot[:d][:pos][:y]
				@walon.lon = dot[:d][:pos][:x]
			else
				next
			end

			unless @walon.save
				render json: @walons.errors, status: :unprocessable_entity
				return
			end

			@map_point = @walon.map_points.new(lat: dot[:d][:pos][:y], lon: dot[:d][:pos][:x], tm: params[:tm])

			respond_to do |format|
				if @map_point.save
					format.json {render json: @map_point, status: :created }
				else
					format.json {render json: @map_point.errors, status: :unprocessable_entity}
				end
			end

			break

		end
		
	end

	def destroy
	  	@map_point = MapPoint.find(params[:id])
	  	
	  	respond_to do |format|
			if @map_point.destroy
				format.json {render json: @map_point, status: :destroyed }
			else
				format.json {render json: @map_point.errors, status: :unprocessable_entity}
			end
		end
	end

end
