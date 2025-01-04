import type { ITEM_CATEGORY } from '~/models/enum/enum'
import type { Price } from '~/models/price/price'
import type { CreateQuotationItem } from '~/models/quotation/quotation'

export default function useCalculatorQuotationItem() {
    const { getListDropdownTemplate } = useShare()
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
        const itemsPrices = getListDropdownTemplate(
            item.category as ITEM_CATEGORY
        )
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
        if (!item.gram || !item.color || !item.page || !item.pattern) {
            return
        }
        const priceRef = prices.find(
            (price) =>
                price.gram == item.gram &&
                price.color == item.color &&
                price.page == item.page &&
                price.pattern == item.pattern &&
                price.hasReference == item.hasReference
        )
        if (!priceRef) {
            item.price = 0
            return
        }
        item.price = priceRef!.priceRef
    }
    function handlerRowItemsPriceRef(
        newValue: CreateQuotationItem[],
        prices: Price[]
    ) {
        newValue.forEach((item, index) => {
            handlerByItemPriceRef(item, prices)
        })
    }
    return {
        handlerByItemPriceRef,
        handlerRowItemsPriceRef,
        isNewItem,
    }
}
