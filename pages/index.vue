<template>
  <v-card>
    <template v-slot:title>
      <h3>Hello world</h3>
    </template>

    <v-card-text class="pt-4">
      <div v-if="!users || users.length === 0">No data</div>
      <div v-else>
        <div v-for="user in users" :key="user.id">
          {{ user.id }} {{ user.username }} {{ user.store }} {{ user.createdAt }} 
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  
  // ref
  const store = useUserStore();
  const { users } = storeToRefs(store);

  onMounted(() => {
    store.fetchUsers()
  })

</script>