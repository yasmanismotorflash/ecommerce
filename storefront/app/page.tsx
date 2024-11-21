import { redirect } from "next/navigation";
import { cookies } from "next/headers";



export default async function HomePage() {
  const cookieStore = cookies();
  const preferredLanguage = (await cookieStore).get("preferred-language")?.value || "es";
  redirect(`/${preferredLanguage}`);

}