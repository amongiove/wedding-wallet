class User < ApplicationRecord
    has_one :budget
    has_many :expenses
end
