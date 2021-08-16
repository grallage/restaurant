import jwt from "jsonwebtoken";

const debug = true;

export namespace JwtUtils {
  export const isJwtExpired = (token: string) => {
    // offset by 60 seconds, so we will check if the token is "almost expired".
    const currentTime = Math.round(Date.now() / 1000 + 60);
    const decoded = jwt.decode(token);

    if (debug) {
      console.log(
        `## Current time + 60 seconds: ${new Date(currentTime * 1000)}`
      );
      console.log(`## Token lifetime: ${new Date(decoded["exp"] * 1000)}`);
    }

    if (decoded["exp"]) {
      const adjustedExpiry = decoded["exp"];

      if (adjustedExpiry < currentTime) {
        console.log("## Token expired");
        return true;
      }
      if (debug) {
        console.log("## #Token has not expired yet");
      }
      return false;
    }
    if (debug) {
      console.log('## Token["exp"] does not exist');
    }

    return true;
  };
  export const getExp = (token: string) => {
    const decoded = jwt.decode(token);
    // console.log(`#### decode token = ${decoded["exp"]}`);
    return decoded["exp"];
  };
}

export namespace UrlUtils {
  export const makeUrl = (...endpoints: string[]) => {
    let url = endpoints.reduce((prevUrl, currentPath) => {
      if (prevUrl.length === 0) {
        return prevUrl + currentPath;
      }

      return prevUrl.endsWith("/")
        ? prevUrl + currentPath + "/"
        : prevUrl + "/" + currentPath + "/";
    }, "");
    return url;
  };
}
