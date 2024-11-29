<template>
  <html>
    <head>
      <title>Print Preview - Quotation {{ id }}</title>
    </head>
    <body>
      <div class="content">test document</div>
    </body>
  </html>
</template>

<style>
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

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;

definePageMeta({
  layout: false,
});

onMounted(() => {
  // รอให้ render เสร็จก่อนสั่งพิมพ์
  nextTick(() => {
    window.print();
  });
});
</script>
