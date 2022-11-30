/**
 * A Prodcut interface
 */
export declare interface product {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: Number;
  numReviews: number;
  countInsStock: number;
  description: string;
  [key: string]: number | string;
}
