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
                        {{ profile?.username }}
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
                    v-for="item in ItemByRole"
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
import useAuth from '@/composables/useAuth'
import { contextPluginSymbol, type PluginInstance } from '@/plugins/context'
import type { MenuItem } from '~/models/share/share'
// const { refresh } = inject<PluginInstance>(contextPluginSymbol)!
const { profile } = useProfileStore()
const auth = useAuth()
const drawer = ref(true)

const logout = () => {
    auth.logout()
}
const ItemByRole = computed(() => {
    return items.value.filter((i) => i.role.some((r) => r === profile?.role))
})
const items = ref<MenuItem[]>([
    {
        title: 'รายการสั่งผลิต',
        value: '/',
        icon: 'mdi-folder',
        role: ['admin', 'customer'],
    },
    {
        title: 'จัดการ User',
        value: '/user',
        icon: 'mdi-account-multiple',
        role: ['admin'],
    },
])
onMounted(async () => {
    // await refresh()
})
</script>
