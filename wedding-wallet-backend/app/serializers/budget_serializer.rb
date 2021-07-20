class BudgetSerializer
    include JSONAPI::Serializer
    attributes :user, :amount
end