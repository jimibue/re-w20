// import Axios from "axios";
// import { useState, useEffect } from "react";
// import { Image, List, Table } from "semantic-ui-react";
// import InfiniteScroll from "react-infinite-scroller";

// const normalizeData = (data) => {

//   let agents = data.reduce(
//     (accum, p) => {
//       let property = {
//         price: p.price,
//         beds: p.beds,
//         baths: p.baths,
//         city: p.city,
//         street: p.street,
//         sq_ft: p.sq_ft,
//         zip: p.zip,
//       };

//       if (p.agent_id in accum) {
//         accum[p.agent_id].agentProperties.push(property);
//       } else {
//         accum[p.agent_id] = {
//           fullName: `${p.first_name} ${p.last_name}`,
//           email: p.email,
//           agentProperties: [property],
//         };
//       }
//       return accum;
//     },
//     {}
//   );
//   console.log(agents);

//   return Object.values(agents);
// };
// export default () => {
//   const [propertiesX, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   useEffect(() => {
//     getProperties();
//   }, []);
//   const getProperties = async () => {
//     try {
//       // TODO hook up with actual DB when done
//       let res = await Axios.get(`/api/properties?page=${page}`);
//       setPage(page + 1);
//       console.log(res);
//       let normalized = normalizeData(res.data.data);
//       setTotalPages(res.data.total_pages);
//       setProperties(normalized);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       alert("error occured");
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>loading</p>;
//   return (
//     <List style={styles.scroller}>
//       <InfiniteScroll
//         pageStart={page}
//         loadMore={getProperties}
//         hasMore={page < totalPages}
//         useWindow={false}
//       >
//         {propertiesX.map((agent) => {
//           let {
//             agent_id,
//             first_name,
//             last_name,
//             email,
//             phone,
//             properties,
//           } = agent;
//           return (
//             <List.Item key={agent_id}>
//               <List.Header>
//                 {first_name} {last_name} - {email}
//               </List.Header>
//               <List.Item>
//                 <Table celled>
//                   <Table.Header>
//                     <Table.Row>
//                       <Table.HeaderCell>Price</Table.HeaderCell>
//                       <Table.HeaderCell>Beds</Table.HeaderCell>
//                       <Table.HeaderCell>Baths</Table.HeaderCell>
//                       <Table.HeaderCell>Sq. Ft.</Table.HeaderCell>
//                       <Table.HeaderCell>Street</Table.HeaderCell>
//                       <Table.HeaderCell>City</Table.HeaderCell>
//                       <Table.HeaderCell>ZIP</Table.HeaderCell>
//                     </Table.Row>
//                   </Table.Header>
//                   <Table.Body>
//                     {propertiesX.map((p) => (
//                       <Table.Row key={p.id}>
//                         <Table.Cell>${p.price}</Table.Cell>
//                         <Table.Cell>{p.beds}</Table.Cell>
//                         <Table.Cell>{p.baths}</Table.Cell>
//                         <Table.Cell>{p.sq_ft}</Table.Cell>
//                         <Table.Cell>{p.street}</Table.Cell>
//                         <Table.Cell>{p.city}</Table.Cell>
//                         <Table.Cell>{p.zip}</Table.Cell>
//                       </Table.Row>
//                     ))}
//                   </Table.Body>
//                 </Table>
//               </List.Item>
//             </List.Item>
//           );
//         })}
//       </InfiniteScroll>
//     </List>
//   );
// };

// const styles = {
//   scroller: {
//     height: "80vh",
//     overflow: "auto",
//   },
// };

import React from "react";
import axios from "axios";
import { List, Header, Table, Image } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

class Available extends React.Component {
  // state = { agents: [], };
  state = { agents: [], page: 1, total_pages: 0 };

  componentDidMount() {
    axios.get("/api/properties").then((res) => {
      // let agents = [];
      let agents = this.normalizeData(res.data.data);
      this.setState({
        agents: [...this.state.agents, ...agents],
        total_pages: res.data.total_pages,
      });
    });
  }
  normalizeData = (data) => {
    console.log("data", data);
    let agents = [];
    // get all unique set of in data ids ie
    // get agent_ids
    let ids = [...new Set(data.map((d) => d.agent_id))];
    console.log("ids", ids);
    // should be for_each
    ids.map((id) => {
      let properties = data.filter((d) => d.agent_id === id);
      let { agent_id, first_name, last_name, email, phone } = properties[0];
      let agentProperties = properties.map((p) => {
        let { price, beds, baths, sq_ft, city, street, zip, id } = p;
        return { price, beds, baths, sq_ft, city, street, zip, id };
      });

      let detail = {
        agent_id,
        first_name,
        last_name,
        email,
        phone,
        properties: agentProperties,
      };

      agents.push(detail);
      console.log("agents", agents);
    });
    return agents;
  };

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/properties?page=${page}`).then(({ data }) => {
      console.log("data:", data);
      let agents = this.normalizeData(data.data);
      this.setState({ agents: [...this.state.agents, ...agents], page });
    });
  };

  render() {
    // const { agents, } = this.state;
    const { agents, page, total_pages } = this.state;
    return (
      // <List>
      <List style={styles.scroller}>
        <InfiniteScroll
          pageStart={page}
          loadMore={this.loadMore}
          hasMore={page < total_pages}
          useWindow={false}
        >
          {agents.map((agent) => {
            let {
              agent_id,
              first_name,
              last_name,
              email,
              phone,
              properties,
            } = agent;
            return (
              <List.Item>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
                />
                <List.Content>
                  <List.Header as="a">
                    {first_name} {last_name}
                  </List.Header>
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
                    {properties.map((p) => (
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
        </InfiniteScroll>
      </List>
    );
  }
}

const styles = {
  scroller: {
    height: "80vh",
    overflow: "auto",
  },
};

export default Available;
