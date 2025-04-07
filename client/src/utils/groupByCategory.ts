// @/utils/groupByCategory.ts

import { Product } from "../types/index";

export function groupByCategory(products: Product[]) {
  return products.reduce((groups: Record<string, Product[]>, product) => {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});
}
