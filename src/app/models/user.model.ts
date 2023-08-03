export class UserModel {
  constructor(
    public success: boolean,
    public user?: UserDetailModel,
    public access_token?: string,
    public otp_code?: OTPCodeModel,
    public message?: string,
    public error_type?: string,
    public team?: TeamDetailModel
  ) {}
}

export class UserDetailModel {
  constructor(
    public username: string,
    public fullname: string,
    public email: string,
    public upline_username: string,
    public country: string,
    public rank: number,
    public rank_label: string,
    public joined_at_timestamp: string,
    public seed_balance: string,
    public country_id: number,
    public invited_by: number,
    public direct_upline: string,
    public my_community_leader: string,
    public max_earnings: number,
    public total_earnings: number,
    public temp_upline_username: string, 
    public alert_pct: number,
    public is_verified?: boolean,
    public lord_enabled?: string
   
  ) {}
}
export class TeamDetailModel {
  constructor(
    public total_direct: number,
    public total_team_members: number,
    public total_team_volume_accm: number,
    public total_buddy_volume: number
  ) {}
}

export class OTPCodeModel {
  constructor(
    public expiry_seconds_left: number,
    public requested_at: string
  ) {}
}
export class BeneficiaryModel {
  constructor(
    public success: boolean,
    public beneficiary?: BeneficiaryDetailModel,
    public message?: string
  ) {}
}

export class BeneficiaryDetailModel {
  constructor(
    public bef_name: string,
    public bef_email: string,
    public bef_mobile: number,
    public bef_id_no: string
  ) {}
}

export class UserUsdtBalanceModel {
  constructor(public success: boolean, public usdt_balance?: string) {}
}

export class EarningLimitModel {
  constructor(
    public success: boolean,
    public user?: UserDetailModel,
  ) {}
}
