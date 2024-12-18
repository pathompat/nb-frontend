<template>
    <v-menu :close-on-content-click="false" v-model="dialogMenu">
        <template v-slot:activator="{ props }">
            <div class="d-flex justify-end">
                <v-btn color="primary" v-bind="props" variant="flat">
                    กรองข้อมูลเพิ่มเติม
                </v-btn>
            </div>
        </template>
        <v-card width="1000" :loading="loading">
            <v-card-title class="d-flex justify-space-between align-center">
                <div>กรองข้อมูลเพิ่มเติม</div>
                <div>
                    <v-btn
                        icon
                        variant="text"
                        @click="dialogMenu = false"
                        class="d-flex justify-center"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="d-flex justify-space-between">
                <v-container>
                    <v-row dense v-if="userProfile.role == SYSTEM_ROLE.ADMIN">
                        <v-col class="d-flex align-center">
                            <v-label>เพลท</v-label></v-col
                        >
                        <v-col cols="9" class="d-flex align-center">
                            <v-select
                                clearable
                                :loading="loading"
                                label="เลือกเพลท"
                                :items="plates"
                                v-model="filter.plate"
                            >
                            </v-select
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>ประเภท</v-label>
                        </v-col>
                        <v-col cols="9" class="d-flex align-center">
                            <v-autocomplete
                                clearable
                                :loading="loading"
                                :items="itemCategories"
                                label="เลือกประเภท"
                                v-model="filter.category"
                            ></v-autocomplete
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>แกรม</v-label></v-col
                        >
                        <v-col cols="9" class="d-flex align-center">
                            <v-autocomplete
                                clearable
                                :items="grams"
                                :loading="loading"
                                label="เลือกเเกรม"
                                v-model="filter.gram"
                            ></v-autocomplete
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>สี</v-label></v-col
                        >
                        <v-col cols="9" class="d-flex align-center">
                            <v-autocomplete
                                clearable
                                :loading="loading"
                                label="เลือกสี"
                                :items="colors"
                                v-model="filter.color"
                            >
                            </v-autocomplete
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>แผ่น</v-label></v-col
                        >
                        <v-col cols="9" class="d-flex align-center">
                            <v-autocomplete
                                clearable
                                :loading="loading"
                                label="เลือกแผ่น"
                                :items="pages"
                                v-model="filter.page"
                            >
                            </v-autocomplete
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>เส้น</v-label></v-col
                        >
                        <v-col cols="9" class="d-flex align-center">
                            <v-autocomplete
                                clearable
                                :loading="loading"
                                label="เลือกเส้น"
                                :items="lines"
                                v-model="filter.pattern"
                            >
                            </v-autocomplete
                        ></v-col>
                    </v-row>
                </v-container>
                <v-divider vertical></v-divider>
                <v-container>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>ประเภท</v-label></v-col
                        >
                        <v-col cols="9" class="d-flex align-center">
                            <v-select
                                clearable
                                :loading="loading"
                                label="เลือกประเภท"
                                :items="statuses"
                                v-model="filter.type"
                            >
                            </v-select
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>โรงเรียน</v-label>
                        </v-col>
                        <v-col cols="9" class="d-flex align-center">
                            <v-autocomplete
                                multiple
                                :loading="loading"
                                :items="schoolList"
                                label="เลือกโรงเรียน"
                                v-model="filter.school"
                            ></v-autocomplete
                        ></v-col>
                    </v-row>
                    <v-row dense v-if="userProfile.role == SYSTEM_ROLE.ADMIN">
                        <v-col class="d-flex align-center">
                            <v-label>ร้านค้า</v-label></v-col
                        >
                        <v-col cols="9" class="d-flex align-center">
                            <v-autocomplete
                                multiple
                                :items="storeList"
                                :loading="loading"
                                label="เลือกร้านค้า"
                                v-model="filter.store"
                            ></v-autocomplete
                        ></v-col>
                    </v-row>
                    <v-row dense>
                        <v-col class="d-flex align-center">
                            <v-label>สถานะ</v-label></v-col
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
                </v-container>
            </v-card-text>
        </v-card>
    </v-menu>
</template>
<script setup lang="ts">
import { filterMenuQuotationStateSymbol } from '~/components/quotation/filterMenu/state'
import { SYSTEM_ROLE } from '~/models/enum/enum'
const { storeList, schoolList, filter, dialogMenu, loading } = inject(
    filterMenuQuotationStateSymbol
)!
const {
    itemStatuses,
    statuses,
    plates,
    pages,
    grams,
    itemCategories,
    lines,
    colors,
} = useShare()
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)!
</script>
