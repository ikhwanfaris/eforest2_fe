export class PackageModel {
  constructor(public success: string, public data: PackageDataModel[]) {}
}

export class PackageDataModel {
  constructor(
    public id: number,
    public name: string,
    public price: string,
    public seed_amount: string,
    public love_tree: string,
    public earth_tree: string,
    public growth_pct: string,
    public max_pct: string
  ) {}
}

export class PaymentModel {
  constructor(public success: string, public payment_url: string) {}
}

export class PaymentReplantModel {
  constructor(
    public payment_amount: number,
    public fee_amount: number,
    public success: boolean,
  ) {}
}

export class PaymentDataModel {
  constructor(
    public pay_amount: number,
    public pay_address: string,
    public pay_status: string,
    public payment_id: string,
    public order_id: number
  ) {}
}

export class OrderModel {
  constructor(
    public success: string,
    public total_love_tree: number,
    public total_earth_tree: number,
    public data: OrderDataModel[]
  ) {}
}

export class OrderDataModel {
  constructor(
    public id: number,
    public package_name: string,
    public pay_amount: string,
    public seed_amount: string,
    public growth_pct: string,
    public max_pct: string,
    public love_tree: number,
    public earth_tree: number,
    public payout_amount: string,
    public ordered_at: string,
    public ordered_at_timestamp: number,
    public color: string,
    public package_ref: string
  ) {}
}
