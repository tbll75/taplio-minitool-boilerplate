import * as Amplitude from "@amplitude/node";
import { isBrowser, isMobile } from "react-device-detect";

const client = Amplitude.init("724fdbf01623539827dbb4db9d59940d");

let session: any = undefined;
let userId = "";

// @ts-ignore
export const init = async (actualSession) => {
  if (actualSession) {
    session = actualSession;
    userId = actualSession?.user?.uid;
  }

  log("init_challenge", { ...actualSession.user });
};

export const log = async (event: string, properties = {} as any, newUserId = "") => {
  try {
    
    if (newUserId)
      userId = newUserId;

    // console.log("log event " + event);
    //@ts-ignore
    if (session?.user) {
      properties = {
        //@ts-ignore
        ...session.user,
        ...properties,
      };
    }

    //@ts-ignore
    properties.env_node = process.env.NODE_ENV ? process.env.NODE_ENV : "local";
    //@ts-ignore
    properties.env = process.env.CUSTOM_ENV ? process.env.CUSTOM_ENV : "local";

    properties.isMobile = isMobile;
    properties.isBrowser = isBrowser;

    let obj = {
      event_type: event,
      event_properties: {
        ...properties,
      },
    };
        
    if (userId)
        //@ts-ignore
        obj.user_id = userId;
    else
        //@ts-ignore
        obj.user_id = "111111111";

    // console.log(obj);
    await client.logEvent(obj);

    //@ts-ignore
    if (typeof window != "undefined" && window.gtag) {
      //@ts-ignore
      window.gtag('event', event, properties);
    }

  } catch (e) {
    console.error("Error in log amplitude: " + e.message);
  }
};
