# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

cities = [
  "Sandy",
  "Draper",
  "SLC",
  "Orem",
  "Provo",
  "Ogden",
  "Layton",
  "Midvale",
  "Murray",
]

100.times do
  a = Agent.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.cell_phone,
  )

  50.times do
    num_cities = rand(1..cities.length - 1)
    Buyer.create(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.cell_phone,
      max_price: rand(99000..1500000),
      cities: cities.sample(num_cities),
      agent_id: a.id,
    )
  end

  50.times do
    sold = Faker::Boolean.boolean(0.3) #fix this
    price = rand(99000..1500000)
    percent_change = (-3..3).to_a.sample.to_f / 100
    sold_price = sold ? price * (1 + percent_change) : nil
    p = Property.create(
      price: price,
      sold: sold,
      sold_price: sold_price,
      beds: rand(1..8),
      baths: rand(1..8),
      sq_ft: rand(1000..7000),
      agent_id: a.id,
    )

    p.create_address(
      street: Faker::Address.street_address,
      zip: Faker::Address.zip_code,
      city: cities.sample,
    )
  end
end
