class UserSerializer < ActiveModel::Serializer
  # only sends back these attributes, includes stocks
  attributes :id, :name, :email, :money
  has_many :stocks
end
