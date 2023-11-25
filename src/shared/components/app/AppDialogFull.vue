<script setup lang="ts">
interface Props {
  buttonColor?: string
  buttonTitle?: string
  icon?: string
}
withDefaults(defineProps<Props>(), {
  buttonColor: 'primary',
  buttonTitle: 'Open Dialog',
  icon: 'mdi-plus',
})

/* import { ref, watchEffect } from 'vue'
interface Props {
  dialog: boolean
}
const props = withDefaults(defineProps<Props>(), {
  dialog: false,
}) */

/* const dialog = ref(props.dialog)
watchEffect(() => {
  dialog.value = props.dialog
}) */

//const dialog = ref(false)
const dialog = defineModel<boolean>()
</script>

<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        class="text-none"
        :color="buttonColor"
        :prepend-icon="icon"
        v-bind="props"
      >
        {{ buttonTitle }}
      </v-btn>
    </template>
    <v-card>
      <v-toolbar
        class="mb-3"
        color="primary"
        density="compact"
      >
        <v-btn
          icon
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Novo Post</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="pa-2">
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
