export function useShare() {
    const STATUS = {
        REVIEWED: 'REVIEWED',
        APPROVED: 'APPROVED',
        CANCELED: 'CANCELED',
        OUTBOUND: 'OUTBOUND',
        PRINT: 'PRINT',
        SEWING: 'SEWING',
        PACK: 'PACK',
        READY: 'READY',
    }
    const statuses = ref([
        { title: 'รออนุมัติ', value: STATUS.REVIEWED },
        { title: 'อนุมัติแล้ว', value: STATUS.APPROVED },
        { title: 'ยกเลิก', value: STATUS.CANCELED },

        { title: 'ออกเเบบ', value: STATUS.OUTBOUND },
        { title: 'พิมพ์', value: STATUS.PRINT },
        { title: 'เย็บเข้าเล่ม', value: STATUS.SEWING },
        { title: 'แพ็ค', value: STATUS.PACK },
        { title: 'พร้อมจัดส่ง', value: STATUS.READY },
    ])
    const statusColors = ref([
        { id: STATUS.REVIEWED, color: '#FF9800' },
        { id: STATUS.APPROVED, color: '#00b300' },
        { id: STATUS.CANCELED, color: '#b30000' },

        { id: STATUS.PRINT, color: '#FF9800' },
        { id: STATUS.OUTBOUND, color: '#B0BEC5' },
        { id: STATUS.SEWING, color: '#2196F3' },
        { id: STATUS.PACK, color: '#9C27B0' },
        { id: STATUS.READY, color: '#4CAF50' },
    ])
    const quotationStatuses = ref([
        {
            title: 'รออนุมัติ',
            value: 'REVIEWED',
        },
        {
            title: 'อนุมัติ',
            value: 'APPROVED',
        },
        {
            title: 'ยกเลิก',
            value: 'CANCELED',
        },
    ])
    const plates = ref([
        { title: 'เล็ก', value: 'SMALL' },
        { title: 'ใหญ่', value: 'LARGE' },
    ])
    const getStatusTitle = computed(
        () => (value: string) =>
            statuses.value.find((status) => status.value === value)?.title ||
            'ไม่ทราบสถานะ'
    )
    const tiers = ref([1, 2, 3])
    const grams = ref([40, 50, 55, 60, 70, 80, 120, 150])
    const colors = ref(['1', '1ก', '1ล', '1ส', '1อ', '4'])
    const pages = ref([30, 40, 50, 70, 80])
    const lines = ref([
        {
            title: 'ตาราง',
            value: 'TABLE',
        },
        {
            title: 'บัญชี',
            value: 'ACCOUNTING',
        },
        {
            title: 'ผลงาน',
            value: 'WORK',
        },
        {
            title: 'กราฟเอียง',
            value: 'SKEWED_GRAPH',
        },
        {
            title: 'การบ้าน',
            value: 'HOMEWORK',
        },
        {
            title: 'ตาราง5ช่อง',
            value: 'TABLE_5_COLUMNS',
        },
        {
            title: 'คัดจีน',
            value: 'CHINESE_WRITING',
        },
        {
            title: 'เดี่ยว',
            value: 'SINGLE',
        },
        {
            title: 'ครึ่ง',
            value: 'HALF',
        },
        {
            title: '5 เส้น',
            value: 'FIVE_LINES',
        },
        {
            title: 'สมุดอังกฤษ',
            value: 'ENGLISH_NOTEBOOK',
        },
        {
            title: 'วาดเขียนใหญ่',
            value: 'LARGE_DRAWING',
        },
        {
            title: 'วาดเขียนเล็ก',
            value: 'SMALL_DRAWING',
        },
        {
            title: 'คัดอังกฤษ',
            value: 'ENGLISH_WRITING',
        },
        {
            title: 'เส้นพิเศษ',
            value: 'SPECIAL_LINES',
        },
        {
            title: 'สมุดไดอารี่',
            value: 'DIARY_NOTEBOOK',
        },
        {
            title: 'โน๊ตเพลง',
            value: 'MUSIC_NOTE',
        },
        {
            title: 'รายงาน',
            value: 'REPORT',
        },
        {
            title: 'ตารางพิเศษ',
            value: 'SPECIAL_TABLE',
        },
        {
            title: 'กราฟเล็ก',
            value: 'SMALL_GRAPH',
        },
        {
            title: 'คัดจีนเรา',
            value: 'OUR_CHINESE_WRITING',
        },
        {
            title: 'คัดอังกฤษช่องเล็ก',
            value: 'SMALL_BOX_ENGLISH_WRITING',
        },
        {
            title: 'คัดอังกฤษช่องใหญ่',
            value: 'LARGE_BOX_ENGLISH_WRITING',
        },
        {
            title: 'ครึ่งบรรทัดเว้นช่อง',
            value: 'HALF_LINE_SPACED',
        },
        {
            title: 'การอ่าน',
            value: 'READING',
        },
        {
            title: 'ลูกเสือ',
            value: 'SCOUT',
        },
        {
            title: 'เขียนแบบ',
            value: 'DRAWING',
        },
        {
            title: 'วาดเขียนแบบฉีก',
            value: 'TEAR_DRAWING',
        },
        {
            title: 'ไม่มีเส้น',
            value: 'NO_LINES',
        },
        {
            title: 'ตาราง8ช่อง',
            value: 'TABLE_8_COLUMNS',
        },
        {
            title: 'สมุดฉีกไม่มีเส้น',
            value: 'TEAR_NOTEBOOK_NO_LINES',
        },
        {
            title: 'คู่',
            value: 'PAIR',
        },
    ])

    return {
        statuses,
        tiers,
        STATUS,
        statusColors,
        lines,
        pages,
        grams,
        colors,
        plates,
        getStatusTitle,
        quotationStatuses,
    }
}
