// @flow

export const getUrl = (...params: Array<string>) => params.join('/');

export const getMiddle = (arr: Array<string>) => {
    const middleIndex = Math.floor(arr.length / 2);

    return arr[middleIndex];
};

export const makePlural = (str: string = '', symbol: string) => (str.slice(-1) === symbol ? str : `${str}${symbol}`);
