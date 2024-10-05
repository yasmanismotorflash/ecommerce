import { createContext, useContext, useState } from 'react';

// Definir el tipo de valor del contexto
interface LanguageContextType {
    locale: string;
    setLocale: (locale: string) => void;
}

// Crear el contexto con valores predeterminados
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Proveedor del contexto
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocale] = useState('en');  // 'en' como valor predeterminado

    return (
        <LanguageContext.Provider value={{ locale, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook para usar el contexto
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
