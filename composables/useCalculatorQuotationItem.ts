import type { Price } from '~/models/price/price'
import type { CreateQuotationItem } from '~/models/quotation/quotation'

export default function useCalculatorQuotationItem() {
    function isNewItem(
        oldItems: CreateQuotationItem[],
        newValue: CreateQuotationItem[]
    ) {
        newValue.forEach((item, index) => {
            const oldItem = oldItems[index]
            if (oldItem) {
                if (
                    // item.plate == oldItem.plate &&
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
        if (
            // !item.plate ||
            !item.gram ||
            !item.color ||
            !item.page ||
            !item.pattern
        ) {
            return
        }
        const priceRef = prices.find(
            (price) =>
                // price.plate == item.plate &&
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
        item.price = priceRef.priceRef
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
