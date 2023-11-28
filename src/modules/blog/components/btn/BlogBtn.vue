<script setup lang="ts">
import { type BtnVariant, useDisplay } from 'vuetify'

interface Props {
  isPending?: boolean
  icon?: string | boolean
  color?: string
  variant?: BtnVariant
  text: string
}
withDefaults(defineProps<Props>(), {
  isPending: false,
  icon: false,
  color: 'primary',
  variant: 'outlined',
})

const emit = defineEmits<{
  handleClick: []
}>()

const { smAndDown } = useDisplay()

const handleClick = () => {
  emit('handleClick')
}
</script>

<template>
  <v-btn
    v-if="smAndDown"
    class="pa-0 ma-0"
    :color="color"
    density="compact"
    :icon="icon"
    :loading="isPending"
    variant="text"
    @click="handleClick"
  />
  <v-btn
    v-else
    class="text-none"
    :color="color"
    :loading="isPending"
    :prepend-icon="icon.toString()"
    :variant="variant"
    @click="handleClick"
  >
    {{ text }}
  </v-btn>
</template>
