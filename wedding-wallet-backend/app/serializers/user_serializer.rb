class UserSerializer
    include JSONAPI::Serializer
    attributes :username, :budget, :expenses
end