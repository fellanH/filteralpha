import { enableScroll } from "./modules/utility.js";
import { render } from "./modules/render.js";
import { init } from "./modules/init.js";
import { fetchData, fetchItalianData } from "./modules/fetch.js";

var language;

var filters = [
  {
    name: "brand",
    property: "project_label",
  },
  {
    name: "location",
    property: "location",
  },
  {
    name: "department",
    property: "function",
  },
  {
    name: "type",
    property: "contract_type",
  },
];

enableScroll();

var jobs = await fetchData();
var italianJobs = await fetchItalianData();

language = Weglot.getCurrentLang();
if (language === "it") {
  init();
  render(italianJobs, filters);
} else {
  init();
  render(jobs, filters);
}

Weglot.on("languageChanged", function (newLang, prevLang) {
  if (newLang === "it") {
    init();
    render(italianJobs, filters);
  } else {
    init();
    render(jobs, filters);
  }
});
