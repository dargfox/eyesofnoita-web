<template>
  <button class="button" :type="type" @click="(event) => !disabled && emit('click', event)" :disabled="disabled">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
interface IProps {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
interface IEmit {
  (e: "click", event: PointerEvent): void,
}

defineProps<IProps>();
const emit = defineEmits<IEmit>();
</script>
<style lang="scss" scoped>
.button {
  background: var(--container-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  outline: none;
  cursor: pointer;
  font-weight: 600;
}
</style>
