class Walon < ApplicationRecord
	has_many :map_points, dependent: :destroy
end
