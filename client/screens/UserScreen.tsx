import * as React from "react";
import axios from "axios";
import UserHeader from "../components/UserHeader";

const UserScreen: React.FunctionComponent = () => {
  const [userData, setUserData] = React.useState({});
  // const requestData = async () => {
  //   const data = await axios.get(
  //     `https://glove-backend.herokuapp.com/users/users/1`
  //   );
  //   console.log(data);
  //   setUserData(data);
  // };

  // React.useEffect(() => {
  //   requestData();
  // }, []);

  return (
    <UserHeader
      first_name="Andrzej"
      last_name="Nie wiem"
      username="To się nie uda"
      email="example@mail.com"
      address="A nie wiem o co wam chodzi, Łódź"
    />
  );
};

export default UserScreen;
