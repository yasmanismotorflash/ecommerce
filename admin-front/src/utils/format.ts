import pluralize from "pluralize";

const cleanUpdateFields = (fields: any) => {
  const excludedFields = ["createdAt", "updatedAt"];
  return fields.filter(
    (column: { inList: boolean; name: string }) =>
      column.inList && !excludedFields.includes(String(name))
  );
};

export const toGraphQLObjectLiteral = (
  obj: Record<string, any>,
  constants: Set<string> = new Set()
): string => {
  if (Array.isArray(obj)) {
    // Procesar array
    return `[${obj
      .map((item) => toGraphQLObjectLiteral(item, constants))
      .filter(
        (it) => it !== undefined && it !== null && it !== "" && it !== "{}" // Filtrar objetos vacíos en forma de string
      )
      .join(",")}]`;
  }


  if (obj && typeof obj === "object") {
    //console.log('obj is an object');
    return `{${Object.keys(obj)
      .map((key) => {
        if (typeof obj[key] === 'boolean') {
          return `${key}:${obj[key]}`;
        }
        let value = isNaN(obj[key]) ? obj[key] : parseInt(obj[key]);
        
        if (["ASC", "DESC"].includes(value)) {
          return `${key}: ${value === "ASC" ? "ASC" : "DESC"}`;
        }
        if (Array.isArray(value)) {
          // console.log(`Value for key ${key} is an array`);
          return `${key}:${toGraphQLObjectLiteral(value, constants)}`;
        } else if (typeof value === "object") {
          //console.log(`Value for key ${key} is an object`);
          // Especial caso para "true" y "false" como cadenas
          if (value.eq === "true" || value.eq === "false") {
            return `${key}:{eq:${value.eq === "true"}}`;
          }
          // Caso especial para el manejo de Ids
          if (key === "dealerId" || key === "id_mf") {
            if (
              (key === "dealerId") === value.eq ||
              (key === "dealerId" && value.contains)
            ) {
              const isNaNcontains = isNaN(value.contains);
              const isNaNeq = isNaN(value.eq);
              if (value.contains && isNaNcontains) return;
              if (value.eq && isNaNeq) return;
            }
            return `${key}:{eq:${parseInt(value?.contains ?? value?.eq)}}`;
          }
          return `${key}:${toGraphQLObjectLiteral(value, constants)}`;
        } else if (typeof value === "boolean") {
          // Caso para manejar booleanos
          //console.log(`Value for key ${key} is a boolean`);
          return `${key}:${value}`;
        } else if (typeof value === "string" && !constants.has(key)) {
          return `${key}:"${value}"`;
        } else {
          return `${key}:${value}`;
        }
      })
      .join(",")}}`;
  }

  // Fallback si no es ni un array ni un objeto
  return JSON.stringify(obj);
};

export const toResourceCapitalized = (resource: string) => {
  return resource.charAt(0).toUpperCase() + resource.slice(1);
};
export const toResourceCapitalizedPlural = (resource: string) => {
  return toResourceCapitalized(resource) + "s";
};
export const toResourceSingular = (resource: string) => {
  return pluralize.singular(resource);
};
export const toResourceCapitalizedSingular = (resource: string) => {
  return pluralize.singular(toResourceCapitalized(resource));
};
export const cleanFields = (fields: any, source: string) => {
  let fieldsel = fields
    .filter(
      (column: { inList: boolean; name: string }) =>
        column.name !== "password" && column.name !== "confirm_password"
    )
    .map((column: { type: string; name: string }) => {
      if (
        column.type === "image" ||
        column.type === "gallery" ||
        column.type === "imageArray"
      ) {
        return `${column.name} {id src alt width height position}`;
      }
      if (
        column.type === "address" ||
        column.type === "addressArray" ||
        column.type === "addressWebArray"
      ) {
        return `${column.name} {street postcode city country region company is_company name phone tax_identification_number is_default is_billing is_shipping}`;
      }
      if (column.name === "customer") {
        return `${column.name} {id firstName}`;
      }
      if (column.name === "comments") {
        return `${column.name} {text}`;
      }
      if (column.name === "book") {
        return `${column.name} {id customerId status}`;
      }
      if (
        column.type === "selectModel" &&
        column.name !== "typeVehicle" &&
        column.name !== "statusBooking"
      ) {
        return `${column.name} {id name}`;
      }
      if (column.type === "carSerie") {
        return `${column.name} {
          Interior
          Exterior
          Confort
          Seguridad
        }`;
      }
      if (column.type === "carExtras") {
        return `${column.name} {
          pintura {
            Name
            PR
            Price
          }
          restoextras {
            Name
            PR
            Price
          }
          tapizado {
            Name
            PR
            Price
          }
        }`;
      }
      if (column.type === "nameValue" || column.type === "nameValueSlider") {
        return `${column.name} {name value}`;
      }
      if (column.name === "user" && source === "shops") {
        return `${column.name} { id id_mf name email city address }`;
      }

      if (
        (column.name === "dealer" && source === "users") ||
        column.name === "shop"
      ) {
        return `${column.name} { id id_mf name }`;
      }

      return column.name;
    });

  return fieldsel;
};
const additionalBooksFields = [
  `books {
    advertisementId
    customerId
    id
    orderNumber
    status
    updatedAt
    createdAt
    shippingType
    customer {
      address
      city
      createdAt
      customerId
      email
      firstName
      lastName
      name
      nif
      phone
      phonePrefix
      postalCode
      region
    }
  }`,
  `book {
    id
    status
    orderNumber
    createdAt
    updatedAt
    shippingType
    advertisementId
    customerId
    customer {
      customerId
      id
      id_mf
      name
      firstName
      lastName
      address
      city
      postalCode
      region
      email
      nif
      phonePrefix
      phone
      nameBilling
      firstNameBilling
      lastNameBilling
      addressBilling
      cityBilling
      postalCodeBilling
      regionBilling
      emailBilling
      phonePrefixBilling
      phoneBilling
    }
    orderCreated
    orderCreatedDetail {
      createdAt
      updatedAt
      comments {
        text
      }
    }
    purchaseAgreement
    purchaseAgreementDetail {
      createdAt
      updatedAt
      missingDocumentationForSalesContract
      unableToContactCustomer
      proformaInvoiceUrl
      purchaseAgreementUrl
      comments {
        text
      }
    }
    changeOwnership
    changeOwnershipDetail {
      createdAt
      updatedAt
      missingDocumentationForOwnershipChange
      comments {
        text
      }
    }
    vehicleInPreparation
    vehicleInPreparationDetail {
      createdAt
      updatedAt
      missingDocumentation
      temporaryCirculationPermitIssued
      vehicleDeliveryDateAgreed
      vehicleHasLeftForHomeDelivery
      temporaryCirculationPermitUrl
      comments {
        text
      }
    }
    delivered
    deliveredDetail {
      createdAt
      updatedAt
      deliveryReceiptUrl
      invoiceUrl
      comments {
        text
      }
    }
  }`,
];

const additionalBooksCustFields = [
  `books {
    advertisementId
    customerId
    id
    orderNumber
    status
    updatedAt
    createdAt
    shippingType
  }`,
  `book {
    id
    status
    orderNumber
    createdAt
    updatedAt
    shippingType
    advertisementId
    customerId
    orderCreated
    orderCreatedDetail {
      createdAt
      updatedAt
      comments {
        text
      }
    }
    purchaseAgreement
    purchaseAgreementDetail {
      createdAt
      updatedAt
      missingDocumentationForSalesContract
      unableToContactCustomer
      proformaInvoiceUrl
      purchaseAgreementUrl
      comments {
        text
      }
    }
    changeOwnership
    changeOwnershipDetail {
      createdAt
      updatedAt
      missingDocumentationForOwnershipChange
      comments {
        text
      }
    }
    vehicleInPreparation
    vehicleInPreparationDetail {
      createdAt
      updatedAt
      missingDocumentation
      temporaryCirculationPermitIssued
      vehicleDeliveryDateAgreed
      vehicleHasLeftForHomeDelivery
      temporaryCirculationPermitUrl
      comments {
        text
      }
    }
    delivered
    deliveredDetail {
      createdAt
      updatedAt
      deliveryReceiptUrl
      invoiceUrl
      comments {
        text
      }
    }
  }`,
];
