class Api::V1::BudgetsController < ApplicationController
    
    def create
        budget = Budget.create(user: current_user, amount: params[:amount])
        if budget.save
            render json: BudgetSerializer.new(budget), status: :accepted
        else
            render json: {errors: budget.errors.full_messages}, status: :unprocessible_entity
        end
    end

    def update
        budget = Budget.find(params[:id])
        budget.update(amount: params[:newAmount])
        render json: BudgetSerializer.new(budget), status: :accepted
    end

    private
    
    def budget_params
        params.require(:budget).permit(:user, :amount)
    end
end