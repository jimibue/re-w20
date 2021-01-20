// 1st call
// I am getting back array of agents with extra frequency field on it
// of  properties

import Axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";

let agentsData = [
  {
    email: "gene@wolf.org",
    first_name: "Daryl1",
    frequency: 43,
    id: 36,
    last_name: "Emmerich",
    sold: false,
  },
  {
    email: "gene1@wolf.org",
    first_name: "Daryl2",
    frequency: 73,
    id: 37,
    last_name: "Emmerich",
    sold: false,
  },
  {
    email: "gene1@wolf.org",
    first_name: "Daryl3",
    frequency: 23,
    id: 38,
    last_name: "Emmerich",
    sold: false,
  },
];

// 2nd Call (after I select an agent), I am going to get
// the array of agents buyers whic
const buyerData = [
  {
    cities: ["Sandy", "SLC"],
    email: "eloisa@millschamplin.name",
    first_name: "Trey3",
    id: 1750,
    last_name: "Ebert",
    phone: "352-8533-3160",
  },
  {
    cities: ["Draper", "SLC"],
    email: "eloisa@millschamplin.name",
    first_name: "Trey2",
    id: 1751,
    last_name: "Ebert",
    phone: "352-8543-3160",
  },
  {
    cities: ["Sandy", "SLC"],
    email: "eloisa@millschamplin.name",
    first_name: "Trey1",
    id: 1753,
    last_name: "Ebert",
    phone: "352-8553-3160",
  },
];

// 3rd call
// give back Array of properties that are under buyers max_price and in the desired cities

export default () => {
  const [agents, setAgents] = useState([]);
  const [buyers, setBuyers] = useState([]);
  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = async () => {
    // TODO: HOOKUP TO ACTUAL WHEN FINISHED
    try {
      let res = await Axios.get("/api/Xfind_homesX");
      setAgents(res.data);
    } catch (err) {
      setAgents(agentsData);
    }
  };
  const getBuyersProperties = (id) => {
    console.log(id);
  };
  const getBuyers = async (id) => {
    console.log(id);
    try {
      let res = await Axios.get(`/api/agent_buyers/${id}`);
      setBuyers(res.data);
    } catch (err) {
      setBuyers(buyerData);
    }
  };
  const renderBuyers = () => {
    if (buyers.length == 0) {
      return <h1>select an agent</h1>;
    }
    return (
      <Form.Select
        onChange={(e, { value }) => {
          getBuyersProperties(value);
        }}
        options={buyers.map((b) => {
          return {
            key: `buyer-${b.id}`,
            value: b.id,
            text: `${b.first_name} ${b.last_name}`,
          };
        })}
      />
    );
  };
  return (
    <>
      <h1>Find Home</h1>
      <Form.Select
        onChange={(e, { value }) => {
          getBuyers(value);
        }}
        options={agents.map((a) => {
          return {
            key: `agent-${a.id}`,
            value: a.id,
            text: `${a.first_name} ${a.last_name}`,
          };
        })}
      />
      {renderBuyers()}
    </>
  );
};
