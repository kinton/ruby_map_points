class MapPointsController < ApplicationController

	def index
		map_points = MapPoint.all
		render json: map_points
	end

	skip_before_action :verify_authenticity_token

	def create
		if params.blank?
			format.json {render json: @map_point.errors, status: :unprocessable_entity}
			exit
		end

		@map_point = MapPoint.new(params.require(:map_point).permit(:latitude, :longitude))

		respond_to do |format|
			if @map_point.save
				format.json {render json: @map_point, status: :created }
			else
				format.json {render json: @map_point.errors, status: :unprocessable_entity}
			end
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
