class Api::V1::ExpensesController < ApplicationController

    def create
        category = Category.find_by(name: params[:category])
        expense = Expense.create(user: current_user, name: params[:name], amount: params[:amount], category: category, notes: params[:notes])
        if expense.save
            render json: ExpenseSerializer.new(expense), status: :accepted
        else
            render json: {errors: expense.errors.full_messages}, status: :unprocessible_entity
        end
    end

    def update
    end
    
    def destroy
        puts "inside destroy"
        puts params
        puts params[:id]
        expense = Expense.find(params[:id])
        expense.destroy
    end

    private
    
    def expense_params
        params.require(:expense).permit(:name, :amount, :category, :notes, :user)
    end
end