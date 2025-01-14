import {
    COMPARATOR,
    CONFIG_TYPE,
    CONFIG_TYPE_CATEGORY,
} from '~/models/enum/enum'
import type { Price, PriceOption } from '~/models/price/price'
import type {
    CreateQuotationItem,
    CalculateConfig,
    QuotationConfig,
    CategoryColorCounter,
} from '~/models/quotation/quotation'

export default function useCalculatorQuotationItem() {
    const { getListDropdownTemplate, ceilToTwoDecimals } = useShare()
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
    function aggregateColorCounter(
        listItem: CreateQuotationItem[]
    ): CategoryColorCounter[] {
        return listItem.reduce((acc, item) => {
            const category = acc.find(
                (x: any) => x.categoryId === item.categoryId
            )

            if (!category) {
                acc.push({
                    categoryId: item.categoryId!,
                    colorCount: [
                        {
                            color: item.color!,
                            count: item.quantity!,
                        },
                    ],
                })
            } else {
                const color = category.colorCount.find(
                    (x: any) => x.color === item.color
                )
                if (!color) {
                    category.colorCount.push({
                        color: item.color!,
                        count: item.quantity!,
                    })
                } else {
                    color.count =
                        ceilToTwoDecimals(parseFloat(`${color.count}`)) +
                        ceilToTwoDecimals(parseFloat(`${item.quantity!}`))
                }
            }

            return acc
        }, [] as CategoryColorCounter[])
    }
    const calculateWithConfigs: CalculateConfig[] = [
        {
            level: CONFIG_TYPE.QUOTATION_ADDITIONAL_LIST_ITEMS,
            calculate: (
                listItem: CreateQuotationItem[],
                configs: QuotationConfig[],
                usedConfigs: QuotationConfig[]
            ) => {
                const allItemRequest = listItem.reduce((acc, item) => {
                    return ceilToTwoDecimals(
                        parseFloat(`${acc}`) + parseFloat(`${item.quantity}`)!
                    )
                }, 0)
                configs = configs.sort((a, b) => {
                    return b.compareValue - a.compareValue
                })
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
                        total:
                            listItem.reduce((acc, item) => {
                                return (
                                    acc +
                                    item.quantity! *
                                        (item.price! + item.charge!)
                                )
                            }, 0) +
                            usedConfigs.reduce((acc, item) => {
                                return acc + item.fixedChargePrice
                            }, 0),
                        configs: [],
                        configsByItem: [],
                        listItem: listItem,
                    }
                }
                const newListItem = listItem.map((item) => {
                    if (promotionUse.type == CONFIG_TYPE_CATEGORY.DISCOUNT) {
                        item.charge! -= promotionUse.value
                    } else {
                        item.charge! += promotionUse.value
                    }
                    return item
                })
                return {
                    total:
                        newListItem.reduce((acc, item) => {
                            return (
                                acc +
                                item.quantity! * (item.price! + item.charge!)
                            )
                        }, 0) +
                        usedConfigs.reduce((acc, item) => {
                            return acc + item.fixedChargePrice
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
                    const options = item.configIds || []
                    let unitPerprice = 0
                    for (const option of options) {
                        const config = configs.find((x) => x.id == option)
                        if (config) {
                            if (config.hasFixedChange) {
                                if (config.comparator != COMPARATOR.MERGE) {
                                    const comparer = comparatorActions.find(
                                        (action) =>
                                            action.oparator == config.comparator
                                    )
                                    if (comparer) {
                                        if (
                                            comparer?.action(
                                                item.quantity!,
                                                config.compareValue
                                            )
                                        ) {
                                            unitPerprice += config.value
                                        } else {
                                            lastBillConfig.push(config)
                                        }
                                    }
                                } else {
                                    lastBillConfig.push(config)
                                }
                            }
                            if (config.type == CONFIG_TYPE_CATEGORY.DISCOUNT) {
                                unitPerprice -= config.value
                            } else {
                                unitPerprice += config.value
                            }
                        } else {
                            result.push(item)
                        }
                    }
                    result.push({
                        ...item,
                        charge: ceilToTwoDecimals(unitPerprice),
                    })
                }

                return {
                    listItem: result,
                    configs: lastBillConfig,
                    configsByItem: configs,
                    defaultItem: listItem,
                }
            },
        },
        {
            level: CONFIG_TYPE.QUOTATION_ADDITIONAL_LISTS,
            calculate: (
                listItem: CreateQuotationItem[],
                configs: QuotationConfig[],
                oldUsedConfigs: QuotationConfig[],
                total: number
            ) => {
                let totalPrice = total
                const configUsed: QuotationConfig[] = []
                const colorCounter: CategoryColorCounter[] =
                    aggregateColorCounter(listItem)
                for (const color of colorCounter) {
                    const configCategory = configs.filter(
                        (x) => x.categoryId == color.categoryId
                    )
                    for (const config of configCategory) {
                        const colorCount = color.colorCount.find(
                            (x) =>
                                x.color == config.color &&
                                comparatorActions
                                    .find(
                                        (action) =>
                                            action.oparator == config.comparator
                                    )!
                                    .action(x.count, config.compareValue)
                        )
                        if (colorCount) {
                            configUsed.push(config)
                            if (config.type == CONFIG_TYPE_CATEGORY.DISCOUNT) {
                                totalPrice -= config.fixedChargePrice
                            } else {
                                totalPrice += config.fixedChargePrice
                            }
                        }
                    }
                }
                for (const config of oldUsedConfigs) {
                    if (config.type == CONFIG_TYPE_CATEGORY.DISCOUNT) {
                        totalPrice -= config.fixedChargePrice
                    } else {
                        totalPrice += config.fixedChargePrice
                    }
                }
                return {
                    total: totalPrice,
                    configs: configUsed,
                    configsByItem: [],
                    listItem: listItem,
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
    function handlerByItemPriceRef(
        item: CreateQuotationItem,
        prices: PriceOption[]
    ) {
        const itemsPrices = getListDropdownTemplate(prices, item.categoryId!)
        const itemExsist = itemsPrices.find(
            (x) =>
                x.value.gram == item.gram &&
                x.value.page == item.page &&
                x.value.line == item.pattern
        )
        if (itemExsist) {
            item.price = itemExsist.value.price
        } else {
            item.price = 0
        }
        return
    }
    function handlerRowItemsPriceRef(
        newValue: CreateQuotationItem[],
        prices: Price[]
    ) {
        return
    }

    return {
        handlerByItemPriceRef,
        handlerRowItemsPriceRef,
        isNewItem,
        calculateWithConfigs,
    }
}
