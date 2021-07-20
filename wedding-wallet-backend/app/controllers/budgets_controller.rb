class Api::V1::BudgetsController < ApplicationController
    
    def create
        budget = Budget.create(budget_params)
        if budget.save
            render json: BudgetSerializer.new(budget), status: :accepted
        else
            render json: {errors: budget.errors.full_messages}, status: :unprocessible_entity
        end
    end

    def show
    end

    private
    
    def budget_params
        params.require(:budget).permit(:user, :amount)
    end
end