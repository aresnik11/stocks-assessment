class AddColorToStockAgain < ActiveRecord::Migration[6.0]
  def change
    change_column :stocks, :color, :string
  end
end
