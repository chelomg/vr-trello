class BoardSerializer < ActiveModel::Serializer 
  has_many :lists

  attributes :id, :name
end