<template>
  <div class="border h-100 w-100">
    <main ref="canvas" style="margin: 30px 20px 20px 35px">document test</main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;
const canvas = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!canvas.value) {
    console.error("Canvas element not found");
    return;
  }

  nextTick(() => {
    const features = [
      "left=20",
      "top=20",
      "width=1000",
      "height=1400",
      "toolbar=yes",
      "menubar=yes",
      "scrollbars=no",
      "resizable=no",
      "location=no",
      "status=no",
    ].join(",");

    const WinPrint = window.open("", "Print Preview", features);
    try {
      if (!WinPrint) {
        alert("โปรดอนุญาตให้เปิดหน้าต่างป๊อปอัพ");
        return;
      }

      WinPrint.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print Preview - Quotation ${id}</title>
            <style>
              @page {
                size: A4;
                margin: 0;
              }
              body { 
                margin: 0;
                padding: 0;
              }
             
              @media print {
                .content {
                  padding: 96px 120px;
                }
              }
            </style>
          </head>
          <body style="${canvas.value?.style.cssText}">
           ${canvas.value!.innerHTML}
          </body>
        </html>
      `);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
    } catch (error) {
      console.error("Error opening print window:", error);
      alert("เกิดข้อผิดพลาดในการเปิดหน้าต่างพิมพ์");
    } finally {
      WinPrint?.close();
    }
  });
});
</script>
