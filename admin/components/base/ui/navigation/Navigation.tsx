import {LocaleSwitcher} from '@/components';

export function Navigation() {
  //const t = useTranslations('Navigation');

  return (
    <div className="bg-slate-850">
      <nav className="container flex justify-between p-2 text-white">
        <div>

        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
