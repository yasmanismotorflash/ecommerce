'use client';

import { authenticate } from '@/lib';

import {HiArrowRight, HiAtSymbol, HiExclamationCircle, HiKey, HiUser  } from 'react-icons/hi';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Button,
} from "@/components/ui/shadcn/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from 'react';
import { getMessageFromCode } from "@/lib";
import { useToast } from '@/components/ui/toast/use-toast';

export function LoginForm() {
  const router = useRouter();
  const [result, dispatch] = useActionState(authenticate, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        const errorMessage = getMessageFromCode(result.resultCode)
            toast({
              variant: "destructive",
              title: errorMessage,
              className: "text-center block",
            });
      } else {
        const errorMessage = getMessageFromCode(result.resultCode)
        toast({
          variant: "default",
          title: errorMessage,
          className: "text-center block",
        });
        router.refresh();
      }
    }
  }, [result, router]);
  return (
    <form action={dispatch} className="space-y-3 bg-background w-[320px] py-6 rounded-lg">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <div className="w-full">
          <div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="text"
                name="email"
                placeholder="Usuario"
                required
              />
              <HiUser  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Contraseña"
                required
                minLength={4}
              />
              <HiKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton />

      </div>
    </form>
  );
}
function LoginButton() {
  const { pending } = useFormStatus();
/*isDisabled={pending}  isLoading={pending} color="primary"*/
  return (
    <Button className="mt-12 w-full"  type="submit">
      Entrar <HiArrowRight className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
function LoginError({ code }: { code: string | undefined }) {
  const { data, pending } = useFormStatus();
  //console.log(data);
  if (!pending && code == 'CredentialsSignin')
  return (
    <div className="flex h-8 items-end space-x-1">
      <HiExclamationCircle className="h-5 w-5 text-red-500" />
      <p aria-live="polite" className="text-sm text-red-500">
        Email o contraseña incorrectos.
      </p>
    </div>
  );
}
