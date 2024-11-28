<template>
  <main>
    <div class="d-flex justify-space-between mx-8">
      <h1>แบบฟอร์มสั่งผลิต #{{ production?.id }}</h1>
      <div class="d-flex ga-2">
        <v-btn variant="flat" color="success">ใบเสนอราคา</v-btn>
        <v-btn variant="flat" color="purple">เอกสารสั่งผลิต</v-btn>
      </div>
    </div>
    <section class="pa-8">
      <v-card :loading="loading">
        <v-card-text
          ><v-layout class="pt-4"
            ><v-row>
              <v-col cols="4">
                <v-text-field
                  label="User"
                  disabled
                  v-model="production.id"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="ร้าน *"
                  disabled
                  v-model="production.shop"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  label="โรงเรียน *"
                  disabled
                  v-model="production.school"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-date-input disabled label="Select a date"></v-date-input>
              </v-col>
              <v-col cols="3">
                <v-date-input disabled label="Select a date"></v-date-input
              ></v-col>
              <v-col cols="3">
                <v-select
                  label="ที่อยู่ *"
                  disabled
                  v-model="production.address"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  label="ที่อยู่ *"
                  disabled
                  v-model="production.phone"
                ></v-select>
              </v-col> </v-row
          ></v-layout>
          <div class="mt-4">
            <div class="d-flex justify-space-between align-center">
              <h2>รายการสินค้า</h2>
              <v-btn variant="text" icon color="primary">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-data-table
              class="my-4"
              hideDefaultFooter
              :items="production.items"
              :headers="[
                { title: 'ลำดับ', key: 'id' },
                { title: 'เพลท', key: 'plate' },
                { title: 'แกรม', key: 'gram' },
                { title: 'สี', key: 'color' },
                { title: 'แผ่น', key: 'page' },
                { title: 'เส้น', key: 'line' },
                { title: 'มีแบบ', key: 'hasPlan' },
                { title: 'จำนวน', key: 'amount' },
                { title: 'สถานะ', key: 'status' },
                { title: 'อัพเดท', key: 'action' },
              ]"
            >
              <template #item.id="{ index }"> {{ index + 1 }} </template>
              <template #item.hasPlan="{ item }">
                <v-checkbox v-model="item.hasPlan"></v-checkbox>
              </template>
              <template #item.plate="{ item }">
                {{ plates.find((p) => p.value === item.plate)?.title }}
              </template>
              <template #item.line="{ item }">
                {{ lines.find((l) => l.value === item.line)?.title }}
              </template>
              <template #item.status="{ item }">
                <v-chip
                  density="compact"
                  class="text-white"
                  :style="{
                    backgroundColor:
                      statusColors.find((s) => s.id === item.status)?.color ||
                      'gray',
                  }"
                >
                  {{ getStatusTitle(item.status) }}
                </v-chip></template
              >
              <template #item.action="{ item }">
                <v-btn
                  size="small"
                  variant="flat"
                  :color="
                    statusColors.find((s) => s.id === item.status + 1)?.color ||
                    'gray'
                  "
                >
                  {{ getStatusTitle(item.status + 1) }}
                </v-btn>
              </template>
            </v-data-table>
            <v-textarea
              label="หมายเหตุ"
              v-model="production.remark"
            ></v-textarea>
          </div>
        </v-card-text>
      </v-card>
    </section>
  </main>
</template>
<script setup lang="ts">
import useProductionApi, {
  getStatusTitle,
  lines,
  plates,
  PRINTSTATUS,
  statusColors,
  type Production,
} from "@/composables/api/useProductionApi";
const productApi = useProductionApi();

const loading = ref(false);
const production = ref<Production>({
  id: 0,
  name: "",
  date: "",
  school: "",
  shop: "",
  phone: "",
  address: "",
  dueDate: "",
  estimateDate: "",
  items: [],
});
onMounted(async () => {
  loading.value = true;
  try {
    production.value = await productApi.getOne(props.id);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
const props = defineProps<{
  id: number;
}>();
</script>
