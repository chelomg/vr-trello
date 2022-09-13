FactoryBot.define do
  factory :list do
    name { Faker::Name.name }
    board { create(:board) }
  end
end