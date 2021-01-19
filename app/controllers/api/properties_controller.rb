class Api::PropertiesController < ApplicationController
  def index
    render json: Property.available
  end

  def index1
    render json: Property.available_no_sql
  end
end
