"use server";

import { getToken } from "@/lib/session";
import { cookies } from "next/headers";

const URI = process.env.API_URL;
const xclientid = process.env.API_KEY;

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  const query = {'email':email,'password':password};
  console.log('query', query);
  let errors = null;
  let data = null;
  if (!URI) {
    throw new Error('There is no URI!!');
}

  try {
    /*const response = await fetch(URI, {
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
      const errorMessage = jsonResponse.errors[0].message;
      console.error("API errors:", errorMessage);
      errors = errorMessage;
      return { errors, data };
    }

    // Acceder a los datos usando la variable 'source'
    const dataResp = jsonResponse.data?.["token"];
    //console.log('dataResp', dataResp);
    if (!dataResp) {
      console.error(`No hay datos`);
      errors = `No hay datos`;
      return { errors, data };
    }*/

    const user = 'SysAdmin';//dataResp.user
    const token = 'sdnsudawq9iisds6544ra636w2jjje' //dataResp.token;
    console.log(user,token)
    if (!user) {
      console.error(`Usuario no encontrado`);
      errors = `Usuario no encontrado`;
      return { errors, data };
    }
    return {user,token}//dataResp;
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    return { errors, data };
  }
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

export const checkSessionKV = async () => {
  const token = await getToken();
  const url = `${process.env.APIKV_URL}/session/${token}`;
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...headers,
        "x-client-id": `${xclientid}`,
      }
    });
    if (!response.ok) {
      console.error("Error fetching tokens:", response);
      return false      
    }
    const jsonResponse = await response.json();
    //console.log('jsonResponse', jsonResponse);
    const { data, errors } = jsonResponse
    return true;
  } catch (error: unknown) {
    console.error("Error fetching tokens:", error);
    if (error instanceof Error) {
      return false;
    }
  }
};