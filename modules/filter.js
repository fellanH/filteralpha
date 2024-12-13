import { hideEmptyState, showEmptyState } from "./utility.js";
import { formatCompany } from "./utility.js";

export class Filter {
  constructor() {
    this.activeFilters = new Map();
  }

  setFilter(type, value) {
    this.activeFilters.set(type, value);
    this.applyFilters();
    this.renderTags();
  }

  applyFilters() {
    document.querySelector("#load-more-container").classList.add("hide");
    const jobs = document.querySelectorAll('[stormfors="item"]');
    let visibleJobs = 0;

    jobs.forEach((job) => {
      const visible = Array.from(this.activeFilters).every(
        ([filterType, filterValue]) => {
          const jobAttribute = job.getAttribute(filterType);
          const matches = jobAttribute === filterValue;
          return matches;
        }
      );
      job.style.display = visible ? "" : "none";
      if (visible) visibleJobs++;
    });

    if (visibleJobs === 0 && this.activeFilters.size > 0) {
      const brandFilter = this.activeFilters.get("brand") || "";
      const functionFilter = this.activeFilters.get("department") || "";
      const locationFilter = this.activeFilters.get("location") || "";
      const typeFilter = this.activeFilters.get("type") || "";
      showEmptyState(brandFilter, functionFilter, locationFilter, typeFilter);
    } else {
      hideEmptyState();
    }
  }

  removeFilter(type) {
    this.activeFilters.delete(type);
    this.applyFilters();

    const tag = document.querySelector(`[data-tag="${type}"]`);
    if (tag) {
      tag.style.display = "none";
    }
  }

  resetFilters() {
    let jobs = document.querySelectorAll(`[stormfors="item"]`);
    let tags = document.querySelectorAll(`[data-tag]`);
    document.querySelector(".empty_state").style.display = "none";
    document.querySelector("#load-more-container").classList.add("hide");
    this.activeFilters.clear();
    let jobCount = 0;
    jobs.forEach((job) => {
      job.style.display = "";
      jobCount++;
      if (jobCount > 5) {
        job.style.display = "none";
      }
    });
    tags.forEach((tag) => (tag.style.display = "none"));
    if (jobCount > 5) {
      document.querySelector("#load-more-container").classList.remove("hide");
    }
  }

  renderTags() {
    let filters = Array.from(this.activeFilters);
    filters.forEach((item) => {
      const tag = document.querySelector(`[data-tag="${item[0]}"]`);
      if (tag) {
        tag.querySelector("[filter-tag=text]").textContent = formatCompany(
          item[1]
        );
        tag.style.display = "";
      }
    });
  }
}
