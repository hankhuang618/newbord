<template>
  <div class="toolbar">
    <label for="erp-input">輸入工單</label>
    <input id="erp-input" type="text" :value="selectedERP" @input="$emit('update:selected-erp', $event.target.value)" @keydown.enter="$emit('query')" />
    <button type="button" :disabled="isButtonDisabled" @click="$emit('query')">查詢</button>
    <label><input type="radio" name="stickers" value="GEN" :checked="stickers === 'GEN'" @change="$emit('update:stickers', 'GEN')" />N/A</label>
    <label><input type="radio" name="stickers" value="TZ" :checked="stickers === 'TZ'" @change="$emit('update:stickers', 'TZ')" />貼紙班</label>
    <label><input type="radio" name="stickers" value="CD" :checked="stickers === 'CD'" @change="$emit('update:stickers', 'CD')" />裁剝班</label>
  </div>
</template>

<script setup>
defineProps({ selectedERP: String, stickers: String, isButtonDisabled: Boolean });
defineEmits(['query', 'update:selected-erp', 'update:stickers']);
</script>
