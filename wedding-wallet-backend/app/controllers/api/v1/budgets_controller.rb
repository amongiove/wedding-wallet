class Api::V1::BudgetsController < ApplicationController
    
    def create
        puts "BUDGET CREATE"
        budget = Budget.create(user: current_user, amount: params[:amount])
        if budget.save
            puts "SAVE SUCCESS"
            render json: BudgetSerializer.new(budget), status: :accepted
        else
            puts "BOO NO BUDGET SAVE"
            puts budget.errors.full_messages
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