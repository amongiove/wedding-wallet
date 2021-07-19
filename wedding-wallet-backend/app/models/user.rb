class User < ApplicationRecord
    has_secure_password
    
    has_one :budget
    has_many :expenses
end
