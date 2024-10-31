import React /*, { useState, ReactNode, MouseEventHandler }*/ from 'react';
import { signOut, useSession } from 'next-auth/react';
/*import {
    ListBulletIcon,
    PlusCircledIcon,
    GearIcon,
    ChevronDownIcon,
    PersonIcon,
} from '@radix-ui/react-icons';
import Button from '../MfButton/MfButton';*/
import Image from 'next/image';

// Interfaces para las props de los componentes

/*export interface MfSidebarFooterProps {
    className?: string;
    text: string;
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
const MfSidebarFooter: React.FC<MfSidebarFooterProps> = ({
    className,
    text,
}) => {
    return (
        <div className={`py-4 text-center ${className}`}>
            <p className="text-gray-500 dark:text-gray-400">{text}</p>
        </div>
    );
};

// Componente para el título del sidebar
const MfSidebarTitle: React.FC<MfSidebarTitleProps> = ({
    title,
    className,
}) => {
    return <h2 className={`text-lg font-bold ${className}`}>{title}</h2>;
};

// Componente para el item del menú
const MfSidebarMenuItem: React.FC<MfSidebarMenuItemProps> = ({
    href,
    icon,
    children,
    className,
    onClick,
}) => {
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
const MfSidebarDropdown: React.FC<MfSidebarDropdownProps> = ({
    title,
    icon,
    children,
    className,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <li className="w-full">
            <Button
                className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700  ${className}`}
                onClick={toggleDropdown}
            >
                {icon}
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                    {title}
                </span>
                <ChevronDownIcon />
            </Button>

            <ul
                className={`py-2 space-y-2 ${isDropdownOpen ? 'block' : 'hidden'}`}
            >
                {children}
            </ul>
        </li>
    );
};

// Componente principal del sidebar
const MfSidebarContent: React.FC<MfSidebarContentProps> = ({ isOpen }) => {
    const handleCloseSession = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        await signOut({ callbackUrl: '/es/admin' });
    };

    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
            aria-label="MfSidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 w-full">
                <MfSidebarTitle title="Menu" />
                <ul className="space-y-2 font-medium w-full">
                    <MfSidebarDropdown
                        title="Formularios"
                        icon={<ListBulletIcon className="size-6" />}
                    >
                        <MfSidebarMenuItem
                            href="#"
                            icon={
                                <PlusCircledIcon className="text-green-700 size-4" />
                            }
                        >
                            Crear Formulario
                        </MfSidebarMenuItem>
                    </MfSidebarDropdown>

                    <MfSidebarMenuItem
                        href="#"
                        icon={<GearIcon className="size-6" />}
                    >
                        Settings
                    </MfSidebarMenuItem>

                    <MfSidebarDropdown
                        title="Cuenta"
                        icon={<PersonIcon className="size-6" />}
                    >
                        <MfSidebarMenuItem
                            href="#"
                            icon={
                                <PlusCircledIcon className="text-green-700 size-4" />
                            }
                            onClick={handleCloseSession}
                        >
                            Salir
                        </MfSidebarMenuItem>
                    </MfSidebarDropdown>
                </ul>
                <MfSidebarFooter
                    className="mt-auto"
                    text="© 2024 MotorFlash"
                />
            </div>
        </aside>
    );
};*/

// Componente principal del sidebar
const MfSidebar = () => {
    const { data: session, status } = useSession();
    /*const [isOpen, setIsOpen] = useState(false);

    const MftoggleSidebar = () => {
        setIsOpen(!isOpen);
    };*/

    if (status === 'authenticated') {
        console.log('SESSION', session);
    }

    const handleCloseSession = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        await signOut({ callbackUrl: '/es/admin' });
    };

    return (
        <>
            <aside className="bg-gradient-to-br from-gray-900 to-gray-700 -translate-x-80  inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
                <div className="relative border-b border-white/20">
                    <a className="flex items-center gap-4 py-6 px-8" href="#/">
                        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                            Admin Motorflash
                        </h6>
                    </a>
                    <button
                        className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                        type="button"
                    >
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="h-5 w-5 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </span>
                    </button>
                </div>
                {status === 'authenticated' ? (
                    <div className="p-2 relative border-b border-white/20 text-white">
                        <div className="text-sm md:text-base font-semibold">
                            Bienvenido
                        </div>
                        <div className="flex flex-row w-full">
                            <span>
                                <Image
                                    className="rounded-full w-8 h-8"
                                    src={
                                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=80&fit=crop&w=128&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                    }
                                    alt="profile"
                                    width={40}
                                    height={40}
                                />
                            </span>
                            <span className="pl-3 text-sm md:text-base font-semibold">
                                {session.user.name}
                            </span>
                        </div>
                    </div>
                ) : null}
                <div className="m-4">
                    <ul className="mb-4 flex flex-col gap-1">
                        <li>
                            <a aria-current="page" className="active" href="#">
                                <button
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="w-5 h-5 text-inherit"
                                    >
                                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                                    </svg>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        dashboard
                                    </p>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a className="" href="#">
                                <button
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="w-5 h-5 text-inherit"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        usuarios
                                    </p>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a className="" href="#">
                                <button
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="w-5 h-5 text-inherit"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        páginas
                                    </p>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a className="" href="#">
                                <button
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                >
                                    <svg
                                        className="w-5 h-5 text-inherit"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="#ffffff"
                                    >
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                        />

                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />

                                        <g id="SVGRepo_iconCarrier">
                                            {' '}
                                            <path
                                                d="M18.763 13.7944L20.029 16.0222C19.8786 16.3163 19.7105 16.6051 19.5244 16.8873C19.3383 17.1695 19.1391 17.4378 18.9281 17.6919L16.4377 17.4142C15.7715 17.9608 15.0027 18.3869 14.1645 18.6592L13.0002 20.945C12.6719 20.9813 12.3382 21 12.0002 21C11.6622 21 11.3285 20.9813 11.0002 20.945L9.83293 18.6582C8.99428 18.3854 8.22514 17.9585 7.5589 17.4111L5.05407 17.6915C4.84303 17.4374 4.64381 17.1691 4.45774 16.8869C4.27168 16.6047 4.10356 16.3159 3.95312 16.0218L5.22637 13.7814C5.07803 13.2142 5.00021 12.6139 5.00021 12.0002C5.00021 11.3749 5.08219 10.7688 5.23599 10.192L3.95351 7.936C4.10394 7.64191 4.27206 7.3531 4.45812 7.07091C4.64419 6.78873 4.84341 6.52043 5.05445 6.2663L7.60942 6.55327C8.26776 6.02075 9.01625 5.60683 9.84 5.33984M9.83614 5.33996L11 3.05493C11.3283 3.01863 11.662 3 12 3C12.338 3 12.6716 3.01863 13 3.05493L14.1638 5.33996C14.9882 5.60716 15.7389 6.01764 16.3976 6.55077L18.9275 6.26661C19.1385 6.52074 19.3377 6.78904 19.5238 7.07123C19.7098 7.35341 19.878 7.64223 20.0284 7.93632L18.7592 10.1697M18.7594 10.1732C18.9164 10.7556 19.0002 11.3681 19.0002 12.0002C19.0002 12.6215 18.9193 13.2239 18.7673 13.7974M15.0002 12.0002C15.0002 13.657 13.6571 15.0002 12.0002 15.0002C10.3433 15.0002 9.0002 13.657 9.0002 12.0002C9.0002 10.3433 10.3433 9.00015 12.0002 9.00015C13.6571 9.00015 15.0002 10.3433 15.0002 12.0002Z"
                                                stroke="#ffffff"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />{' '}
                                        </g>
                                    </svg>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        ajustes
                                    </p>
                                </button>
                            </a>
                        </li>
                    </ul>
                    <ul className="mb-4 flex flex-col gap-1">
                        <li className="mx-3.5 mt-4 mb-2">
                            <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
                                usuario
                            </p>
                        </li>
                        <li>
                            <a className="" href="#">
                                <button
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                    onClick={handleCloseSession}
                                >
                                    <svg
                                        viewBox="0 -0.5 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="#ffffff"
                                        className="w-5 h-5 text-inherit"
                                    >
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                        />

                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />

                                        <g id="SVGRepo_iconCarrier">
                                            {' '}
                                            <path
                                                d="M7.04401 9.53165C7.33763 9.23949 7.33881 8.76462 7.04665 8.47099C6.75449 8.17737 6.27962 8.17619 5.98599 8.46835L7.04401 9.53165ZM2.97099 11.4683C2.67737 11.7605 2.67619 12.2354 2.96835 12.529C3.26051 12.8226 3.73538 12.8238 4.02901 12.5317L2.97099 11.4683ZM4.02901 11.4683C3.73538 11.1762 3.26051 11.1774 2.96835 11.471C2.67619 11.7646 2.67737 12.2395 2.97099 12.5317L4.02901 11.4683ZM5.98599 15.5317C6.27962 15.8238 6.75449 15.8226 7.04665 15.529C7.33881 15.2354 7.33763 14.7605 7.04401 14.4683L5.98599 15.5317ZM3.5 11.25C3.08579 11.25 2.75 11.5858 2.75 12C2.75 12.4142 3.08579 12.75 3.5 12.75V11.25ZM17.5 12.75C17.9142 12.75 18.25 12.4142 18.25 12C18.25 11.5858 17.9142 11.25 17.5 11.25V12.75ZM5.98599 8.46835L2.97099 11.4683L4.02901 12.5317L7.04401 9.53165L5.98599 8.46835ZM2.97099 12.5317L5.98599 15.5317L7.04401 14.4683L4.02901 11.4683L2.97099 12.5317ZM3.5 12.75L17.5 12.75V11.25L3.5 11.25V12.75Z"
                                                fill="#ffffff"
                                            />{' '}
                                            <path
                                                d="M9.5 15C9.5 17.2091 11.2909 19 13.5 19H17.5C19.7091 19 21.5 17.2091 21.5 15V9C21.5 6.79086 19.7091 5 17.5 5H13.5C11.2909 5 9.5 6.79086 9.5 9"
                                                stroke="#ffffff"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />{' '}
                                        </g>
                                    </svg>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        Salir
                                    </p>
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default MfSidebar;
