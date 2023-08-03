export class P2PListModel {
  constructor(
    public success: boolean,
    public data: P2PListData,
    public message?: string,
    public error_type?: string
  ) {}
}

export class P2PListData {
  constructor(
    public items: P2PListItems[],
    public total_item_count: number,
    public total_filtered_item_count: number
  ) {}
}

export class P2PListItems {
  constructor(
    public created_datetime: string,
    public last_updated_datetime: string,
    public ad_id: number,
    public ref_num: string,
    public ad_type: string,
    public amount: string,
    public step_status: string,
    public status: number,
    public can_cancel: number
  ) {}
}
