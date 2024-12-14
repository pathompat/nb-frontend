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
    CUT_NINE = 'CUT_NINE',
    REPORT = 'REPORT',
    DRAWING = 'DRAWING',
    ACCOUNTING = 'ACCOUNTING',
}
