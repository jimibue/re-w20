import { List, Table, Image } from "semantic-ui-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getAgents(1);
  }, []);
  const getAgents = async (index) => {
    try {
      // TODO hook up with actual DB when done
      console.log(page);
      let res = await axios.get(`/api/properties?page=${index}`);
      console.log(res);
      let normalized = normalizeData(res.data.data);
      setTotalPages(res.data.total_pages);
      console.log(normalized);
      setAgents(normalized);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("error occured");
      setLoading(false);
    }
  };

  const normalizeData = (data) => {
    // [].reduce((accum,d)=>{}, {})
    let agents = data.reduce(
      (accum, p) => {
        let property = {
          price: p.price,
          beds: p.beds,
          baths: p.baths,
          city: p.city,
          street: p.street,
          sq_ft: p.sq_ft,
          zip: p.zip,
        };

        if (p.agent_id in accum) {
          accum[p.agent_id].agentProperties.push(property);
        } else {
          accum[p.agent_id] = {
            fullName: `${p.first_name} ${p.last_name}`,
            email: p.email,
            agentProperties: [property],
          };
        }
        return accum;
      },
      {} // starting value of accum
    );
    console.log(agents);
    // just need the value
    return Object.values(agents);
  };
  const pageClicked = (i) => {
    setPage(i);
    getAgents(i);
  };
  const renderPagePicker = () => {
    let jsx = [];
    for (let i = 1; i <= totalPages; i++) {
      jsx.push(
        <span
          key={`span-${i}`}
          onClick={() => pageClicked(i)}
          style={
            page == i
              ? {
                  paddingRight: "3px",
                  color: "blue",
                  borderBottom: "1px solid blue",
                }
              : { paddingRight: "3px" }
          }
        >
          {i}
        </span>
      );
    }
    return jsx;
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // maxWidth: "400px",
          flexWrap: "wrap",
          cursor: "pointer",
        }}
      >
        {renderPagePicker()}
      </div>
      <List>
        {agents.map((agent) => {
          let { agent_id, fullName, email, phone, agentProperties } = agent;
          return (
            <List.Item key={`agent-${agent_id}`}>
              <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
              />
              <List.Content>
                <List.Header as="a">{fullName}</List.Header>
              </List.Content>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Beds</Table.HeaderCell>
                    <Table.HeaderCell>Baths</Table.HeaderCell>
                    <Table.HeaderCell>Sq. Ft.</Table.HeaderCell>
                    <Table.HeaderCell>Street</Table.HeaderCell>
                    <Table.HeaderCell>City</Table.HeaderCell>
                    <Table.HeaderCell>ZIP</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {agentProperties.map((p) => (
                    <Table.Row key={p.id}>
                      <Table.Cell>${p.price}</Table.Cell>
                      <Table.Cell>{p.beds}</Table.Cell>
                      <Table.Cell>{p.baths}</Table.Cell>
                      <Table.Cell>{p.sq_ft}</Table.Cell>
                      <Table.Cell>{p.street}</Table.Cell>
                      <Table.Cell>{p.city}</Table.Cell>
                      <Table.Cell>{p.zip}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </List.Item>
          );
        })}
      </List>
    </>
  );
};
