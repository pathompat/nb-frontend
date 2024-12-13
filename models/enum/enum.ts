export enum LINE {
    SINGLE = 1,
    HALF = 2,
}
export enum PLATE {
    BIG = 1,
    SMALL = 2,
    EXTRA = 3,
}
export enum ITEM_STATUS {
    REVIEWING = 'REVIEWING',
    APPROVED = 'APPROVED',
    CANCELED = 'CANCELED',
    OUTBOUND = 'OUTBOUND',
    PRINT = 'PRINT',
    SEWING = 'SEWING',
    PACK = 'PACK',
    READY = 'READY',
    DONE = 'DONE',
}
export enum STATUS {
    QUOTATION = 'QUOTATION',
    PRODUCTION = 'PRODUCTION',
}

export enum STAT_STATUS {
    PRINTING = 'PRINTING',
    DESIGNING = 'DESIGNING',
    BOOKBINDING = 'BOOKBINDING',
    SHIPING = 'SHIPING',
    PACK = 'PACK',

    APPROVED = 'APPROVED',
    REVIEWING = 'REVIEWING',
    DONE = 'DONE',
    CANCLE = 'CANCLE',
}
export enum PRINTSTATUS {
    OUTBOUND = 1,
    PRINT = 2,
    SEWING = 3,
    PACK = 4,
    READY = 5,
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
    CUT_NINE = 'CUT_NINE',
    REPORT = 'REPORT',
    DRAWING = 'DRAWING',
    ACCOUNTING = 'ACCOUNTING',
}
