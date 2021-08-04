class Expense < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :name, presence: true
  validates :amount, presence: true
  validates :category_id, presence: true
end
