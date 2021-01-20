import { useState, useEffect } from "react";
import { Image, List, Table } from "semantic-ui-react";
import { FixedSizeList as ListA } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import axios from "axios";

const App = () => {
  // const [data, setData] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // if (data.length === 0) {
  //   setData(Array.from({ length: 500 }).map((_) => null));
  // }

  // const isItemLoaded = (index) => index < data.length && data[index] !== null;
  const isItemLoaded = (index) =>
    index < properties.length && properties[index] !== null;
  // const loadMoreItems = (startIndex, stopIndex) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const newData = [...data];
  //       for (let idx = startIndex; idx < stopIndex; idx++) {
  //         newData[idx] = faker.lorem.sentence();
  //       }
  //       setData(newData);
  //       resolve();
  //     }, 2000);
  //   });
  // };

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

  useEffect(() => {
    getProperties();
  }, []);
  const getProperties = async () => {
    try {
      // TODO hook up with actual DB when done
      let res = await axios.get(`/api/properties?page=${page}`);
      setPage(page + 1);
      console.log(res);
      let normalized = normalizeData(res.data.data);
      setTotalPages(res.data.total_pages);
      console.log(normalized);
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
      <h1>size: {properties.length}</h1>{" "}
      {/* <AutoSizer>
        {({ height, width }) => ( */}
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={properties.length}
        loadMoreItems={getProperties}
      >
        {({ onItemsRendered, ref }) => (
          // {properties.map((p) => (
          <ListA
            height={200}
            width={200}
            divided
            verticalAlign="middle"
            onItemsRendered={onItemsRendered}
            ref={ref}
            itemData={properties}
            itemSize={500}
            style={
              {
                // height: height,
                // width: width,
                // overflow: "auto",
                // background: "red",
              }
            }
          >
            {<h1>yo</h1>}
          </ListA>
          // ))}
        )}
      </InfiniteLoader>
      {/* )}
      </AutoSizer> */}
    </>
  );
};

const styles = {
  scroller: {
    height: "80vh",
    overflow: "auto",
  },
};

export default App;
