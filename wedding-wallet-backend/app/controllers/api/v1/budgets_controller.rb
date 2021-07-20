class Api::V1::BudgetsController < ApplicationController
    
    def create
        puts "BUDGET CREATE"
        puts params
        budget = Budget.create(budget_params)
        if budget.save
            render json: BudgetSerializer.new(budget), status: :accepted
        else
            puts budget.errors.full_messages
            render json: {errors: budget.errors.full_messages}, status: :unprocessible_entity
        end
    end

    def show
    end

    private
    
    def budget_params
        params.require(:budget).permit(:amount)
    end
end