import { injectable } from "inversify";
import { IExtractor } from "../Types/IExtractor";
import { ILead } from "../Types/ILead";
import fetch from "node-fetch";
import {
  ExtractionEmitter,
  ExtractionEvent,
} from "../Events/ExtractionEmitter";
import { PuppeteerClient } from "../Services/PuppeteerClient";

@injectable()
export class FirstResultExtractor implements IExtractor {
  constructor(
    private _extractionEmitter: ExtractionEmitter,
    private puppeteer: PuppeteerClient
  ) {}
  async extract(lead: ILead): Promise<void> {
    const page = await this.puppeteer.fetch(lead.url);

    page.select(".re-CardMultimediaSlider-image");

    this._extractionEmitter.emit(ExtractionEvent.Value, {
      path: "/",
      data: {
        text: await page.content(),
      },
    });
  }
}
