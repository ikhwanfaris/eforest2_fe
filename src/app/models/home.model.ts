export class TotalCountModel {
    constructor(
      public total_earth_tree_count: string,
      public total_love_tree_count: string
    ) {}
  }

  export class MessagePusher {
    constructor(
      public your_message: string,
    ) {}
  }
    export class VisitorToken {
      constructor(
        public success: boolean,
        public token: string,
      ) {}
  }