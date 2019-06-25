class CreateWalons < ActiveRecord::Migration[5.2]
  def change
    create_table :walons do |t|
      t.integer :walon_id
      t.float :lat
      t.float :lon

      t.timestamps
    end
  end
end
