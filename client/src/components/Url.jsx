import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Count from "./Count";
import NavBar from "./NavBar";
import Shortener from "./Shortener";
import TableComp from "./Table";

const Url = () => {
  const { tab } = useParams();
  const history = useHistory();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  const TabIndex = ["Count", "Shortener", "Table"];

  const [selectedTab, setSelectedTab] = useState(TabIndex.indexOf(tab));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/Login");
    }
    const getUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/auth/getUser", {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        setUser(data.data);
      } catch (error) {
        console.log(error.response.data);
        if (!error.response.data.success) {
          history.push("/Login");
        }
      }
    };

    getUser();

    const getUrls = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/shorten/user", {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });

        setUserData(data.data);
      } catch (error) {
        console.log(error.response.data || error);
      }
    };

    getUrls();
  }, [history]);

  return (
    <>
      <NavBar
        user={user}
        setUser={setUser}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        TabIndex={TabIndex}
      />
      {selectedTab === 0 && <Count dayCount={userData?.dayCount} monthCount={userData?.monthCount} />}
      {selectedTab === 1 && <Shortener />}
      {selectedTab === 2 && <TableComp urls={userData?.urls} />}
    </>
  );
};

export default Url;
