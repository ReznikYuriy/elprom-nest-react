import { Prisma } from '@prisma/client';
import DiscountInterface from '../interface/discount.interface';
import { JsonValue } from '@prisma/client/runtime/library';

export const transformDiscountsToJson = (
  discounts: DiscountInterface[],
): Prisma.JsonValue[] => {
  if (!discounts) return [];
  return discounts.map((discount) => ({
    quantity: discount.quantity,
    percent: discount.percent,
  }));
};

export const transformToDiscountInterface = (
  jsonArray: JsonValue[],
): DiscountInterface[] => {
  if (!jsonArray) return [];
  return jsonArray.map((jsonValue) => {
    const obj = jsonValue as { [key: string]: any };
    return {
      quantity: obj.quantity,
      percent: obj.percent,
    };
  });
};
