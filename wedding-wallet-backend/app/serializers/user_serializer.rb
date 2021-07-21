class UserSerializer
    include JSONAPI::Serializer
    attributes :username, :budget
end