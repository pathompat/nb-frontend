<template>
    <html>
        <head>
            <title>Print Preview - Quotation {{ id }}</title>
        </head>
        <body>
            <div class="content">
                <h1>
                    ใบเสนอราคา #QT-{{
                        quotation?.id.toString().padStart(5, '0')
                    }}
                </h1>
                <v-row class="w-100">
                    <v-col cols="3" class="text-start">
                        <p>วันที่:</p>
                        <p>Job No.:</p>
                        <p>ร้านค้า:</p>
                        <p>โรงเรียน:</p>
                    </v-col>
                    <v-col cols="3" class="text-end">
                        <p>{{ quotation?.date }}</p>
                        <p>
                            PR-{{ new Date().getFullYear().toString() }}-{{
                                quotation?.id.toString().padStart(4, '0')
                            }}
                        </p>
                        <p>{{ quotation?.shop }}</p>
                        <p>{{ quotation?.school }}</p>
                    </v-col>
                    <v-col cols="3" class="text-end">
                        <p>ส่ง:</p>
                        <p>กำหนดชำระ:</p>
                    </v-col>
                    <v-col cols="3" class="text-end">
                        <p>{{ quotation?.estimateDate }}</p>
                        <p>{{ quotation?.dueDate }}</p>
                    </v-col>
                </v-row>
                <div class="w-100">
                    <h1>รายการสินค้า</h1>
                    <v-table>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>เพรท/แกรม/สี/แผ่น/เส้น</th>
                                <th>มีเเบบ</th>
                                <th>จำนวน</th>
                                <th>ราคา</th>
                                <th>รวม</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in quotation?.items"
                                :key="index"
                            >
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{
                                        plates.find(
                                            (p) => p.value === item.plate
                                        )?.title
                                    }}/{{ item.gram }}/{{ item.color }}/{{
                                        item.page
                                    }}/{{
                                        lines.find((l) => l.value === item.line)
                                            ?.title
                                    }}
                                </td>
                                <td>
                                    <v-checkbox
                                        :model-value="item.hasPlan"
                                        readonly
                                    />
                                </td>
                                <td>{{ item.amount }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.price * item.amount }}</td>
                            </tr>
                            <tr>
                                <td colspan="5" class="text-end">รวม</td>
                                <td>
                                    {{
                                        quotation?.items.reduce(
                                            (acc, item) =>
                                                acc + item.price * item.amount,
                                            0
                                        )
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
            </div>
        </body>
    </html>
</template>
<script setup lang="ts">
const { lines, plates } = useShare()
const route = useRoute()
const { id } = route.params
const { getQuotationById, quotation } = useQuotationStore()

definePageMeta({
    layout: false,
})
onMounted(async () => {
    await getQuotationById(+id)
    nextTick(() => {
        window.print()
    })
})
</script>

<style scoped>
@page {
    size: A4;
    margin: 0;
}

html,
body {
    margin: 0;
    padding: 0;
    background: white;
}

body {
    width: 210mm;
    min-height: 297mm;
    /* หรือใช้ px */
    /* width: 794px; */
    /* min-height: 1123px; */
}

.content {
    /* ระยะขอบมาตรฐาน */
    padding-top: 25.4mm; /* 1 นิ้ว */
    padding-bottom: 25.4mm; /* 1 นิ้ว */
    padding-left: 38.1mm; /* 1.5 นิ้ว */
    padding-right: 25.4mm; /* 1 นิ้ว */

    /* ตั้งค่าเพิ่มเติม */
    box-sizing: border-box;
    min-height: 297mm;
    position: relative;
}

@media print {
    html,
    body {
        width: 210mm;
        height: 297mm;
    }

    .content {
        padding-top: 25.4mm;
        padding-bottom: 25.4mm;
        padding-left: 38.1mm;
        padding-right: 25.4mm;
    }
}
</style>
