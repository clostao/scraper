import { injectable } from "inversify";
import puppeteer from "puppeteer";

@injectable()
export class PuppeteerClient {
  private browser: puppeteer.Browser | undefined;
  private page: puppeteer.Page | undefined;

  async init(): Promise<void> {
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  async fetch(url: string) {
    if (!this.page || !this.browser) {
      await this.init();
    }

    await this.page!.goto(url);

    return this.page!;
  }
}
