export class UserPlantedModel {
  constructor(
    public success: boolean,
    public data?: UserPlantedDetailModel[],
    public message?: string,
    public error_type?: string
  ) {}
}

export class UserPlantedDetailModel {
  constructor(
    public id: number,
    public package_ref: number,
    public package_name: string,
    public day_count: number,
    public paid_out_amount: string,
    public watered_today: number,
    public dsr: string
  ) {}
}

export class UserUsdtTxnModel {
  constructor(
    public success: boolean,
    public data?: UserUsdtTxnDetailModel[],
    public message?: string,
    public error_type?: string
  ) {}
}

export class UserUsdtTxnDetailModel {
  constructor(
    public id: number,
    public package_ref: number,
    public package_name: string,
    public day_count: number,
    public paid_out_amount: string
  ) {}
}

export class TransferSeedDataModel {
  constructor(
    public recipient_username: string,
    public amount: string,
    public otp_code: number,
    public success: boolean,
    public message?: string
  ) {}
}

export class TransferSeed {
  public success: string;
}
