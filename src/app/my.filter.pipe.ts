// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//     name: 'myfilter',
//     pure: false
// })
// export class MyFilterPipe implements PipeTransform {
//     transform(items: any[], filter: Object): any {
//         if (!items || !filter) {
//             return items;
//         }
//         // filter items array, items which match and return true will be
//         // kept, false will be filtered out
//         return items.filter(item => {
//             const issuanceDate = new Date(item.issuance_date);

//     if (filter.endDate && filter.startDate) {
//       return filter.startDate <= issuanceDate &&  issuanceDate <= filter.endDate
//     }

//     return true
//         });
//     }

   
// }