import { useState, useEffect } from "react";
import axios from "axios";
import { Form, List, Image } from "semantic-ui-react";

export default () => {
  const [cities, setCities] = useState([]);
  const [properties, setProperties] = useState([]);
  // const [city, setCity] = useState(null);

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    let res = await axios.get("/api/city_list");
    setCities(res.data);
  };
  const getCityProperties = async (city) => {
    let res = await axios.get(`/api/cities/${city}`);
    console.log(res);
    setProperties(res.data);
  };

  const renderProperties = () => {
    if (properties.length == 0) {
      return <h1>Please select a city</h1>;
    }
    return (
      <List celled>
        {properties.map((p) => (
          <List.Item key={p.id}>
            <Image avatar src="https://picsum.photos/200" />
            <List.Content>
              <List.Header>${p.price}</List.Header>
              square feet: {p.sq_ft}, beds: {p.beds}, baths: {p.baths}
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  };
  return (
    <>
      <Form.Select
        label="cities"
        onChange={(e, { value }) => getCityProperties(value)}
        options={cities.map((c) => {
          return { key: c, text: c, value: c.toLowerCase() };
        })}
      />
      {renderProperties()}
    </>
  );
};
