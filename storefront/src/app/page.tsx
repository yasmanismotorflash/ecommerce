import Image from "next/image";
import { promises as fs } from 'fs';
import { Metadata } from 'next';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import MfMenuSheet from "@/components/mf/mf-menu-sheet";
import { Menubar,MenubarMenu,MenubarTrigger,MenubarContent,MenubarItem, MenubarShortcut } from "@/components/ui/menubar";

export async function generateMetadata(): Promise<Metadata> {
  const file = await fs.readFile(process.cwd() + '/src/app/params.json', 'utf8');
  const params = JSON.parse(file);
  return {
    title: params.page_title,
    description: params.description,
  };
}

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/params.json', 'utf8');
  const params = JSON.parse(file);

  console.log(params.menu)

  params.menu.map((item:any) => (
    console.log(item.submenu)
  ))

  return (
    <>
    <div className="flex items-center justify-between min-w-full min-h-14 " >
        <div className={`${params.show_menu!==false?`sm:hidden`:``} ml-2`}>
            <MfMenuSheet menu={params.menu} />
        </div>
        {params.company_name &&<div className="font-bold text-xl ml-2">
          {params.company_name}
        </div>}
        {params.show_menu===true&&
          <Menubar className={`hidden sm:flex`}>
            
              {
                params.menu.map((item:any) => (
                  item.url!==undefined?
                  <MenubarShortcut key={`${item.title}-${item.id}`}>
                    <Link href={item.url} className="block w-full text-sm">{item.title}</Link>
                  </MenubarShortcut>
                  :
                    <MenubarMenu>
                      <MenubarTrigger key={`${item.title}-${item.id}`}>{item.title}</MenubarTrigger>
                        <MenubarContent>
                          {item.submenu.map((item:any) => (
                            <MenubarItem key={`${item.title}-${item.id}`}>
                              <Link href={item.url} className="block w-full">{item.title}</Link>
                            </MenubarItem>
                          ))}
                        </MenubarContent>
                    </MenubarMenu>                    
                ))
              }
             
              
            
          </Menubar>
        }
        <div className="flex items-center mr-2">
          <Image
            src={`data:image/svg+xml;base64,${params.company_logo}`}
            alt="logo"            
            width={50}
            height={25}
            />
        </div>
        
    </div>
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen  p-8 sm:p-10  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2  sm:items-start px-4">
        {
          params.banner===true?
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {
                  params.banner_images.map((image:any)=>(
                    <CarouselItem key={image.id}>
                        <img  
                          src={image.url}
                          alt="Image"
                        />
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>:null
        }
        
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
    </>
  );
}
