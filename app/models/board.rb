class Board < ApplicationRecord
  has_many :lists, dependent: :destroy
  belongs_to :user
  validates :name, presence: true
end
