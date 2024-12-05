<template>
    <v-dialog v-model="dialogOpen" width="800">
        <v-card :loading="loading">
            <v-card-title>เพิ่มโรงเรียน</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form v-model="valid">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="initFormEdit.name"
                                label="ชื่อโรงเรียน"
                                :rules="emtpyRule"
                                :disabled="loading"
                                :hide-details="false"
                                :loading="loading"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="initFormEdit.address"
                                :disabled="loading"
                                :rules="emtpyRule"
                                :loading="loading"
                                :hide-details="false"
                                label="ที่อยู่จัดส่ง"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                :rules="phoneNumberRule"
                                v-model="initFormEdit.telephone"
                                :disabled="loading"
                                :loading="loading"
                                :hide-details="false"
                                label="เบอร์โทรติดต่อ"
                            ></v-text-field>
                        </v-col>
                    </v-row>
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
import { dialogSchoolStateSymbol } from './state'
const { emtpyRule, phoneNumberRule } = useRules()
const valid = ref(false)
const { action, dialogOpen, initFormEdit, loading } = inject(
    dialogSchoolStateSymbol
)!
</script>
