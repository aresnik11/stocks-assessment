class RemoveDefaultColor < ActiveRecord::Migration[6.0]
  def change
    change_column_default :stocks, :color, nil
  end
end
