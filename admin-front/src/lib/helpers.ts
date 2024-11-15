"use server"

import { revalidatePath } from "next/cache"

export const havePermision = async (roles: any, types: any): Promise<boolean> => {
  if (!roles) {
    return false
  }
  for (var i = 0; i < roles.length; ++i) {
    if (types.includes(roles[i])) {
      return true
    }
  }

  return false
}

export async function findRolesByPath(menu: any, path: string) {
  let roles: string[] = [];
  // Comprueba si el último segmento es un slug
  const lastSegment = path.split('/').pop() ?? '';

  const isId = (lastSegment: string) => /^[a-f0-9]{24}$/.test(lastSegment);
  const segment = isId(lastSegment) ? path.replace(`/${lastSegment}`, '') : path;
  // Función recursiva para buscar en profundidad
  function search(menu: any) {
    for (const item of menu) {
      // Si el item coincide con el path, retornamos los roles
      if (item.url === segment && item.roles) {
        roles = item.roles;
        return;
      }
      // Si el item tiene hijos, buscamos recursivamente en ellos
      if (item.children && item.children.length > 0) {
        search(item.children);
      }
    }
  }
  search(menu);
  return roles;
}

export const revalidateCache = async (
  path: string,
  type: 'page' | 'layout' = 'page'
) => {
  return revalidatePath(path, type)
}