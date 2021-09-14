import React, { useEffect, useState } from "react";
import "../src/App.css";
import ApiService from "../src/ApiService";
const Home = () => {
  console.log("render");
  const [allData, setAllData] = useState([]);
  const [smartphone, setSmartphone] = useState([]);
  let [checked1, setChecked1] = useState({});
  const [filter, setFilter] = useState({
    f_type: {},
  });

  useEffect(() => {
    letFunc();
  }, []);

  useEffect(() => {
    ApiService.FetchSmartphone()
      .then((response) => {
        console.log(response[0], typeof response);
        setSmartphone(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const letFunc = () => {
    //FetchSmartphone
    let chkd = Object.assign({}, checked1);
    ApiService.FetchData()
      .then((response) => {
        setAllData(response);
        for (const property in response) {
          chkd[property] = false;
        }
        setChecked1(chkd);
      })
      .catch((error) => console.log(error));
  };
  const handleCheckbox_keyword = (key) => (e) => {
    let ch = Object.assign({}, checked1);
    ch[key] = !ch[key];

    setChecked1(ch);

    if (ch[key] === false) {
      let p2 = Object.assign({}, filter);
      var size = Object.keys(p2.f_type).length;
      let c_array = [...p2.f_type["search_key"]];
      if (
        filter.f_type["search_key"] !== null ||
        filter.f_type["search_key"] !== undefined
      ) {
        if (size === 1 && c_array.length === 1) {
          delete p2.f_type.search_key;
        } else {
          const index = c_array.indexOf(key);
          if (index > -1) {
            c_array.splice(index, 1);
          }
          if (c_array.length > 0) {
            p2.f_type["search_key"] = c_array;
            setFilter(p2);
          } else {
            delete p2.f_type.search_key;
          }
        }
      }
      ApiService.FilterData(p2)
        .then((response) => {
          console.log(response);
          //if (Object.keys(smartphone).length !== 0)
          setSmartphone(response);
        })
        .catch((error) => console.log(error));
    } else {
      let p2 = Object.assign({}, filter);
      if (
        filter.f_type["search_key"] === null ||
        filter.f_type["search_key"] === undefined
      ) {
        p2.f_type["search_key"] = [key];
      } else {
        const c_array = [...p2.f_type["search_key"]];
        c_array.push(key);
        p2.f_type["search_key"] = c_array;
      }
      setFilter(p2);
      //FilterData
      ApiService.FilterData(p2)
        .then((response) => {
          console.log(response);
          //if (Object.keys(smartphone).length !== 0)
          setSmartphone(response);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      {Object.keys(allData).length !== 0
        ? Object.entries(allData).map(([keys, values], i) => {
            return keys !== "username" ? (
              <>
                <div key={Math.random()}>
                  {/* <p>{i}</p> */}
                  <span>{keys} -></span>
                  <strong>{values} times </strong>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={checked1[keys]}
                    onChange={handleCheckbox_keyword(keys)}
                    checked={checked1[keys]}
                  />
                </div>
              </>
            ) : null;
          })
        : null}
      {Object.keys(allData).length !== 0
        ? allData.username.map((items) => {
            return (
              <div key={Math.random()}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {items}
                </label>
              </div>
            );
          })
        : null}
      {Object.keys(smartphone).length !== 0
        ? smartphone.map((i) => {
            return (
              <div key={Math.random()}>
                <span>Name: {i["name"]}</span>
                <p>Description: {i["description"]}</p>
              </div>
            );
          })
        : null}
      <button className="btn btn-primary">Filter</button>
      <div className="form-check">
        <label htmlFor="date-from">From:</label>
        <input type="date" id="date-from" name="date-from" />
        <label htmlFor="date-to">To:</label>
        <input type="date" id="date-to" name="date-to" />
      </div>
    </div>
  );
};

export default Home;
