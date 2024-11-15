import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumberToCurrency(number: number, decimals: number = 2) {
  const formattedNumber = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)
  return formattedNumber
}
export function formatNumber(number: number, decimals: number = 2) {
  const formattedNumber = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)
  return formattedNumber
}
export function formatPriceRange(range: number[], decimals: number = 2) {
  // Si solo hay un valor, formatea y devuelve ese valor
  if (range.length === 1) {
      return formatNumberToCurrency(range[0], decimals);
  }
  // Si hay dos valores, formatea ambos y devuélvelos con un guion entre ellos
  else if (range.length === 2) {
      return `${formatNumberToCurrency(range[0], decimals)} - ${formatNumberToCurrency(range[1], decimals)}`;
  }
  // Opcional: manejar otros casos, como arreglos vacíos o con más de dos elementos
  else {
      return '';
  }
}
export function formatValRange(range: number[], unit: string = '', decimals: number = 2) {
  // Si solo hay un valor, formatea y devuelve ese valor
  if (range.length === 1) {
      return formatNumber(range[0], decimals) + ' ' + unit;
  }
  // Si hay dos valores, formatea ambos y devuélvelos con un guion entre ellos
  else if (range.length === 2) {
      return `${formatNumber(range[0], decimals) + ' ' + unit} - ${formatNumber(range[1], decimals) + ' ' + unit}`;
  }
  // Opcional: manejar otros casos, como arreglos vacíos o con más de dos elementos
  else {
      return '';
  }
}
export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'es-ES',
) => {
  const date = new Date(dateStr);
  if (String(date) === "Invalid Date") return dateStr;
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateAndTimeToLocal = (
  dateStr: string,
  locale: string = 'es-ES',
) => {
  const date = new Date(dateStr);
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  if (date.toString() === 'Invalid Date') {
    return dateStr;
  }

  const dateFormatter = new Intl.DateTimeFormat(locale, dateOptions);
  const timeFormatter = new Intl.DateTimeFormat(locale, timeOptions);

  return `${dateFormatter.format(date)} ${timeFormatter.format(date)}`;
};

export const isPdf = (filename: string) => /\.pdf$/i.test(filename);
export const isImage = (filename: string) => /\.(jpeg|jpg|png)$/i.test(filename);
export const isText = (filename: string) => /\.txt$/i.test(filename);


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1); // Los meses en JavaScript van de 0 a 11
  return new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
}
export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN'
}
export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!'
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!'
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!'
    case ResultCode.UserCreated:
      return 'User created, welcome!'
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!'
    case ResultCode.UserLoggedIn:
      return 'Logged in!'
  }
}
export const processNestedFiles = async (obj: any) => {
  for (const key in obj) {
    if (obj[key] instanceof File) {
      obj[key] = await uploadFile(obj[key]);
    } else if (obj[key] && typeof obj[key] === "object") {
      await processNestedFiles(obj[key]); // Recursión para campos anidados
    }
  }
};
export const uploadFile = async (file: any) => {
  try {
    const formData = new FormData();
  formData.append("file", file);

  const uploadResponse = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  if (uploadResponse.ok) {
    const uploadResult = await uploadResponse.json();
    return uploadResult.url; // Retorna la URL del archivo subido
  } else {
    console.error("Error al subir archivo");
    //throw new Error("Error al subir archivo");
  }
  } catch (error) {
    console.error("Hubo un error en la consulta uploadFile:", error);
  }
  
};
export const getFile = async (file: string) => {
  try {
    

  const uploadResponse = await fetch("/api/getDoc?file="+file, {
    method: "GET"
  });
  //console.log("uploadResponse", uploadResponse);
  if (uploadResponse.ok) {
    const blob = await uploadResponse.blob();
      const objectURL = URL.createObjectURL(blob);
      return objectURL;
  } else {
    console.error("Error obtener archivo");
    //throw new Error("Error al subir archivo");
  }
  } catch (error) {
    console.error("Hubo un error en la consulta: ", error);
  }
  
};
export const getFile2 = async (file: any) => {
  try {
    const accountToken = process.env.KEY_FILES_CLOUD;
    // console.log("accountToken", accountToken);

  const uploadResponse = await fetch(file, {
    method: "GET",
    headers: {
      'X-Custom-Auth-Key': `${accountToken}`
    },
    mode: 'no-cors'
  });
  // console.log("uploadResponse", uploadResponse);
  if (uploadResponse.ok) {
    return uploadResponse; // Retorna la URL del archivo subido
  } else {
    console.error("Error obtener archivo");
    //throw new Error("Error al subir archivo");
  }
  } catch (error) {
    console.error("Hubo un error en la consulta: ", error);
  }
  
};