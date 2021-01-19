import Axios from "axios";
import { useState, useEffect } from "react";
import { Image, List, Table } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

// normalizeData = (data) => {
//   let agents = [];
//   let ids = [...new Set(data.map( d => d.agent_id ))];
//   ids.map( id => {
//     let properties = data.filter( d => d.agent_id === id );
//     let { agent_id, first_name, last_name, email, phone } = properties[0];
//     let agentProperties = properties.map( p => {
//       let { price, beds, baths, sq_ft, city, street, zip, id, } = p;
//       return { price, beds, baths, sq_ft, city, street, zip, id, };
//     });

//     let detail = { agent_id, first_name, last_name, email, phone, properties: agentProperties, };

//     agents.push(detail);
//   });
//   return agents;
// }

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
export default () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getProperties();
  }, []);
  const getProperties = async () => {
    try {
      // TODO hook up with actual DB when done
      let res = await Axios.get(`/api/properties?page=${page}`);
      setPage(page + 1);
      console.log(res);
      let normalized = normalizeData(res.data.data);
      setTotalPages(res.data.totalPages);
      setProperties(normalized);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("error occured");
      setLoading(false);
    }
  };

  if (loading) return <p>loading</p>;
  return (
    <>
      {/* Price	Beds	Baths	Sq. Ft.	Street	City	ZIP */}
      <h1>Available Page</h1>
      {properties.map((p) => (
        <List
          divided
          verticalAlign="middle"
          style={{ height: "80vh", overflow: "auto" }}
        >
          <InfiniteScroll
            pageStart={page}
            loadMore={getProperties}
            hasMore={properties}
            useWindow={false}
            // threshold={100}
          >
            <List.Item>
              <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/small/tom.jpg"
              />
              <List.Content>
                <List.Header as="a">{p.fullName}</List.Header>
              </List.Content>
            </List.Item>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Beds</Table.HeaderCell>
                  <Table.HeaderCell>Baths</Table.HeaderCell>
                  {/* <Table.HeaderCell>Square Feet</Table.HeaderCell> */}
                  <Table.HeaderCell>Street</Table.HeaderCell>
                  <Table.HeaderCell>City</Table.HeaderCell>
                  <Table.HeaderCell>Zip</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {p.agentProperties.map((ap) => (
                  <Table.Row>
                    <Table.Cell>{ap.price}</Table.Cell>
                    <Table.Cell>{ap.beds}</Table.Cell>
                    <Table.Cell>{ap.baths}</Table.Cell>
                    {/* <Table.Cell>{ap.sq_ft}</Table.Cell> */}
                    <Table.Cell>{ap.street}</Table.Cell>
                    <Table.Cell>{ap.city}</Table.Cell>
                    <Table.Cell>{ap.zip}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </InfiniteScroll>
        </List>
      ))}
    </>
  );
};
