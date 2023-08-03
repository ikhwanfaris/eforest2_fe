
export class BonusModel {
  constructor(public success: string, public data: BonusDataMainModel[],public total_item_count:number,public total_filtered_item_count:number) {}
}

export class BonusDataMainModel {
  constructor(
    public items: BonusDataSubModel,
    
  ) {}
}
export class BonusDataSubModel {
  constructor(
    public datetime: string,
    public username: string,
    public bonus_pct: string,
    public bonus_amount: string,
  ) {}
}
