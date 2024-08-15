import { cookies } from "next/headers";
import React from "react";

function Fetcher({ children }) {
  const cookieStore = cookies();
  const role = cookieStore.get("role");
  // console.log(role, "gettin role");

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child, { role }) : child
  );

  return <>{childrenWithProps}</>;
}

export default Fetcher;
