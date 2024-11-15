"use server"
import { z } from 'zod';
import { ResultCode } from "./login";
import { checkUserEmailPassword, deleteTokenKV} from "./data";
import { createToken } from './sessions'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Params = Promise<{ locale: string }>

export async function createSession(token: string) {
    const cookieStore = await cookies()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    cookieStore.set('session', token,{
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: expiresAt,
      path: '/'
    });
  }

interface Result {
    type: string;
    resultCode: ResultCode;
}

export async function authenticate(
    _prevState: Result | undefined,
    formData: any,
  ) {
  
    const email = formData.get('email')
    const password = formData.get('password')
    //console.log('formData', formData);
    try {
      const parsedCredentials = z
        .object({
          email: z.string().email(),
          password: z.string().min(4)
        })
        .safeParse({
          email,
          password
        })
        if (parsedCredentials.success) {
          const {user,token}: any = await checkUserEmailPassword(email, password);
          if (!user || !token) {
            return {
              type: 'error',
              resultCode: ResultCode.InvalidCredentials
          }
        }
          const data = {
            user,
            token
          }
          //console.log('data', data);
          const tokenNew = await createToken(data);
          console.log('tokenNew', tokenNew);
          if (!tokenNew) {
            return {
              type: 'error',
              resultCode: ResultCode.UnknownError
            }
          }
          await createSession(tokenNew);
    
          return {
            type: 'success',
            resultCode: ResultCode.UserLoggedIn
          }
        } else {
          return {
            type: 'error',
            resultCode: ResultCode.InvalidCredentials
          }
        }
    } catch (error) {
      console.error('Error:', error);
      return {
        type: 'error',
        resultCode: ResultCode.UnknownError
      }
    }
  }

  export async function logout() {
    const delKV = await deleteTokenKV();
    (await cookies()).delete('session') 
    redirect('/es/login')
  }