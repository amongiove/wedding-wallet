class BudgetSerializer
    include FastJsonapi::ObjectSerializer
    attributes :user, :amount
end