<template>
  <v-card>
    <template v-slot:title>
      <h3>Hello world</h3>
    </template>

    <v-card-text class="pt-4">
      <div v-if="!users || users.length === 0">No data</div>
      <div v-else>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Username
              </th>
              <th class="text-left">
                Store
              </th>
              <th class="text-left">
                Created Date
              </th>
              <th class="text-left">
                Updated Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
            >
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.store }}</td>
              <td>{{ useFormatDate(user.createdAt) }}</td>
              <td>{{ useFormatDate(user.updatedAt) }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user';
  
  // ref
  const store = useUserStore();
  const { users } = storeToRefs(store);

  onMounted(() => {
    store.fetchUsers()
  })

</script>