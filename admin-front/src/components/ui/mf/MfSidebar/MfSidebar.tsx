import React /*, { useState, ReactNode, MouseEventHandler }*/ from 'react';

import {
    IoBarChart,
    IoCog,
    IoCreate,
    IoDocument,
    IoDocuments,
    IoPersonCircle,
} from 'react-icons/io5';
import MfSidebarUserTag from './MfSidebarUserTag';
import MfSidebarButton from './MfSidebarButton';
import MfSidebarUserMenu from './MfSidebarUserMenu';
import MfSidebarDropdown from './MfSidebarDropDown';
/*import {
    ListBulletIcon,
    PlusCircledIcon,
    GearIcon,
    ChevronDownIcon,
    PersonIcon,
} from '@radix-ui/react-icons';
import Button from '../MfButton/MfButton';*/

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
export function MfSidebar() {
    /*const [isOpen, setIsOpen] = useState(false);

    const MftoggleSidebar = () => {
        setIsOpen(!isOpen);
    };*/

    return (
        <>
            <aside className="h-full bg-gradient-to-br from-gray-900 to-gray-700 -translate-x-80  inset-0 z-50 my-4 ml-4 mr-4  w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
                <div className="relative border-b border-white/20">
                    <a className="flex items-center gap-4 py-6 px-8" href="#">
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
                <MfSidebarUserTag />
                <div className="m-4">
                    <ul className="mb-4 flex flex-col gap-1">
                        <li>
                            <MfSidebarButton
                                url={'admin'}
                                title={'Dashboard'}
                                icon={<IoBarChart size={24} />}
                            />
                        </li>
                        <li>
                            <MfSidebarButton
                                url={'admin/users'}
                                title={'Usuarios'}
                                icon={<IoPersonCircle size={24} />}
                            />
                        </li>
                        <MfSidebarDropdown
                            title={'Páginas'}
                            icon={<IoDocuments size={24} />}
                        >
                            <ul>
                                <li>
                                    <MfSidebarButton
                                        url={'#'}
                                        title={'Landing'}
                                        icon={<IoDocument size={24} />}
                                    />
                                </li>
                                <li>
                                    <MfSidebarButton
                                        url={'#'}
                                        title={'Blogs'}
                                        icon={<IoCreate size={24} />}
                                    />
                                </li>
                            </ul>
                        </MfSidebarDropdown>
                        <li>
                            <MfSidebarButton
                                url={'#'}
                                title={'Ajustes'}
                                icon={<IoCog size={24} />}
                            />
                        </li>
                    </ul>
                    <MfSidebarUserMenu />
                </div>
            </aside>
        </>
    );
}
