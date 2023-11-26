<script setup lang="ts"></script>
<template>
  <h1 class="text-center text-h3 mt-4">HOME PAGE</h1>
  <v-container class="d-flex flex-column justify-center fill-height">
    <div class="d-flex flex-wrap justify-center">
      <v-responsive
        :aspect-ratio="16 / 9"
        class="ma-1"
        max-width="250"
        min-width="250"
      >
        <v-card
          class="w-100 h-100"
          variant="outlined"
        >
          <v-card-title>Blog</v-card-title>
          <v-card-text>Blog sobre vário assuntos</v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              :to="{ name: 'BlogHome' }"
              variant="text"
              >Entrar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-responsive>
    </div>
  </v-container>
</template>
