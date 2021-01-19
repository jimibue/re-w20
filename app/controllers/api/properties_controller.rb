class Api::PropertiesController < ApplicationController
  before_action :set_page

  def index
    properties = Property.page(@page).available
    render json: { data: properties, total_pages: properties.total_pages }
  end

  def index1
    render json: Property.available_no_sql
  end

  private

  def set_page
    @page = params[:page] || 1
  end
end
