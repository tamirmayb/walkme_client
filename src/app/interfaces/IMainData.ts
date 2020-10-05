export interface ICapacityCounters {
  maxCountPerUser: number;
  maxCount: number;
}

export interface IMainData {
  id?: number;
  name: string;
  data: string;
  cap: ICapacityCounters;
}
