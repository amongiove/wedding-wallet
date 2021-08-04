class User < ApplicationRecord
    has_secure_password
    
    has_one :budget
    has_many :expenses

    validates :username, uniqueness: { case_sensitive: false }
    validates :username, length: { in: 4..20 }
    validates :password, length: { in: 6..20 }
end
