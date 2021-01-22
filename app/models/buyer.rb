class Buyer < ApplicationRecord
  belongs_to :agent
  serialize :cities, Array

  #   SELECT p.id, price,  sq_ft, city, buyers.id as buyer_id
  # from buyers
  # inner join agents a on a.id = buyers.agent_id
  # inner join properties p on p.agent_id = a.id and p.price <= buyers.max_price
  # inner join addresses ad on ad.property_id = p.id and city = any('{"Draper"}')
  # where buyers.id = 1 and p.sold <> true
  # Order by price desc
  def self.get_properties(id, cities)
    select("p.id, price,  sq_ft, city, buyers.id as buyer_id")
      .joins("inner join agents a on a.id = buyers.agent_id
    inner join properties p on p.agent_id = a.id and p.price <= buyers.max_price
    inner join addresses ad on ad.property_id = p.id and city = any('{#{cities.join(",")}}')")
      .where("buyers.id = ? and p.sold <> true", id)
      .order("price desc")
  end
end
