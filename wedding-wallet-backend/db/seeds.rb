# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Category.destroy_all

categories = Category.create([{ name: "Accomodation"}, { name: "Attire"}, { name: "Bachelor/Bachelorette Party"}, { name: "Ceremony"}, { name: "Entertainment"}, { name: "Favors & Gifts"}, { name: "Florals"}, { name: "Food & Drink"}, { name: "Honeymoon"}, { name: "Photography & Videography"}, { name: "Rehersal Dinner"}, { name: "Rentals & Decor"}, { name: "Stationary"}, { name: "Transportation"}, { name: "Venue"}, { name: "Wedding Morning"}, { name: "Additional Expenses"}])