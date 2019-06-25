class CreateMapPoints < ActiveRecord::Migration[5.2]
  def change
    create_table :map_points do |t|
      t.float :lat
      t.float :lon
      t.integer :tm
      t.references :walon, foreign_key: true

      t.timestamps
    end
  end
end
