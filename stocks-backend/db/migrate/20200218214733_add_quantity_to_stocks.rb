class AddQuantityToStocks < ActiveRecord::Migration[6.0]
  def change
    add_column :stocks, :quantity, :integer
    change_column :users, :money, :decimal, :default => 5000.00
  end
end
