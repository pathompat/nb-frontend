<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        permanent
      >
        <v-list :items="items">
          <v-list-item 
            v-for="item in items"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.value"
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar color="primary" flat>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const items = [
    {
      title: 'User manangement',
      value: '/user',
      icon: 'mdi-folder'
    },
    {
      title: 'Factory',
      value: '/factory',
      icon: 'mdi-account-multiple'
    },
    {
      title: 'Starred',
      value: '/starred',
      icon: 'mdi-star'
    },
  ]

  const drawer = ref(false)

</script>