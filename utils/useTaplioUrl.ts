import { useState, useEffect } from "react";

export function useTaplioUrl() {

  const [url, setUrl] = useState("https://taplio.com/?via=aaditsh&utm_source=carousel");

  useEffect(() => {
    setUrl(getTaplioUrl());
  }, []);

  return (url);
}

const getTaplioUrl = () => {

    let url = "https://taplio.com/";
    // return url;

    if (typeof window !== "undefined") {
        console.log("window?.location?.search: " +  window?.location?.search);
        url += window?.location?.search?.length > 1 ? window?.location?.search : "?via=aaditsh_";
        // url += window?.location?.search;
    }
    else {
        url += "?via=aaditsh&init=true";
    }

    url += "&utm_source=carousel";

    // console.log(url);

    return url;
}
