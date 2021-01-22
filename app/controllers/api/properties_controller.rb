class Api::PropertiesController < ApplicationController
  before_action :set_page

  def index
    properties = Property.page(@page).available
    render json: { data: properties, total_pages: properties.total_pages }
  end

  def index1
    render json: Property.available_no_sql
  end

  def city_list
    render json: Address.distinct.pluck(:city)
  end

  def city
    render json: Property.by_city(params[:city])
  end

  def city_cost
    render json: Address.cost_by_city
  end

  private

  def set_page
    @page = params[:page] || 1
  end
end
