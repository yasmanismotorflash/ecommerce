import React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { 
  ChevronUpIcon,
  PersonIcon, 
  FileTextIcon,
  Pencil2Icon, 
  ChevronDownIcon,
  ExitIcon
} from "@radix-ui/react-icons";
import MfAction from "./mf/MfAction/MfAction";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Usuario",
    url: "#",
    icon: PersonIcon,
  },
  {
    title: "Páginas",
    url: "#",
    icon: FileTextIcon,
    submenu: [
      {
        title: "Landing",
        url: "#",
        icon: FileTextIcon,
      },
      {
        title: "Blog",
        url: "#",
        icon: Pencil2Icon,
      },  
    ]
  },
]

export function AppSidebar() {
  return (
    <Sidebar className=" text-white font-bold">
      <SidebarHeader className="bg-gray-900 border-b-2">
        <SidebarMenu>
          <SidebarMenuItem className="text-xl text-center ">
            Admin Motorflash
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                  
                  item.submenu? 
                    <DropdownMenu key={item.title}>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="text-lg" >
                          <item.icon /> {item.title}
                          <ChevronDownIcon className="ml-auto" />
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="bottom"
                        className="w-[--radix-popper-anchor-width]"
                      >
                        {
                          item.submenu.map((subitem) => (
                            <DropdownMenuItem key = {subitem.title} >
                              <Link href={subitem.url} className="flex  items-center " >
                                <subitem.icon className="pr-2 size-6 font-bold" /> 
                                <span className="text-lg font-bold text-gray-700" >{subitem.title}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))
                        }
                        
                      </DropdownMenuContent>
                    </DropdownMenu>
                  :<SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild className="text-lg">
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-900">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <PersonIcon /> Usuario
                    <ChevronUpIcon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem >
                    <ExitIcon /> <MfAction title='Salir' action='signOut' />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
