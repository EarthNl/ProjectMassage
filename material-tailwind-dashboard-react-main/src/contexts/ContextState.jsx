import React, { useEffect, useState } from "react";

export default function ContextState() {
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState(null);
  
  return {
    loader,
    setLoader,
    userData,
    setUserData,
  };
}
