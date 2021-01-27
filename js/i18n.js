import i18n from 'i18next';
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';

import enJson from '../locales/en.json';
import jaJson from '../locales/ja.json';
/*
FOR DEVELOPERS

when making translation data with JSON files(i.e. en.json, ja.json),
don't use characters like "'", "." or ":" for index keys.
if you want to put periods or colons, try things like following:
{
  "Hello": "Hello."
}
*/
//window.searchParams = new URLSearchParams(location.search);
i18n
.use(detector)
.use(initReactI18next)
.init({
  resources: {
    en: { translation: enJson },
    ja: { translation: jaJson },
  },
  lng: 'en',
  //fallbackLng: 'en',
  returnEmptyString: false,
  keySeparator: false,
  react: {
    useSuspense: false
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }

})

//--only for testing
const window = globalThis
window.changeLang = (l) =>i18n.changeLanguage(l)
//
export default i18n;