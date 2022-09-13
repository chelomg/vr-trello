FactoryBot.define do
  factory :card do
    name { Faker::Name.name }
    list { create(:list) }
  end
end