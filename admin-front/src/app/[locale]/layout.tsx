// LocaleLayout.tsx (Componente Principal)
import LocaleLayoutServer from './LocaleLayoutServer';
import LocaleLayoutClient from './LocaleLayoutClient';
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default async function LocaleLayout({ 
  children, 
  params: { locale } 
}: { 
  children: React.ReactNode; 
  params: { locale: string } 
}) {
  const messages = await LocaleLayoutServer({ params: { locale } }); 

  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger />
        <LocaleLayoutClient messages={messages} locale={locale}>
          {children}
        </LocaleLayoutClient>
    </SidebarProvider>  
  ); 
}
