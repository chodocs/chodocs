import type { PackageIndexes } from './index';
import _metadata, { categories as _categories, docs as _docs, packages as _packages } from '../meta.json';

export const metadata = _metadata as PackageIndexes

export const docs = _docs as PackageIndexes['docs'];

export const docNames = docs.map(f => f.name);

export const getDocs = (name: string) => metadata.docs.find(f => f.name === name)