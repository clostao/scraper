import { ILead } from "./ILead";

export type IResult = IDataResult | ILead;

export type IDataResult = {
  path: string;
  data: Record<string, number | string>;
};
