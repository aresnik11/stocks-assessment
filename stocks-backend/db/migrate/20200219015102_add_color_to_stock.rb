class AddColorToStock < ActiveRecord::Migration[6.0]
  def change
    add_column :stocks, :color, :string, :default => "grey"
  end
end
