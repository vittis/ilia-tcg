import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLang from "./locales/en/en.json";
import ptLang from "./locales/pt/pt.json";

const resources = {
	en: {
		translation: enLang,
	},
	pt: {
		translation: ptLang,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
