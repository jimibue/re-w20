class Property < ApplicationRecord
  belongs_to :agent
  has_one :address

  #   SELECT properties.id, price, sq_ft, baths, beds, a.first_name, a.last_name, a.email, a.id as agent_id, ad.street, ad.city, ad.zip from properties
  # inner join agents a ON a.id = properties.agent_id
  # inner join addresses ad ON ad.property_id = properties.id
  # where properties.sold <> true
  # order by a.id
  def self.available
    select("properties.id, price, sq_ft, baths, beds, a.first_name, a.last_name, a.email, a.id as agent_id, ad.street, ad.city, ad.zip ")
      .joins("inner join agents a ON a.id = properties.agent_id
      inner join addresses ad ON ad.property_id = properties.id")
      .where("properties.sold <> true")
      .order("a.id")
  end

  def self.available_no_sql
    Agent.all.map do |agent|
      agent.properties.map do |p|
        { first_name: agent.first_name, beds: p.beds, street: p.address.street }
      end
    end
  end
end
