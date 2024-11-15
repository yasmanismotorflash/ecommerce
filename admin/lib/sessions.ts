'use server';
import "server-only";
import { sign, verify} from "hono/jwt";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
export async function createToken(
    data: any,
    expiresIn: number = 168
  ): Promise<string | null> {
    console.log('secretKey',secretKey)
    try {
      if (!secretKey) return null;
      const exp = Math.floor(Date.now() / 1000) + expiresIn * 3600; // Convertimos horas a segundos
      const currentTimestamp = Math.floor(Date.now() / 1000);
      //console.log('Current Timestamp:', currentTimestamp);
      const expiresInHours = 8;
      const expirationTimestamp = currentTimestamp + expiresInHours * 3600;
      //console.log('Expiration Timestamp:', expirationTimestamp);
      const token = sign(data, secretKey);//'AlFw4TDZlJDq6soPXMWRfKOgNS0JiiROIxReVNrT8Ns='
      console.log('token', token);
  
      return token;
    } catch (err) {
      console.log("Error:", err);
      return null;
    }
  }

  export async function getToken() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    const data = await verifyToken(session);
    if (!data) return null;
    const { token } = data;
    return token;
  }

  export async function verifyToken(token: string): Promise<any | null> {
    if (!secretKey) return null;
    try {
      return verify(token, secretKey);
    } catch (err) {
      console.log({err})
      return null;
    }
  }