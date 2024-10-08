import { useTranslations } from "next-intl";

export default function UsersPage() {
    const t = useTranslations()

    return (
        <div>
         
            <h1>{t("HomePage.title")}</h1>
        </div>
    );
}
