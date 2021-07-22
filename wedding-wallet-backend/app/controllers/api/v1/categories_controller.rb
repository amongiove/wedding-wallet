class Api::V1::CategoriesController < ApplicationController
    
    def create
    end

   

    private
    
    def category_params
        params.require(:category).permit(:name)
    end
end

#categories: [accomodation, attire, bachelor/bachelorette party, ceremony, entertainment, favors & gifts, florals, food & drink, honeymoon, photography & videography, rehersal dinner, rentals & decor, stationary, transportation, venue, wedding morning, additional expenses]