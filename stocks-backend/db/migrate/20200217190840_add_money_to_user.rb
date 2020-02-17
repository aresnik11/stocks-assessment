class AddMoneyToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :money, :float, :default => 5000.00
  end
end
