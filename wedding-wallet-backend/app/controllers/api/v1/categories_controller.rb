class Api::V1::CategoriesController < ApplicationController
    skip_before_action :authorized, only: [:index]

    def index
        categories = Category.all
        render json: { category: CategorySerializer.new(categories) }, status: :accepted
    end

    def show
        category = Category.find(params[:id])
        render json: { category: CategorySerializer.new(category) }, status: :accepted
    end

    private
    
    def category_params
        params.require(:category).permit(:name)
    end
end
