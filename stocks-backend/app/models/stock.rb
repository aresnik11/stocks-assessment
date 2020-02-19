class Stock < ApplicationRecord
  belongs_to :user
  validates :quantity, numericality: { only_integer: true, greater_than: 0 }
  validates :ticker, :quantity, presence: true
end
