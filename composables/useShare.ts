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
    const grams = ref([40, 50, 55, 60, 70, 80, 120, 150])
    const colors = ref(['1', '1ก', '1ล', '1ส', '1อ', '4'])
    const pages = ref([30, 40, 50, 70, 80])
    const lines = ref([
        'บัญชี',
        'ผลงาน',
        'ตาราง',
        'กราฟเอียง',
        'การบ้าน',
        'ตาราง5ช่อง',
        'คัดจีน',
        'เดี่ยว',
        'ครึ่ง',
        '5 เส้น',
        'สมุดอังกฤษ',
        'วาดเขียนใหญ่',
        'วาดเขียนเล็ก',
        'คัดอังกฤษ',
        'เส้นพิเศษ',
        'สมุดไดอารี่',
        'โน๊ตเพลง',
        'รายงาน',
        'ตารางพิเศษ',
        'กราฟเล็ก',
        'คัดจีนเรา',
        'คัดอังกฤษช่องเล็ก',
        'คัดอังกฤษช่องใหญ่',
        'ครึ่งบรรทัดเว้นช่อง',
        'การอ่าน',
        'ลูกเสือ',
        'เขียนแบบ',
        'วาดเขียนแบบฉีก',
        'ไม่มีเส้น',
        'ตาราง8ช่อง',
        'สมุดฉีกไม่มีเส้น',
        'คู่',
    ])
    return {
        statuses,
        tiers,
        statusColors,
        lines,
        plates,
        getStatusTitle,
    }
}
