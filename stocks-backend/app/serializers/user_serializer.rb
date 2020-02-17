class UserSerializer < ActiveModel::Serializer
  # only sends back these attributes, includes stocks
  attributes :id, :name, :email
  has_many :stocks
end
