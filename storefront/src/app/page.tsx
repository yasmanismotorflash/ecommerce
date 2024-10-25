import Image from "next/image";
import { promises as fs } from 'fs';
import { Metadata } from 'next';
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
      {params.show_footer&&<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center w-full">
        
        <div className={`grid grid-cols-${params.footer[0].links.length} w-full `}>        
          {params.footer[0].links.map((link:any)=>(
            <div key={link.id}>
              <div className="font-semibold"  >{link.title}</div>
              {
                link.items.map((item:any)=>(
                  <Link key={item.id} href={item.url} className="block w-full text-gray-500">{item.title}</Link>
                ))
              }
            </div>
          ))}
        </div>
      </footer>}
    </div>
    </>
  );
}
