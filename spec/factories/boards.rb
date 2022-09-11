FactoryBot.define do
  factory :board do
    name { Faker::Name.name }
    description { Faker::Lorem.characters(number: 10) }
    user { create(:user) }
  end
end