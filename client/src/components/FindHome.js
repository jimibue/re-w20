import Axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";

export default () => {
  const [agents, setAgents] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [buyersProperties, setBuyersProperties] = useState([]);
  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = async () => {
    try {
      let res = await Axios.get("/api/agents");
      setAgents(res.data);
    } catch (err) {
      alert("err occured");
    }
  };
  const getBuyersProperties = async (id) => {
    try {
      let res = await Axios.get(`/api/buyers/${id}`);
      setBuyersProperties(res.data);
    } catch (err) {
      alert("err occured");
    }
  };
  const getBuyers = async (id) => {
    try {
      let res = await Axios.get(`/api/agents/${id}`);
      setBuyers(res.data);
    } catch (err) {
      alert("err occured");
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
  const renderPropertyData = () => {
    if (buyersProperties.length == 0) return null;
    return buyersProperties.map((bp) => {
      return (
        <div key={`bp-${bp.id}`}>
          <p style={{ marginBottom: 0 }}>price: {bp.price}</p>
          <p style={{ marginTop: 0 }}>
            city: {bp.city}, sq feet: {bp.sq_ft}
          </p>
          <hr />
        </div>
      );
    });
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
      {renderPropertyData()}
    </>
  );
};
