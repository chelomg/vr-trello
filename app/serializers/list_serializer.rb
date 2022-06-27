class ListSerializer < ActiveModel::Serializer 
  has_many :cards

  attributes :id, :name, :position, :board_id
end