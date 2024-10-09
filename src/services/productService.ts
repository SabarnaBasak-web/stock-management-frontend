import { IProduct } from "../redux/product/productSlice";
import { baseUrl, createBaseInitialization } from "./common";
const url = `${baseUrl}/product`;

export async function fetchAllProducts(): Promise<IProduct[]> {
  const baseInitialization = createBaseInitialization("GET");
  const result = await fetch(`${url}`, { ...baseInitialization });
  const response = await result.json();
  return response;
}
