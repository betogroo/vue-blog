<script setup lang="ts">
import { ref } from 'vue'

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
        color="primary"
        v-bind="props"
      >
        Open Dialog
      </v-btn>
    </template>
    <v-card>
      <v-toolbar
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
        <v-toolbar-items>
          <v-btn
            variant="text"
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <slot />
    </v-card>
  </v-dialog>
</template>
