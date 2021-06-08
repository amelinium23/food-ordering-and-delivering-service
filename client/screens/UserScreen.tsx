import * as React from "react";
import UserHeader from "../components/UserHeader";
import { User as UserType } from "../types/ApiResponseTypes";
import UserContext from "../contexts/UserContext";

const UserScreen: React.FunctionComponent = () => {
  const [userData, setUserData] = React.useState({
    email: "example@example.com",
    username: "example",
    first_name: "John",
    last_name: "Doe",
    address: "",
    account_type: 1,
  });
  const [session, setSession] = React.useContext(UserContext);

  React.useEffect(() => {
    const requestData = async () => {
      const res = await fetch(
        `https://glove-backend.herokuapp.com/users/auth/user/`,
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${session.token.access_token}`,
          },
        }
      );
      if (res.ok) {
        const json = (await res.json()) as UserType;
        setUserData(json);
      }
    };

    void requestData();
  }, [session]);

  return (
    <UserHeader
      first_name={userData.first_name}
      last_name={userData.last_name}
      username={userData.username}
      email={userData.email}
      address={userData.address}
      account_type={userData.account_type}
    />
  );
};

export default UserScreen;
