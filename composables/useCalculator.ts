import { ITEM_CATEGORY } from '@/models/enum/enum'
import type { CalculateResult } from '~/models/calculate/calculate'
import type { CreateQuotationItem } from '~/models/quotation/quotation'
export default function useCalculator() {
    return {
        calculateAllItem(items: CreateQuotationItem[]): CalculateResult {
            let totalItemAmount = 0
            items.forEach((item) => {
                totalItemAmount += item.price * item.quantity
            })
            return {
                discount: 0,
                total: totalItemAmount,
                net: 0,
            }
        },
        discountPerUnit(category: ITEM_CATEGORY, totalItemAmount: number) {
            switch (category) {
                case ITEM_CATEGORY.CUT_NINE:
                    if (totalItemAmount >= 30000) return 0.1
                    if (totalItemAmount >= 50000) return 0.15
                    return 0
                default:
                    return 0
            }
        },
    }
}
