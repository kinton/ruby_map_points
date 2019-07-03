class WalonsController < ApplicationController
	def index
		respond_to do |format|
			format.json {render json: Walon.all.map{|x| {id: x.id, coords:[x.lat, x.lon]}} }
		end
	end

	skip_before_action :verify_authenticity_token

	def destroy
	  	@walon = Walon.find(params[:id])
	  	
	  	respond_to do |format|
			if @walon.destroy
				format.json {render json: @walon, status: :destroyed }
			else
				format.json {render json: @walon, status: :unprocessable_entity}
			end
		end
	end
end
