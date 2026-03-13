<template>
  <div class="app-shell">
    <AppHeader :title="t('title')" />
    <div class="top-row">
      <LanguageSwitcher :model-value="language" @update:model-value="setLanguage" />
      <nav>
        <RouterLink to="/">{{ t('realtimeBoard') }}</RouterLink>
        <RouterLink to="/workorder">{{ t('workOrderManage') }}</RouterLink>
        <RouterLink to="/staff">{{ t('staffManage') }}</RouterLink>
        <RouterLink to="/fqc">{{ t('fqcManage') }}</RouterLink>
      </nav>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/common/AppHeader.vue';
import LanguageSwitcher from './components/common/LanguageSwitcher.vue';
import { useLanguage } from './composables/useLanguage';

const { language, setLanguage, t } = useLanguage();
</script>
