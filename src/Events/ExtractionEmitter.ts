import EventEmitter from "eventemitter3";
import { injectable } from "inversify";
import { ILead } from "../Types/ILead";
import { IDataResult, IResult } from "../Types/IResult";

export enum ExtractionEvent {
  Lead = "lead",
  Value = "value",
}

export interface ExtractionEventPayload {
  path: string;
  data: ExtractionEventTypedPayload;
}

@injectable()
export class ExtractionEmitter extends EventEmitter<
  ExtractionEvent,
  ExtractionEventPayload
> {}

export type ExtractionEventTypedPayload = {
  [ExtractionEvent.Lead]: ILead;
  [ExtractionEvent.Value]: IDataResult;
};
