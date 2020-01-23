import { Head, Gte, Tail } from '..';

// Computes the maximum value of an array: https://lodash.com/docs/4.17.15#max.
//
//   type S = Max<[1, 2, 3]>; // 3
//
// Notice that the function is implemented with an object and a ternary check that accesses
// one of its properties:
//
// {
//   0: A;
//   1: B;
// }[T extends H ? 0 : 1]
//
// This is the same as writing: `T extends H ? A : B`. If the condition is true then
// `A` is returned because it's referenced by the `0` key. Otherwise it's `B` that's returned
// since it's referenced by the `1` key.
//
// TypScript's type system doesn't support recursive types and the above example is a way
// of going around it. Please note that it's not something TypeScript officially supports:
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-513187373.
export type Max<
  // The array to iterate over.
  T extends Array<number>,
  // An internal variable to track the currently maximum value. In the first
  // call this is initialized to the first element of the array.
  R extends number = Head<T>
> = {
  // Check if the input array is empty and return `never` if it is:
  empty: never;
  // Otherwise, check if the input array has only one element. If that's
  // the case, return `R` since it's already that element:
  finish: R;
  // Then, check if the
  'next-bigger': Max<Tail<T>, R>;
  //
  next: Max<Tail<T>>;
}[T extends []
  ? 'empty'
  : T extends [number]
  ? 'finish'
  : Gte<R, Head<Tail<T>>> extends true
  ? 'next-bigger'
  : 'next'];
