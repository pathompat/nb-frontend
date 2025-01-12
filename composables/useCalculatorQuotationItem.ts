import { ac } from 'vitest/dist/chunks/reporters.D7Jzd9GS'
import { a } from 'vitest/dist/chunks/suite.B2jumIFP'
import {
    COMPARATOR,
    CONFIG_TYPE,
    CONFIG_TYPE_CATEGORY,
    type ITEM_CATEGORY,
} from '~/models/enum/enum'
import type { Price } from '~/models/price/price'
import type {
    CreateQuotationItem,
    CalculateConfig,
    QuotationConfig,
} from '~/models/quotation/quotation'

export default function useCalculatorQuotationItem() {
    const { getListDropdownTemplate } = useShare()
    const comparatorActions = [
        {
            oparator: COMPARATOR.EQUAL,
            action: (value: number, compareValue: number) => {
                return value == compareValue
            },
        },
        {
            oparator: COMPARATOR.GREATER_THAN,
            action: (value: number, compareValue: number) => {
                return value > compareValue
            },
        },
        {
            oparator: COMPARATOR.GREATER_THAN_OR_EQUAL,
            action: (value: number, compareValue: number) => {
                return value >= compareValue
            },
        },
        {
            oparator: COMPARATOR.LESS_THAN,
            action: (value: number, compareValue: number) => {
                return value < compareValue
            },
        },
        {
            oparator: COMPARATOR.LESS_THAN_OR_EQUAL,
            action: (value: number, compareValue: number) => {
                return value <= compareValue
            },
        },
    ]
    const calculateWithConfigs: CalculateConfig[] = [
        {
            level: CONFIG_TYPE.QUOTATION_ADDITIONAL_LIST_ITEMS,
            calculate: (
                listItem: CreateQuotationItem[],
                configs: QuotationConfig[],
                total: number
            ) => {
                let totalPrice = total
                const allItemRequest = listItem.reduce((acc, item) => {
                    return (
                        parseFloat(`${acc}`) + parseFloat(`${item.quantity}`)!
                    )
                }, 0)
                configs = configs.sort((a, b) => {
                    return b.compareValue - a.compareValue
                })
                console.log('s')

                const promotionUse = configs.find((config) => {
                    const comparer = comparatorActions.find(
                        (action) => action.oparator == config.comparator
                    )
                    if (!comparer) {
                        return false
                    }
                    return comparer?.action(allItemRequest, config.compareValue)
                })
                if (!promotionUse) {
                    return {
                        total: totalPrice,
                        configs: [],
                        configsByItem: [],
                        listItem: listItem,
                    }
                }
                const newListItem = listItem.map((item) => {
                    if (promotionUse.type == CONFIG_TYPE_CATEGORY.DISCOUNT) {
                        item.perUnitPrice! -= promotionUse.value
                    } else {
                        item.perUnitPrice! += promotionUse.value
                    }
                    return item
                })
                return {
                    total: listItem.reduce((acc, item) => {
                        return acc + item.quantity! * item.price!
                    }, 0),
                    configs: [],
                    configsByItem: [],
                    listItem: newListItem,
                }
            },
        },
        {
            level: CONFIG_TYPE.QUOTATION_ITEMS,
            calculate: (
                listItem: CreateQuotationItem[],
                configs: QuotationConfig[]
            ) => {
                const result: CreateQuotationItem[] = []
                const lastBillConfig: QuotationConfig[] = []
                for (const item of listItem) {
                    const options = item.options?.split(',') || []
                    let unitPerprice = 0
                    for (const option of options) {
                        const config = configs.find((x) => x.key == option)
                        if (config) {
                            if (config.type == CONFIG_TYPE_CATEGORY.DISCOUNT) {
                                unitPerprice -= config.value
                            } else {
                                unitPerprice += config.value
                            }
                            if (config.hasFixedChange) {
                                lastBillConfig.push(config)
                            }
                        } else {
                            result.push(item)
                        }
                    }
                    result.push({
                        ...item,
                        perUnitPrice: unitPerprice,
                        price:
                            parseFloat(`${item.price}`)! +
                            parseFloat(`${unitPerprice}`),
                    })
                }

                return {
                    listItem: result,
                    configs: lastBillConfig,
                    configsByItem: configs,
                }
                //                 (qty * value) + (changeprice)
                // special case
                // if(contidition)
                // (qty * value) or  (changeprice)
            },
        },
        {
            level: CONFIG_TYPE.QUOTATION_ADDITIONAL_LISTS,
            calculate: (
                listItem: CreateQuotationItem[],
                configs: QuotationConfig[],
                total: number
            ) => {
                let totalPrice = total
                for (const config of configs) {
                    if (config.type == CONFIG_TYPE_CATEGORY.DISCOUNT) {
                        totalPrice -= config.fixedChargePrice
                    } else {
                        totalPrice += config.fixedChargePrice
                    }
                }
                return {
                    total: totalPrice,
                    configs: [],
                    configsByItem: [],
                    listItem: [],
                }
                // item by
            },
        },
    ]
    function isNewItem(
        oldItems: CreateQuotationItem[],
        newValue: CreateQuotationItem[]
    ) {
        newValue.forEach((item, index) => {
            const oldItem = oldItems[index]
            if (oldItem) {
                if (
                    item.gram == oldItem.gram &&
                    item.color == oldItem.color &&
                    item.page == oldItem.page &&
                    item.pattern == oldItem.pattern &&
                    item.hasReference == oldItem.hasReference &&
                    item.quantity == oldItem.quantity
                ) {
                    return false
                }
            }
        })
        oldItems = JSON.parse(JSON.stringify(newValue))
        return true
    }
    function handlerByItemPriceRef(item: CreateQuotationItem, prices: Price[]) {
        // const itemsPrices = getListDropdownTemplate(
        //     item.category as ITEM_CATEGORY
        // )
        // const itemExsist = itemsPrices.find(
        //     (x) =>
        //         x.value.gram == item.gram &&
        //         x.value.page == item.page &&
        //         x.value.line == item.pattern
        // )
        // if (itemExsist) {
        //     item.price = itemExsist.value.price
        // } else {
        //     item.price = 0
        // }
        // return
        // if (!item.gram || !item.color || !item.page || !item.pattern) {
        //     return
        // }
        // const priceRef = prices.find(
        //     (price) =>
        //         price.gram == item.gram &&
        //         price.color == item.color &&
        //         price.page == item.page &&
        //         price.pattern == item.pattern &&
        //         price.hasReference == item.hasReference
        // )
        // if (!priceRef) {
        //     item.price = 0
        //     return
        // }
        // item.price = priceRef!.priceRef
    }
    function handlerRowItemsPriceRef(
        newValue: CreateQuotationItem[],
        prices: Price[]
    ) {
        return
        newValue.forEach((item, index) => {
            handlerByItemPriceRef(item, prices)
        })
    }

    return {
        handlerByItemPriceRef,
        handlerRowItemsPriceRef,
        isNewItem,
        calculateWithConfigs,
    }
}
