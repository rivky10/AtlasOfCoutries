import { doApi, showSelect } from "./atlasManager.js";
import { declareEvents } from "./atlasEvents.js";

const init = () => {
    doApi();
    declareEvents();
}

init();