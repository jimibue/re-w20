class Agent < ApplicationRecord
  has_many :buyers
  has_many :properties

  # SELECT agents.id, first_name, last_name, email, sold, COUNT(*) as frequency
  # FROM agents
  # INNER JOIN properties p ON p.agent_id = agents.id
  # WHERE sold <> TRUE
  # GROUP BY agents.id, first_name, last_name, email, sold
  # ORDER BY COUNT(*) DESC
  def self.unsold_homes
    select("agents.id, first_name, last_name, email, sold, COUNT(*) as frequency")
      .joins("INNER JOIN properties p ON p.agent_id = agents.id")
      .where("sold <> TRUE")
      .group("agents.id, first_name, last_name, email, sold")
      .order("COUNT(*) DESC")
  end
end
