export class Entry {
    type = SpendType.income;
    category: string = '';
    note: string = '';
    amount: number = 0;
    newDate : string = '';
}

export enum SpendType {
    income = "income",
    spending = "spending"
}