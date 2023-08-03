export class IncentivesModel {
  constructor(
    public success: boolean,
    public users: IncentivesDetailsModel[],
    public result: IncentivesDetailsModel[],
    public count: number,
    public message?: string,
    public error_type?: string
  ) {}
}

export class IncentivesDetailsModel {
  constructor(
    public userId: number,
    public username: string,
    public L1Sales: string,
    public NoOfL1Users: number,
    public NoOfL1Buddies: number,
    public Country: string
  ) {}
}
