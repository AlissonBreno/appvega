import { catalog } from 'mocks/catalog';
import type { CatalogFood } from '../../../app/src/pages/SearchFood/types';

export const getCatalog = (): CatalogFood[] => catalog;
