import { get, writable as _writable } from 'svelte/store';
import { browser } from '$app/environment';
import { page } from '$app/stores';
const stores = new WeakMap();
const factories = new Map();
const createOrRetrieve = (key) => {
    const p = get(page);
    let scopedStores = stores.get(p);
    if (!scopedStores) {
        scopedStores = new Map();
        stores.set(p, scopedStores);
    }
    let store = scopedStores.get(key);
    if (!store) {
        store = factories.get(key)();
        scopedStores.set(key, store);
    }
    return store;
};
export const writable = (value, start) => {
    if (browser) {
        return _writable(value);
    }
    const key = Symbol();
    factories.set(key, () => _writable(value, start));
    return {
        subscribe: (run, invalidate) => createOrRetrieve(key).subscribe(run, invalidate),
        set: (value) => createOrRetrieve(key).set(value),
        update: (updater) => createOrRetrieve(key).update(updater),
    };
};
