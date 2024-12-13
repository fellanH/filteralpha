export const el = {
  mainContainer: document.querySelector(`[stormfors="container"]`),
  jobList: document.querySelector(`[stormfors="job-list"]`),
  filterList: document.querySelector(`[stormfors="filter-list"]`),
  tagList: document.querySelector(`[stormfors="tag-list"]`),
  filter: {
    item: document.querySelector(`[stormfors-filter="item"]`),
    dropdown: document.querySelector(`[filter="dropdown"]`),
    button: document.querySelector(`[filter="button"]`),
    reset: document.querySelector(`[filter="reset"]`),
  },
  job: {
    item: document.querySelector(`[stormfors="item"]`),
    brand: document.querySelector(`[job-data="brand"]`),
    title: document.querySelector(`[job-data="title"]`),
    location: document.querySelector(`[job-data="location"]`),
    type: document.querySelector(`[job-data="type"]`),
    department: document.querySelector(`[job-data="department"]`),
    date: document.querySelector(`[job-data="date"]`),
  },
  drawer: {
    trigger: document.querySelector(`[stormfors="drawer-trigger"]`),
    content: document.querySelector(`[stormfors="drawer-content"]`),
    close: document.querySelector(`[stormfors="drawer-close"]`),
  },
  tag: {
    item: document.querySelector(`[stormfors="filter-tag"]`),
    close: document.querySelector(`[filter-tag="close"]`),
    text: document.querySelector(`[filter-tag="text"]`),
  },
};
