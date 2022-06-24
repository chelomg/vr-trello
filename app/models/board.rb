class Board < ApplicationRecord
  has_many :lists, dependent: :destroy
  belongs_to :user
  validates :name, presence: true

  def lists_json
    board_json = ActiveModelSerializers::SerializableResource.new(self, include: ['**']).as_json
    board_json[:lists]
  end
end
