interface IProduct {
  id: string
  productid1c: number
  name: string
  tags?: string
  categoryid: string
  imagepath?: string
  description: string
  price: number
  quantity: number
  discountquantity1: number
  discount1: number
  discountquantity2: number
  discount2: number
  createdat: string
  updatedat: string
}

export type { IProduct };
