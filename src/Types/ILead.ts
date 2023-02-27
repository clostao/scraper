import { RequestInfo } from "node-fetch";

export interface ILead {
  url: string;
  commonValues: Record<string, number | string>;
  extractor: Function;
}
