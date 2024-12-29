import type { StartStopNotifier, Writable } from 'svelte/store';
export declare const writable: <T>(value?: T | undefined, start?: StartStopNotifier<T> | undefined) => Writable<T>;
