import { LoginForm } from "@/components/ui/forms";


export default function LoginPage() {
	return (
		<div className='flex  flex-col items-center justify-center h-full'>
			<div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
				
				<LoginForm />
			</div>
		</div>
	);
}