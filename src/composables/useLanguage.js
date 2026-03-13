import { computed, ref } from 'vue';
import zhTW from '../locales/zh-TW';
import enUS from '../locales/en-US';
import viVN from '../locales/vi-VN';

const language = ref('zh-TW');
const bundles = { 'zh-TW': zhTW, 'en-US': enUS, 'vi-VN': viVN };

export function useLanguage() {
  const t = (key) => bundles[language.value]?.[key] ?? key;
  return {
    language: computed(() => language.value),
    setLanguage: (v) => (language.value = v),
    t,
  };
}
