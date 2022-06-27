class List < ApplicationRecord
  acts_as_list scope: :board
  has_many :cards, -> { order(position: :asc) }, dependent: :destroy
  belongs_to :board
  validates :name, presence: true
end
