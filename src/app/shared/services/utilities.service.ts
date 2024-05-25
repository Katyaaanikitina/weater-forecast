import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  getAverageNumber(array: number[]): number {
    const sum = array.reduce((acc: number, curr: number) => {
      return acc + curr
    }, 0);

    return Math.round(sum / array.length);
  }

  getMostOftenElementInArray(array: string[]): string {
    let hashMap: Record<string, number> = {};
    let maxElement = '';
    let maxElementQuantity = 0;

    array.forEach((element) => {
      (hashMap[element]) ? hashMap[element]++ : hashMap[element] = 1;
      if (maxElementQuantity < hashMap[element]) {
        maxElement = element;
        maxElementQuantity = hashMap[element];
      }
    });

    return maxElement;
  }
}
