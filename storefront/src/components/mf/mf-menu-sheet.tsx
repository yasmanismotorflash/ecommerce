import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import Link from "next/link";

  interface Props{
    menu:any[];
  }

export default function MfMenuSheet(props:Props){
    const {menu} = props;
    return (
      <Sheet>
        <SheetTrigger asChild>
          <HamburgerMenuIcon className='size-7' />
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-fit">  
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          {
            menu.map((item:any) => (
              item.url!==undefined?
                <Link href={item.url} className="block w-full">{item.title}</Link>
              :
                <Accordion type="single" collapsible key={`${item.title}-${item.id}`}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent className="flex flex-col ">
                    {item.submenu.map((item:any) => (
                        <Link key={`${item.title}-${item.id}`} href={item.url} className="block w-full">{item.title}</Link>
                      ))
                    }
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>  
                
            ))
          }
          
        </SheetContent>
      </Sheet>
    )
}