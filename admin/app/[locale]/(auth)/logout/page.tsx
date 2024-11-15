'use client'
import { HiPower } from "react-icons/hi2";
import { Button } from "@/components/ui/shadcn/button";
import { logout } from "@/lib/actions";
import { useEffect } from "react";


export default  function LoginPage() {	
	useEffect(() => {
		logout()
	}, [])
		return (
		  <form action={logout}
		>
		  <Button
			type="submit"
			color="primary"
		  >
			<HiPower className="w-6 font-bold text-lg" /> Cerrar Sesión
		  </Button>
		</form>
		);
	  }