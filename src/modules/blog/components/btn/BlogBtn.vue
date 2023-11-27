<script setup lang="ts">
import { useDisplay } from 'vuetify'
import type { VBtn } from 'vuetify/lib/components/VBtn/index.mjs'

type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A
type ValidationRule = UnwrapReadonlyArray<InstanceType<typeof VBtn>['variant']>
interface Props {
  isPending?: boolean
  icon?: string | boolean
  color?: string
  variant?: ValidationRule
  text: string
}
const props = withDefaults(defineProps<Props>(), {
  isPending: false,
  icon: false,
  color: 'primary',
  variant: 'outlined',
})

const emit = defineEmits<{
  handleClick: []
}>()

const { smAndDown, smAndUp } = useDisplay()

const handleClick = () => {
  emit('handleClick')
}
</script>

<template>
  <v-btn
    v-if="smAndDown"
    :color="color"
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
