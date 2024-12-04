import { LINE, PLATE, PRINTSTATUS } from '~/models/enum/enum'

export function useShare() {
    const statuses = ref([
        { title: 'ออกเเบบ', value: PRINTSTATUS.OUTBOUND },
        { title: 'พิมพ์', value: PRINTSTATUS.PRINT },
        { title: 'เย็บเข้าเล่ม', value: PRINTSTATUS.SEWING },
        { title: 'แพ็ค', value: PRINTSTATUS.PACK },
        { title: 'พร้อมจัดส่ง', value: PRINTSTATUS.READY },
    ])
    const statusColors = ref([
        { id: PRINTSTATUS.PRINT, color: '#FF9800' },
        { id: PRINTSTATUS.OUTBOUND, color: '#B0BEC5' },
        { id: PRINTSTATUS.SEWING, color: '#2196F3' },
        { id: PRINTSTATUS.PACK, color: '#9C27B0' },
        { id: PRINTSTATUS.READY, color: '#4CAF50' },
    ])
    const lines = ref([
        { title: 'เดี่ยว', value: LINE.SINGLE },
        { title: 'ครึ่ง', value: LINE.HALF },
    ])
    const plates = ref([
        { title: 'ใหญ่', value: PLATE.BIG },
        { title: 'เล็ก', value: PLATE.SMALL },
        { title: 'พิเศษ', value: PLATE.EXTRA },
    ])
    const getStatusTitle = computed(
        () => (value: number) =>
            statuses.value.find((status) => status.value === value)?.title ||
            'ไม่ทราบสถานะ'
    )
    const tiers = ref([1, 2, 3])
    return {
        statuses,
        tiers,
        statusColors,
        lines,
        plates,
        getStatusTitle,
    }
}
