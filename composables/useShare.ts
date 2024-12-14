import { ITEM_CATEGORY, STATUS, TYPE } from '~/models/enum/enum'
import { ITEM_OPTION } from '~/models/object/object'

export function useShare() {
    const itemStatuses = ref([
        { title: 'รออนุมัติ', value: STATUS.REVIEWING },
        { title: 'อนุมัติแล้ว', value: STATUS.APPROVED },
        { title: 'ยกเลิก', value: STATUS.CANCELED },
        { title: 'สำเร็จ', value: STATUS.DONE },

        { title: 'ออกเเบบ', value: STATUS.DESIGNING },
        { title: 'พิมพ์', value: STATUS.PRINTING },
        { title: 'เย็บเข้าเล่ม', value: STATUS.BOOKBINDING },
        { title: 'แพ็ค', value: STATUS.PACKING },
        { title: 'พร้อมจัดส่ง', value: STATUS.TRANSPORTING },
    ])
    const statuses = ref([
        { title: 'ใบเสนอราคา', value: TYPE.QUOTATION, color: '#C6E7FF' },
        { title: 'ใบสั่งผลิต', value: TYPE.PRODUCTION, color: '#D0E8C5' },
    ])
    const statAndIconColor = ref([
        {
            title: 'รออนุมัติ',
            value: STATUS.REVIEWING,
            icon: 'mdi-format-list-bulleted',
            color: '#FCC737',
            type: 'QUOTATION',
        },
        {
            title: 'ออกเเบบ',
            value: STATUS.DESIGNING,
            icon: 'mdi-pencil-ruler',
            color: '#5E60CE',
            type: 'PRODUCTION',
        },
        {
            title: 'พิมพ์',
            icon: 'mdi-printer',
            color: '#4C566A',
            value: STATUS.PRINTING,
            type: 'PRODUCTION',
        },
        {
            title: 'เย็บเข้าเล่ม',
            value: STATUS.BOOKBINDING,
            icon: 'mdi-book-open-blank-variant',
            color: '#0081A7',
            type: 'PRODUCTION',
        },
        {
            title: 'แพ็ค',
            value: STATUS.PACKING,
            icon: 'mdi-package-variant',
            color: '#F4A261',
            type: 'PRODUCTION',
        },
        {
            title: 'พร้อมจัดส่ง',
            value: STATUS.TRANSPORTING,
            icon: 'mdi-truck-delivery',
            color: '#2A9D8F',
            type: 'PRODUCTION',
        },
    ])
    const statusColors = ref([
        { id: STATUS.REVIEWING, color: '#FF9800' },
        { id: STATUS.APPROVED, color: '#00b300' },
        { id: STATUS.CANCELED, color: '#b30000' },

        { id: STATUS.PRINTING, color: '#FF9800' },
        { id: STATUS.DESIGNING, color: '#B0BEC5' },
        { id: STATUS.BOOKBINDING, color: '#2196F3' },
        { id: STATUS.PACKING, color: '#9C27B0' },
        { id: STATUS.DONE, color: '#4CAF50' },
    ])
    const itemCategories = ref([
        {
            title: 'ตัด9',
            value: ITEM_CATEGORY.CUT_NINE,
        },
        {
            title: 'รายงาน',
            value: ITEM_CATEGORY.REPORT,
        },
        {
            title: 'วาดเขียน',
            value: ITEM_CATEGORY.DRAWING,
        },
        {
            title: 'บัญชี',
            value: ITEM_CATEGORY.ACCOUNTING,
        },
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
            itemStatuses.value.find((status) => status.value === value)
                ?.title || 'ไม่ทราบสถานะ'
    )
    const itemOptions = ref([
        {
            title: 'พิมพ์ชื่อเส้นที่ปก',
            value: ITEM_OPTION.COVER_PRINT,
        },
        {
            title: 'เคลือบUV',
            value: ITEM_OPTION.UV_COATING,
        },
        {
            title: 'เย็บสันกาว',
            value: ITEM_OPTION.GLUE_BINDING,
        },
        {
            title: 'แพ็คชุดต่ำกว่าโหล',
            value: ITEM_OPTION.PACK_LESS_THAN_DOZEN,
        },
        {
            title: 'จัดชุดแยกระดับชั้น',
            value: ITEM_OPTION.SEPARATE_BY_LEVEL,
        },
        {
            title: 'พิมพ์ปกเลือกสีหมึก',
            value: ITEM_OPTION.COVER_PRINT_COLOR_SELECTION,
        },
    ])
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
        itemStatuses,
        tiers,
        statusColors,
        lines,
        pages,
        statAndIconColor,
        grams,
        colors,
        statuses,
        plates,
        getStatusTitle,
        quotationStatuses,
        itemOptions,
        itemCategories,
    }
}
