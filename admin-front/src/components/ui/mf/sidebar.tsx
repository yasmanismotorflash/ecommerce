import React, { useState, ReactNode, MouseEventHandler } from 'react';
import { signOut } from 'next-auth/react';
import { HamburgerMenuIcon, ListBulletIcon, PlusCircledIcon, GearIcon, ChevronDownIcon, PersonIcon } from '@radix-ui/react-icons';
import Button from './button';


// Interfaces para las props de los componentes


export interface MfSidebarFooterProps {
    className?: string;
    text: string
}

export interface MfSidebarTitleProps {
    title: string;
    className?: string;
}

export interface MfSidebarMenuItemProps {
    href: string;
    icon: JSX.Element;
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLLIElement> | undefined;
}

export interface MfSidebarDropdownProps {
    title: string;
    icon: JSX.Element;
    children: ReactNode;
    className?: string;
}

export interface MfSidebarContentProps {
    isOpen: boolean;
}

// Componente para el pie de página
const MfSidebarFooter: React.FC<MfSidebarFooterProps> = ({ className, text }) => {
    return (
        <div className={`py-4 text-center ${className}`}>
            <p className="text-gray-500 dark:text-gray-400">{text}</p>
        </div>
    );
};

// Componente para el título del sidebar
const MfSidebarTitle: React.FC<MfSidebarTitleProps> = ({ title, className }) => {
    return (
        <h2 className={`text-lg font-bold ${className}`}>
            {title}
        </h2>
    );
};

// Componente para el item del menú
const MfSidebarMenuItem: React.FC<MfSidebarMenuItemProps> = ({ href, icon, children, className, onClick }) => {
    return (
        <>
            
                <li onClick={onClick}>
                    <a
                        href={href}
                        className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${className}`}
                    >
                        {icon}
                        <span className="ms-3">{children}</span>
                    </a>
                </li>
        </>
    );
};

// Componente para el menú desplegable
const MfSidebarDropdown: React.FC<MfSidebarDropdownProps> = ({ title, icon, children, className }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <li className='w-full'>
            <Button
                className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700  ${className}`}
                onClick={toggleDropdown}
            >
                {icon}
                <span className="flex-1 ms-3 text-left whitespace-nowrap">{title}</span>
                <ChevronDownIcon />
            </Button>

            <ul className={`py-2 space-y-2 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                {children}
            </ul>
        </li>
    );
};

// Componente principal del sidebar
const MfSidebarContent: React.FC<MfSidebarContentProps> = ({ isOpen }) => {
    
    const handleCloseSession =async (event: React.MouseEvent<HTMLElement>)=>{
        event.preventDefault();
        await signOut({ callbackUrl: '/es/admin' });        
    }

    return (
        <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="MfSidebar"
        >   
        
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 w-full">
                <MfSidebarTitle title="Menu" />
                <ul className="space-y-2 font-medium w-full">
                    <MfSidebarDropdown title="Formularios" icon={
                        <ListBulletIcon className='size-6' />
                    }>
                        <MfSidebarMenuItem href="#" icon={
                            <PlusCircledIcon className='text-green-700 size-4' />
                        } >Crear Formulario</MfSidebarMenuItem>

                    </MfSidebarDropdown>

                    <MfSidebarMenuItem href="#" icon={
                        <GearIcon className='size-6' />
                    } >Settings</MfSidebarMenuItem>

                    <MfSidebarDropdown title="Cuenta" icon={
                        <PersonIcon className='size-6' />
                    }>
                        <MfSidebarMenuItem 
                            href="#" 
                            icon={
                                <PlusCircledIcon className='text-green-700 size-4' />
                            }
                            onClick={handleCloseSession}  
                        >Salir</MfSidebarMenuItem>
                    </MfSidebarDropdown>

                </ul>
                <MfSidebarFooter className="mt-auto" text='© 2024 MotorFlash' />
            </div>
        </aside>
    );
};

// Componente principal del sidebar
const MfSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const MftoggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Button
                className="fixed top-2 left-2 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={MftoggleSidebar}
                aria-controls="sidebar-multi-level-sidebar"
                aria-expanded={isOpen}
            >
                <HamburgerMenuIcon />
                <span className="sr-only">Open sidebar</span>
            </Button>
           
            <MfSidebarContent isOpen={isOpen} /> 
        </>
    );
};

export default MfSidebar;
