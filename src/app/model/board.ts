import { Column } from './column';

export class Board {
    constructor(public name: string,public startDate: Date,public endDate:Date, public columns: Column[]) {}
}
