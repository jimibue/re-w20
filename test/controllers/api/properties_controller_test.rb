require 'test_helper'

class Api::PropertiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_properties_index_url
    assert_response :success
  end

end
