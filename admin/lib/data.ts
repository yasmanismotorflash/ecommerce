import { cookies } from "next/headers";
import { getToken } from "./sessions";

const xclientid = process.env.CLIEN_ID_WEVIVE;
const headers = {
  "Content-Type": "application/json",
  // "x-client-id": `${xclientid}`,
};

const URI = process.env.API_GRAPHQL_URI;

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
    console.log(email)
    console.log(password)
    console.log(URI)
  /*const query = QUERY_USER_BY_EMAIL(email, password);
  //console.log('query', query);
  let errors = null;
  let data = null;
  if (!URI) {
    console.error("GraphQL URI is missing.");
    errors = "GraphQL URI is missing.";
    throw new Error("GraphQL URI is missing.");
  }*/

  /*try {
    const response = await fetch(URI, {
      method: "POST",
      headers: {
        ...headers,
        "x-client-id": `${xclientid}`,
      },
      body: JSON.stringify({
        query, // Pasamos las variables a la query
      }),
    });

    if (!response.ok) {
      return { errors, data };
    }

    const jsonResponse = await response.json();
    //console.log('response', jsonResponse);
    if (jsonResponse.errors) {
      let errorMessage = jsonResponse.errors[0].message;
      console.error("GraphQL errors:", errorMessage);
      errors = errorMessage;
      return { errors, data };
    }

    // Acceder a los datos usando la variable 'source'
    const dataResp = jsonResponse.data?.["authUser"];
    //console.log('dataResp', dataResp);
    if (!dataResp) {
      console.error(`No hay datos`);
      errors = `No hay datos`;
      return { errors, data };
    }

    const user = dataResp.user;
    const token = dataResp.token;

    if (!user) {
      console.error(`Usuario no encontrado`);
      errors = `Usuario no encontrado`;
      return { errors, data };
    }
    return dataResp;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return { errors, data };
  }*/
  
  return ({user:'SysAdmin',token:'egewr6ewe8whfdd8fwh9ee7w7errf'});
};

export const deleteTokenKV = async () => {
  const token = await getToken();
  const cookieStore = await cookies()
  const url = `${process.env.APIKV_URL}/session/${token}`;
  const method = "DELETE";
  const body = {};
  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
        "x-client-id": `${xclientid}`,
      }
    });
    const jsonResponse = await response.json();
    //console.log('jsonResponse', jsonResponse);
    const { message, errors } = jsonResponse
    // const logout = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/session`, {
    //   method: "GET"
    // });
    // const logoutResponse = await logout.json();
    // console.log('env', process.env.__NEXT_PRIVATE_ORIGIN);
    // console.log('logoutResponse', logoutResponse);
    return { errors: null, data: message };
  } catch (error: unknown) {
    console.error("Error deleting token:", error);
    if (error instanceof Error) {
      return { data: null, errors: error?.message };
    }
  }

};