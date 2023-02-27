import { ILead } from "./ILead";
import { IDataResult } from "./IResult";

export interface IExtractor {
  extract(lead: ILead): Promise<void>;
}

interface IExtractionResult {
  leads: ILead[];
  commonValues: Record<string, string | number>;
  finalValues: string;
}
