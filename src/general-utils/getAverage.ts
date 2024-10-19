// src/general-utils/getAverage.ts

export default function getAverage(numbers: number[]): number {
    const total = numbers.reduce((acc, num) => acc + num, 0);
    const average = total / numbers.length;
    return parseFloat(average.toFixed(2)); // Format to 2 decimal places and return as a number
}

