'use strict';

export function find<T>(arr: T[], predicate: (T, number) => boolean) {
  let i = 0;
  for (let item of arr) {
    if (predicate(item, i++)) {
      return item;
    }
  }

  return null;
}