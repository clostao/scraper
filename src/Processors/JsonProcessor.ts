import { injectable } from "inversify";
import {
  ExtractionEmitter,
  ExtractionEvent,
  ExtractionEventTypedPayload,
} from "../Events/ExtractionEmitter";

@injectable()
export class JsonProcessor {
  constructor(private _extractionEmitter: ExtractionEmitter) {}

  start() {
    this._extractionEmitter.on(
      ExtractionEvent.Value,
      this.processData.bind(this)
    );
  }

  private processData(
    payload: ExtractionEventTypedPayload[ExtractionEvent.Value]
  ) {
    console.log(payload.data);
  }
}
