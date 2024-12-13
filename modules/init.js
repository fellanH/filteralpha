import { Filter } from "./filter.js";

export function init() {
  let jobElements;
  let dropdowns;
  const filter = new Filter();

  function setClickEvents() {
    document.addEventListener("click", (e) => {
      const target = e.target;
      console.log(target);
      if (
        target.matches("[stormfors=load-more]") ||
        target.closest("[stormfors=load-more]")
      ) {
        console.log("load more");
        let allJobs = document.querySelectorAll(".job_item");
        allJobs.forEach((job) => {
          job.style.display = "";
        });
        document.querySelector("#load-more-container").classList.add("hide");
      }
      if (
        target.matches("[filter-tag=close]") ||
        target.closest("[filter-tag=close]")
      ) {
        const tag = target.closest("[data-tag]");
        const filterType = tag.getAttribute("data-tag");
        filter.removeFilter(filterType);
      }
      if (
        target.matches("[filter=button]") ||
        target.closest("[filter=button]")
      ) {
        let button = target.closest("[filter=button]");
        let filterCategory = button.getAttribute("data-filter-category");
        let filterValue = button.getAttribute("data-filter-value");
        filter.setFilter(filterCategory, filterValue);
      }
      if (
        target.matches("[filter=reset]") ||
        target.closest("[filter=reset]")
      ) {
        filter.resetFilters();
      }
      if (
        target.matches("[filter=dropdown-trigger]") ||
        target.closest("[filter=dropdown-trigger]")
      ) {
        const trigger = target.closest("[filter=dropdown-trigger]");
        const dropdown = trigger.closest("[filter=dropdown]");

        // Close all other dropdowns first
        dropdowns.forEach((d) => {
          if (d !== dropdown) {
            d.classList.remove("active");
          }
        });

        // Toggle the clicked dropdown
        dropdown.classList.toggle("active");
      }

      if (target != dropdowns) {
        let tempDropdowns = document.querySelectorAll("[filter=dropdown]");
        tempDropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeElements);
  } else {
    initializeElements();
  }

  function initializeElements() {
    checkUrlForDrawer();
    console.log("initialized");
    dropdowns = document.querySelectorAll("[filter=dropdown]");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
    jobElements = document.querySelectorAll(`[stormfors="item"]`);
    setClickEvents();
  }
}

function checkUrlForDrawer() {
  try {
    const pathParts = window.location.href.split("#");
    if (pathParts.length < 2) return;

    const drawerSlug = pathParts[pathParts.length - 1];
    if (!drawerSlug) return;

    const jobDrawer = document.querySelector(`#${drawerSlug}`);

    if (!jobDrawer) {
      // If element isn't found, try again after a short delay
      console.log("Job drawer not found, retrying...");
      setTimeout(() => checkUrlForDrawer(), 100); // Retry after 100ms
      return;
    }

    console.log("check url for jobDrawer", jobDrawer, drawerSlug);
    jobDrawer.classList.add("active");
    jobDrawer.scrollIntoView();
  } catch (error) {
    console.error("Error checking URL for drawer:", error);
  }
}
