class ExpenseSerializer
    include JSONAPI::Serializer
    attributes :name, :amount, :category, :notes
end