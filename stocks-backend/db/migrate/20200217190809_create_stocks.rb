class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.string :ticker
      t.references :user, null: false, foreign_key: true
      t.string :purchase_price
      t.string :current_price

      t.timestamps
    end
  end
end
