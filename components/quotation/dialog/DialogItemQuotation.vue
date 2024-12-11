<template>
    <v-dialog v-model="dialogOpen" width="700" persistent>
        <v-card :loading="loading">
            <v-card-title class="d-flex align-center">
                <span>เพิ่มรายการใหม่</span>
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    variant="text"
                    @click="dialogOpen = false"
                    color="black"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form v-model="valid">
                    <v-container fulid>
                        <div class="mb-4">ข้อมูลพื้นฐาน</div>
                        <v-row dense>
                            <v-col
                                cols="3"
                                v-if="userProfile?.role == SYSTEM_ROLE.ADMIN"
                            >
                                <v-select
                                    :rules="emtpyRule"
                                    item-title="title"
                                    item-value="value"
                                    label="เพลท"
                                    :items="plates"
                                    :hide-details="false"
                                    v-model="quotationItem.plate"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    :rules="emtpyRule"
                                    label="แกรม"
                                    :items="grams"
                                    :hide-details="false"
                                    v-model="quotationItem.gram"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    :rules="emtpyRule"
                                    label="สี"
                                    :items="colors"
                                    :hide-details="false"
                                    v-model="quotationItem.color"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    :rules="emtpyRule"
                                    label="แผ่น"
                                    :items="pages"
                                    v-model="quotationItem.page"
                                    :hide-details="false"
                                ></v-select>
                            </v-col>

                            <v-col cols="3">
                                <v-select
                                    :items="itemCategories"
                                    item-text="title"
                                    item-value="value"
                                    label="ประเภท"
                                    :rules="emtpyRule"
                                    :hide-details="false"
                                    v-model="quotationItem.category"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    :rules="emtpyRule"
                                    :items="lines"
                                    label="เส้น"
                                    :hide-details="false"
                                    v-model="quotationItem.pattern"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <div class="my-4">ข้อมูลเพิ่มเติม</div>
                        <v-row dense>
                            <v-col cols="2">
                                <v-checkbox
                                    label="มีแบบ"
                                    v-model="quotationItem.hasReference"
                                ></v-checkbox>
                            </v-col>
                            <v-col cols="10">
                                <v-select
                                    multiple
                                    clearable
                                    :items="itemOptions"
                                    item-text="title"
                                    item-value="value"
                                    label="เพิ่มเติม"
                                    :hide-details="false"
                                    :model-value="
                                        quotationItem.options.split(',')
                                    "
                                    @update:model-value="
                                        quotationItem.options = $event
                                            .filter((x) => x != '')
                                            .join(',')
                                    "
                                ></v-select>
                            </v-col>
                        </v-row>
                        <div class="my-4">ข้อมูลค่าใช้จ่าย</div>
                        <v-row dense>
                            <v-col cols="6">
                                <v-text-field
                                    type="number"
                                    min="1"
                                    :rules="morethanZeroRule"
                                    label="จำนวน"
                                    :hide-details="false"
                                    v-model="quotationItem.quantity"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6"
                                ><v-text-field
                                    min="1"
                                    :hide-details="false"
                                    :rules="morethanZeroRule"
                                    type="number"
                                    :disabled="
                                        userProfile?.role !=
                                            SYSTEM_ROLE.ADMIN ||
                                        quotationItem.id != ''
                                    "
                                    label="ราคา"
                                    v-model="quotationItem.price"
                                ></v-text-field
                            ></v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions
                ><v-btn
                    :disabled="loading || !valid"
                    :loading="loading"
                    variant="flat"
                    @click="action"
                    >บันทึก</v-btn
                >
            </v-card-actions>
        </v-card></v-dialog
    >
</template>
<script lang="ts" setup>
import { SYSTEM_ROLE } from '~/models/object/object'
import { dialogItemQuotationStateSymbol } from './state'
const valid = ref(false)
const { userProfile } = useAuthStore()
const { emtpyRule, morethanZeroRule } = useRules()
const { plates, lines, grams, pages, colors, itemOptions, itemCategories } =
    useShare()

const { action, dialogOpen, quotationItem, loading } = inject(
    dialogItemQuotationStateSymbol
)!
</script>
