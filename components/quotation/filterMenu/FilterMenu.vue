<template>
    <v-menu :close-on-content-click="false" v-model="dialogMenu">
        <template v-slot:activator="{ props }">
            <div class="d-flex justify-end">
                <v-btn color="primary" v-bind="props" variant="flat">
                    กรองข้อมูลเพิ่มเติม
                </v-btn>
            </div>
        </template>
        <v-card width="500" :loading="loading">
            <v-card-title>กรองข้อมูลเพิ่มเติม</v-card-title>
            <v-card-text class="d-flex flex-column ga-4">
                <v-container>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>โรงเรียน</v-label>
                        </v-col>
                        <v-col cols="9" class="d-flex align-center">
                            <v-autocomplete
                                multiple
                                :loading="loading"
                                label="เลือกโรงเรียน"
                                :items="schools"
                                v-model="filter.school"
                            ></v-autocomplete
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>ร้านค้า</v-label></v-col
                        >
                        <v-col
                            cols="9"
                            class="d-flex align-center"
                            v-if="userProfile.role == SYSTEM_ROLE.ADMIN"
                        >
                            <v-autocomplete
                                multiple
                                :loading="loading"
                                label="เลือกร้านค้า"
                                v-model="filter.store"
                            ></v-autocomplete
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>เลือกสถานะ</v-label></v-col
                        >
                        <v-col cols="9" class="d-flex align-center">
                            <v-autocomplete
                                multiple
                                :loading="loading"
                                label="เลือกสถานะ"
                                :items="itemStatuses"
                                v-model="filter.status"
                            >
                            </v-autocomplete
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>เลือกประเภท</v-label></v-col
                        >
                        <v-col cols="9" class="d-flex align-center">
                            <v-select
                                :loading="loading"
                                label="เลือกประเภท"
                                :items="statuses"
                                v-model="filter.type"
                            >
                            </v-select
                        ></v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" :loading="loading" variant="plain"
                    >ล้างข้อมูล</v-btn
                >
                <v-btn
                    color="primary"
                    :loading="loading"
                    variant="flat"
                    @click="action"
                    >ค้นหา</v-btn
                >
            </v-card-actions> -->
        </v-card>
    </v-menu>
</template>
<script setup lang="ts">
import { filterMenuQuotationStateSymbol } from '~/components/quotation/filterMenu/state'
import { SYSTEM_ROLE } from '~/models/enum/enum'
const { action, filter, dialogMenu, loading } = inject(
    filterMenuQuotationStateSymbol
)!
const { itemStatuses, statuses } = useShare()
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)!
const schoolStore = useSchoolStore()
const { schools } = storeToRefs(schoolStore)
onMounted(async () => {
    loading.value = true
    await schoolStore.fetchAllSchoolsWithCustomer(userProfile.value!.id)
    loading.value = false
})
</script>
