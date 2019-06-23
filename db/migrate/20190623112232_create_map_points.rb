class CreateMapPoints < ActiveRecord::Migration[5.2]
  def change
    create_table :map_points do |t|
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
