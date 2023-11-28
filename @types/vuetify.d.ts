import type { VBtn } from 'vuetify/lib/components/VBtn/index.mjs'

declare module 'vuetify' {
  type BtnVariant = InstanceType<typeof VBtn>['variant']
  type BtnDensity = InstanceType<typeof VBtn>['density']
}
