import dayjs from 'dayjs';

import type { transactionType } from '@/types/transactions/transactionModel';

export const filterListByTime = (date:string, list: Array<transactionType>) => {

    let newList: Array<transactionType> = [];

    for (let iterator of list) {
        if(dayjs(date).isSame( dayjs(iterator.transaction_date), 'year' ) ){
            newList.push(iterator);
        }
    }
    
    return newList;
};