export enum LINE {
    SINGLE = 1,
    HALF = 2,
}
export enum PLATE {
    BIG = 1,
    SMALL = 2,
    EXTRA = 3,
}

export enum TYPE {
    QUOTATION = 'QUOTATION',
    PRODUCTION = 'PRODUCTION',
}

export enum STATUS {
    PRINTING = 'PRINTING',
    DESIGNING = 'DESIGNING',
    BOOKBINDING = 'BOOKBINDING',
    TRANSPORTING = 'TRANSPORTING ',
    PACKING = 'PACKING ',

    APPROVED = 'APPROVED',
    REVIEWING = 'REVIEWING',
    DONE = 'DONE',
    CANCELED = 'CANCELED',
}
export enum PRINTSTATUS {
    DESIGNING = 1,
    PRINTING = 2,
    BOOKBINDING = 3,
    PACKING = 4,
    DONE = 5,
}
export enum HEADER {
    QUOTATION,
    PRODUCTION,
}
export enum LOCALSTORAGE_KEY {
    AUTH_TOKEN = 'auth_token',
    AUTH_TOKEN_EXPIRE = 'auth_token_expire',
}
export enum SYSTEM_ROLE {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}
export enum ITEM_CATEGORY {
    CUT_NINE = 1,
    REPORT = 2,
    DRAWING = 3,
    ACCOUNTING = 4,
}
export enum CONFIG_TYPE {
    QUOTATION_ADDITIONAL_LIST_ITEMS = 'quotation_additional_list_items',
    QUOTATION_ITEMS = 'quotation_items',
    QUOTATION_ADDITIONAL_LISTS = 'quotation_additional_lists',
}
export enum CONFIG_TYPE_CATEGORY {
    DISCOUNT = 'DISCOUNT',
    CHARGES = 'CHARGES',
}
export enum COMPARATOR {
    LESS_THAN = 'LESS_THAN',
    LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
    EQUAL = 'EQUAL',
    GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
    GREATER_THAN = 'GREATER_THAN',
    MERGE = 'MERGE',
}
export enum CONFIG_SPECIAL {
    Q_ADDITIONAL_CHARGES = 'Q_ADDITIONAL_CHARGES',
    Q_ADDITIONAL_DISCOUNT = 'Q_ADDITIONAL_DISCOUNT',
}
