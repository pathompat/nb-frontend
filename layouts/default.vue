<template>
  <v-layout class="h-100">
    <v-app-bar color="primary" prominent>
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          color="white"
          variant="text"
          @click.stop="drawer = !drawer"
        >
        </v-app-bar-nav-icon>
      </template>
      <!-- <v-app-bar-nav-icon variant="text" icon="mdi-menu"></v-app-bar-nav-icon> -->

      <v-toolbar-title>ระบบ Typography</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            class="text-black bg-white mr-6"
            size="small"
          >
            {{ userProfile?.username }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>ออกจากระบบ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer :model-value="drawer">
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="item.title"
          :to="item.value"
          :exact="item.value === '/'"
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>

          <v-list-item-title>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-5">
      <router-view />
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { TIER } from "@/composables/api/useUserApi";
import useAuth from "@/composables/useAuth";
import { contextPluginSymbol, type PluginInstance } from "@/plugins/context";
const { userProfile, refresh } = inject<PluginInstance>(contextPluginSymbol)!;
const auth = useAuth();
const drawer = ref(true);
interface MenuItem {
  title: string;
  value: string;
  icon: string;
  tier?: TIER;
}
const logout = () => {
  auth.logout();
};
const items = ref<MenuItem[]>([
  {
    title: "รายการสั่งผลิต",
    value: "/",
    icon: "mdi-folder",
  },
  {
    title: "แดชบอร์ด",
    value: "/dashboard",
    icon: "mdi-collage",
  },
  {
    title: "จัดการ User",
    value: "/user",
    icon: "mdi-account-multiple",
    tier: TIER.ADMIN,
  },
  {
    title: "จัดการโรงเรียน",
    value: "/school",
    icon: "mdi-school",
    tier: TIER.ADMIN,
  },
  {
    title: "ใบเสนอราคา",
    value: "/quotation",
    icon: "mdi-invoice",
    tier: TIER.ADMIN,
  },
]);
onMounted(async () => {
  await refresh();
});
</script>
