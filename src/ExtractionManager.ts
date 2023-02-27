import { Container, inject, injectable } from "inversify";
import { IExtractor } from "./Types/IExtractor";
import {
  ExtractionEmitter,
  ExtractionEvent,
  ExtractionEventTypedPayload,
} from "./Events/ExtractionEmitter";
import { ILead } from "./Types/ILead";

@injectable()
export class ExtractionManager {
  pendingLeads: ILead[] = [];
  started = false;
  constructor(
    private _eventEmitter: ExtractionEmitter,
    private _container: Container
  ) {}

  start(leads: ILead[]) {
    if (this.started) {
      throw new Error("ExtractionManager has already been started");
    }

    this._eventEmitter.on(
      ExtractionEvent.Lead,
      this.addEventToQueue.bind(this)
    );

    this.pendingLeads = [...this.pendingLeads, ...leads];
    this.started = true;

    setTimeout(this.scan.bind(this));
  }

  private addEventToQueue(
    lead: ExtractionEventTypedPayload[ExtractionEvent.Lead]
  ) {
    this.pendingLeads.push(lead);
  }

  private scan() {
    if (this.pendingLeads.length === 0) {
      setTimeout(this.scan.bind(this), 10_000);
      return;
    }
    const lead = this.pendingLeads.shift()!;

    const extractor: IExtractor = this._container.get(lead.extractor);

    extractor.extract(lead);
  }
}
