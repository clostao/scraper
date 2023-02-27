import "reflect-metadata";
import { Container } from "inversify";
import { ExtractionManager } from "./ExtractionManager";
import { ExtractionEmitter } from "./Events/ExtractionEmitter";
import { FirstResultExtractor } from "./Extractors/FirstResultExtractor";
import { JsonProcessor } from "./Processors/JsonProcessor";
import { PuppeteerClient } from "./Services/PuppeteerClient";

const container = new Container();

container.bind(Container).toConstantValue(container);

container.bind(ExtractionManager).toSelf().inSingletonScope();
container.bind(ExtractionEmitter).toConstantValue(new ExtractionEmitter());

container.bind(PuppeteerClient).toSelf();

container.bind(FirstResultExtractor).toSelf().inSingletonScope();

container.bind(JsonProcessor).toSelf();

const manager = container.get(ExtractionManager);
const processor = container.get(JsonProcessor);

processor.start();

manager.start([
  {
    extractor: FirstResultExtractor,
    url: "https://www.fotocasa.es/es/alquiler/viviendas/gandia/todas-las-zonas/l",
    commonValues: {},
  },
]);
