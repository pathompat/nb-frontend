import { ITEM_CATEGORY, STATUS, TYPE } from '~/models/enum/enum'
import { ITEM_OPTION, PATTERN } from '~/models/object/object'
import type {
    TemplateCategory,
    TemplateCategoryGroup,
} from '~/models/share/share'

export function useShare() {
    const itemStatuses = ref([
        {
            order: 1,
            title: 'รออนุมัติ',
            value: STATUS.REVIEWING,
            color: '#FF9800',
        },
        {
            order: 2,
            title: 'อนุมัติแล้ว',
            value: STATUS.APPROVED,
            color: '#00b300',
        },
        { order: 3, title: 'ยกเลิก', value: STATUS.CANCELED, color: '#b30000' },

        {
            order: 4,
            title: 'ออกแบบ',
            value: STATUS.DESIGNING,
            color: '#B0BEC5',
        },
        { order: 5, title: 'พิมพ์', value: STATUS.PRINTING, color: '#FF9800' },
        {
            order: 6,
            title: 'เย็บเข้าเล่ม',
            value: STATUS.BOOKBINDING,
            color: '#2196F3',
        },
        { order: 7, title: 'แพ็ค', value: STATUS.PACKING, color: '#9C27B0' },
        {
            order: 8,
            title: 'พร้อมจัดส่ง',
            value: STATUS.TRANSPORTING,
            color: '#2A9D8F',
        },

        { order: 9, title: 'สำเร็จ', value: STATUS.DONE, color: '#4CAF50' },
    ])

    const getNextStatus = (text: string) => {
        const currentitem = itemStatuses.value.find((x) => x.value === text)
        if (!currentitem) return null
        const nextItem = itemStatuses.value.find(
            (x) => x.order === currentitem?.order + 1
        )
        return nextItem
    }
    const getPrevStatus = (text: string) => {
        const currentitem = itemStatuses.value.find((x) => x.value === text)
        if (!currentitem) return null
        const nextItem = itemStatuses.value.find(
            (x) => x.order === currentitem?.order - 1 && x.order > 3
        )
        return nextItem
    }

    const getMaxStatus = (text: string[]) => {
        const result = text.map((item) => {
            const index = itemStatuses.value.findIndex((x) => x.value === item)
            return {
                title: item,
                value: index,
            }
        })
        if (result.length === 0) return 'ไม่ทราบสถานะ'
        return result.sort((a, b) => b.value - a.value)[0].title
    }
    const getMinStatus = (text: string[]) => {
        const result = text.map((item) => {
            const index = itemStatuses.value.findIndex((x) => x.value === item)
            return {
                title: item,
                value: index,
            }
        })
        if (result.length === 0) return 'ไม่ทราบสถานะ'
        return result.sort((a, b) => a.value - b.value)[0].title
    }
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
            type: TYPE.QUOTATION,
        },
        {
            title: 'ออกแบบ',
            value: STATUS.DESIGNING,
            icon: 'mdi-pencil-ruler',
            color: '#5E60CE',
            type: TYPE.PRODUCTION,
        },
        {
            title: 'พิมพ์',
            icon: 'mdi-printer',
            color: '#4C566A',
            value: STATUS.PRINTING,
            type: TYPE.PRODUCTION,
        },
        {
            title: 'เย็บเข้าเล่ม',
            value: STATUS.BOOKBINDING,
            icon: 'mdi-book-open-blank-variant',
            color: '#0081A7',
            type: TYPE.PRODUCTION,
        },
        {
            title: 'แพ็ค',
            value: STATUS.PACKING,
            icon: 'mdi-package-variant',
            color: '#F4A261',
            type: TYPE.PRODUCTION,
        },
        {
            title: 'พร้อมจัดส่ง',
            value: STATUS.TRANSPORTING,
            icon: 'mdi-truck-delivery',
            color: '#2A9D8F',
            type: TYPE.PRODUCTION,
        },
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
                ?.title || 'ไม่พบสถานะ'
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
    const colors = ref(['1', '2', '4'])
    const pages = ref([30, 40, 50, 70, 80])
    const lines = ref([
        {
            title: 'ตาราง',
            value: PATTERN.TABLE,
        },
        {
            title: 'บัญชี',
            value: PATTERN.ACCOUNTING,
        },
        {
            title: 'ผลงาน',
            value: PATTERN.WORK,
        },
        {
            title: 'กราฟเอียง',
            value: PATTERN.SKEWED_GRAPH,
        },
        {
            title: 'การบ้าน',
            value: PATTERN.HOMEWORK,
        },
        {
            title: 'ตาราง5ช่อง',
            value: PATTERN.TABLE_5_COLUMNS,
        },
        {
            title: 'คัดจีน',
            value: PATTERN.CHINESE_WRITING,
        },
        {
            title: 'เดี่ยว',
            value: PATTERN.SINGLE,
        },
        {
            title: 'ครึ่ง',
            value: PATTERN.HALF,
        },
        {
            title: '5 เส้น',
            value: PATTERN.FIVE_LINES,
        },
        {
            title: 'สมุดอังกฤษ',
            value: PATTERN.ENGLISH_NOTEBOOK,
        },
        {
            title: 'วาดเขียนใหญ่',
            value: PATTERN.LARGE_DRAWING,
        },
        {
            title: 'วาดเขียนเล็ก',
            value: PATTERN.SMALL_DRAWING,
        },
        {
            title: 'คัดอังกฤษ',
            value: PATTERN.ENGLISH_WRITING,
        },
        {
            title: 'เส้นพิเศษ',
            value: PATTERN.SPECIAL_LINES,
        },
        {
            title: 'สมุดไดอารี่',
            value: PATTERN.DIARY_NOTEBOOK,
        },
        {
            title: 'โน๊ตเพลง',
            value: PATTERN.MUSIC_NOTE,
        },
        {
            title: 'รายงาน',
            value: PATTERN.REPORT,
        },
        {
            title: 'ตารางพิเศษ',
            value: PATTERN.SPECIAL_TABLE,
        },
        {
            title: 'กราฟเล็ก',
            value: PATTERN.SMALL_GRAPH,
        },
        {
            title: 'คัดจีนเรา',
            value: PATTERN.OUR_CHINESE_WRITING,
        },
        {
            title: 'คัดอังกฤษช่องเล็ก',
            value: PATTERN.SMALL_BOX_ENGLISH_WRITING,
        },
        {
            title: 'คัดอังกฤษช่องใหญ่',
            value: PATTERN.LARGE_BOX_ENGLISH_WRITING,
        },
        {
            title: 'ครึ่งบรรทัดเว้นช่อง',
            value: PATTERN.HALF_LINE_SPACED,
        },
        {
            title: 'การอ่าน',
            value: PATTERN.READING,
        },
        {
            title: 'ลูกเสือ',
            value: PATTERN.SCOUT,
        },
        {
            title: 'เขียนแบบ',
            value: PATTERN.DRAWING,
        },
        {
            title: 'วาดเขียนแบบฉีก',
            value: PATTERN.TEAR_DRAWING,
        },
        {
            title: 'ไม่มีเส้น',
            value: PATTERN.NO_LINES,
        },
        {
            title: 'ตาราง8ช่อง',
            value: PATTERN.TABLE_8_COLUMNS,
        },
        {
            title: 'สมุดฉีกไม่มีเส้น',
            value: PATTERN.TEAR_NOTEBOOK_NO_LINES,
        },
        {
            title: 'คู่',
            value: PATTERN.PAIR,
        },
        {
            title: 'เนื้อพิมพ์',
            value: PATTERN.PRINTING,
        },
    ])

    function flattenTemplateCategoryGroup(
        groups: TemplateCategoryGroup[]
    ): TemplateCategory[] {
        return groups.flatMap((group) => {
            const { gram, category, pagePriceMap, line, color, plate } = group

            const effectiveLine = line.length > 0 ? line : ['']

            return pagePriceMap.flatMap(({ page, price }) =>
                effectiveLine.map((line, index) => ({
                    gram,
                    line,
                    page,
                    price,
                    category,
                    color: color?.[index] ?? undefined,
                    plate: plate?.[index] ?? undefined,
                }))
            )
        })
    }

    const templateItems = ref<TemplateCategoryGroup[]>([
        {
            gram: 55,
            line: [PATTERN.SINGLE, PATTERN.HALF, PATTERN.FIVE_LINES],
            pagePriceMap: [
                { page: 20, price: 3.4 },
                { page: 30, price: 4.2 },
                { page: 40, price: 5.1 },
                { page: 60, price: 7.5 },
                { page: 80, price: 10 },
            ],
            category: ITEM_CATEGORY.CUT_NINE,
        },
        {
            gram: 55,
            line: [PATTERN.TABLE],
            pagePriceMap: [
                { page: 20, price: 3.5 },
                { page: 30, price: 4.3 },
                { page: 40, price: 5.3 },
                { page: 60, price: 7.9 },
                { page: 80, price: 10.4 },
            ],
            category: ITEM_CATEGORY.CUT_NINE,
        },
        {
            gram: 60,
            line: [
                PATTERN.SINGLE,
                PATTERN.HALF,
                PATTERN.FIVE_LINES,
                PATTERN.TABLE,
            ],
            pagePriceMap: [
                { page: 20, price: 3.6 },
                { page: 30, price: 4.4 },
                { page: 40, price: 5.3 },
                { page: 60, price: 7.8 },
                { page: 80, price: 10.4 },
            ],
            category: ITEM_CATEGORY.CUT_NINE,
        },
        {
            gram: 60,
            line: [PATTERN.TABLE],
            pagePriceMap: [
                { page: 20, price: 3.7 },
                { page: 30, price: 4.5 },
                { page: 40, price: 5.5 },
                { page: 60, price: 8.2 },
                { page: 80, price: 10.8 },
            ],
            category: ITEM_CATEGORY.CUT_NINE,
        },
        {
            gram: 60,
            line: [PATTERN.PRINTING],
            pagePriceMap: [
                { page: 30, price: 5.5 },
                { page: 40, price: 6.5 },
            ],
            category: ITEM_CATEGORY.CUT_NINE,
        },
        {
            gram: 55,
            line: [],
            pagePriceMap: [
                { page: 60, price: 18.5 },
                { page: 70, price: 20.5 },
                { page: 80, price: 22.5 },
            ],
            category: ITEM_CATEGORY.ACCOUNTING,
        },
        {
            gram: 100,
            line: [PATTERN.SMALL_DRAWING],
            pagePriceMap: [{ page: 10, price: 4 }],
            category: ITEM_CATEGORY.DRAWING,
        },
        {
            gram: 100,
            line: [PATTERN.LARGE_DRAWING],
            pagePriceMap: [{ page: 10, price: 7.25 }],
            category: ITEM_CATEGORY.DRAWING,
        },
        {
            gram: 120,
            line: [PATTERN.SMALL_DRAWING],
            pagePriceMap: [{ page: 10, price: 4.5 }],
            category: ITEM_CATEGORY.DRAWING,
        },
        {
            gram: 120,
            line: [PATTERN.LARGE_DRAWING],
            pagePriceMap: [{ page: 10, price: 8.25 }],
            category: ITEM_CATEGORY.DRAWING,
        },
        {
            gram: 150,
            line: [PATTERN.SMALL_DRAWING],
            pagePriceMap: [{ page: 10, price: 5 }],
            category: ITEM_CATEGORY.DRAWING,
        },
        {
            gram: 150,
            line: [PATTERN.LARGE_DRAWING],
            pagePriceMap: [{ page: 10, price: 9.25 }],
            category: ITEM_CATEGORY.DRAWING,
        },
        {
            gram: 60,
            line: [PATTERN.REPORT],
            pagePriceMap: [
                { page: 20, price: 8 },
                { page: 30, price: 10 },
                { page: 40, price: 12 },
                { page: 50, price: 14 },
            ],
            category: ITEM_CATEGORY.REPORT,
        },
    ])
    function getListDropdownTemplate(
        category: ITEM_CATEGORY
    ): { label: string; value: TemplateCategory }[] {
        return flattenTemplateCategoryGroup(templateItems.value)
            .filter((f) => f.category == category)
            .map((x) => {
                const line = lines.value.find((c) => c.value == x.line)
                return {
                    label: `${x.gram} แกรม ${!line ? '' : `เส้น ${line.title}`} จำนวน ${x.page} หน้า ราคา ${x.price} บาท`,
                    value: x,
                }
            })
    }
    return {
        itemStatuses,
        tiers,
        lines,
        pages,
        getMaxStatus,
        getMinStatus,
        statAndIconColor,
        grams,
        colors,
        statuses,
        plates,
        getStatusTitle,
        getNextStatus,
        quotationStatuses,
        getPrevStatus,
        getListDropdownTemplate,
        itemOptions,
        itemCategories,
    }
}
