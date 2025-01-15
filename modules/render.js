import { el } from "./elements.js";
import { IMAGES } from "./config.js";
import {
  disableScroll,
  enableScroll,
  formatDate,
  formatCompany,
} from "./utility.js";

var currentPath = window.location.pathname;
let JobNode = el.job.item.cloneNode(true);
let FilterNode = el.filter.item.cloneNode(true);
let TagNode = el.tag.item.cloneNode(true);
let jobCount = 0;

export function render(jobs, filters) {
  el.filterList.innerHTML = "";
  el.jobList.innerHTML = "";
  el.tagList.innerHTML = "";

  filters.forEach((item) => {
    createFilter(item.name, jobs, item.property, FilterNode);
    createTag(item.name, TagNode);
  });

  jobs.forEach((job) => {
    createJob(job, JobNode, filters);
    jobCount++;
  });

  if (jobCount > 5) {
    document.querySelector("#load-more-container").classList.remove("hide");
  }
}

function createFilter(name, array, property, node) {
  const filter = node.cloneNode(true);
  const dropdownTrigger = filter.querySelector(`[filter=dropdown-trigger]`);
  const dropdown = filter.querySelector(`[filter=dropdown]`);
  const category = filter.querySelector(`[filter=category]`);
  const button = filter.querySelector(`[filter=button]`);

  dropdownTrigger.addEventListener("click", (e) => {
    document.querySelectorAll(`[filter=dropdown]`).forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
    dropdown.classList.toggle("active");
  });

  category.textContent = name;
  dropdown.innerHTML = "";

  const filterList = [...new Set(array.map((item) => item[property]))];
  filterList.forEach((item) => {
    const tempButton = button.cloneNode(true);
    const buttonText = tempButton.querySelector(`[filter=text]`);
    buttonText.textContent = formatCompany(item);
    tempButton.setAttribute("data-filter", "true");
    tempButton.setAttribute("data-filter-category", name);
    tempButton.setAttribute("data-filter-value", item);
    dropdown.appendChild(tempButton);
  });

  el.filterList.appendChild(filter);
}

function createJob(data, node, filters) {
  console.log("data", data);
  const jobNode = node.cloneNode(true);
  const drawer = jobNode.querySelector(`[stormfors="drawer"]`);

  let icon = jobNode.querySelector(`[job-data="icon"]`);
  if (data.project_label === "La Roqqa Hotel") {
    icon.src = IMAGES.laroqqa;
  } else if (formatCompany(data.project_label) === "Torre di Cala Piccola") {
    icon.src = IMAGES.torre;
  } else {
    icon.src = IMAGES.miramis;
  }

  jobNode.querySelector(`[job-data="title"]`).textContent = data.title;
  jobNode.querySelector(`[job-data="brand"]`).textContent = formatCompany(
    data.project_label
  );
  jobNode.querySelector(`[job-data="location"]`).textContent = data.location;
  jobNode.querySelector(`[job-data="type"]`).textContent = data.contract_type;
  jobNode.querySelector(`[job-data="department"]`).textContent = data.function;
  jobNode.querySelector(`[job-data="date"]`).textContent = formatDate(
    data.published
  );

  jobNode.querySelector(`[stormfors="drawer"]`).id = data.slug;
  jobNode.querySelector(`[drawer="apply"]`).href = data.url;
  jobNode.querySelector(`[drawer="title"]`).textContent = data.title;
  jobNode.querySelector(`[drawer="brand"]`).textContent = data.project_label;
  jobNode.querySelector(`[drawer="location"]`).textContent = data.location;
  jobNode.querySelector(`[drawer="type"]`).textContent = data.contract_type;
  jobNode.querySelector(`[drawer="content"]`).innerHTML = data.description;

  jobNode.addEventListener("click", (e) => {
    disableScroll();
    console.log("Job clicked");
    drawer.classList.add("active");
    history.pushState({ drawerId: data.id }, "", `${currentPath}#${data.slug}`);

    setTimeout(() => {
      drawer.focus();
      drawer.setAttribute("tabindex", "-1");
    }, 100);
  });

  jobNode.querySelector(`[drawer="close"]`).addEventListener("click", (e) => {
    console.log("Close button clicked");
    e.stopPropagation();
    e.preventDefault();
    drawer.classList.remove("active");
    history.pushState({}, "", currentPath);
    enableScroll();
  });

  filters.forEach((item) => {
    jobNode.setAttribute(`${item.name}`, data[item.property]);
  });

  if (jobCount > 5) {
    jobNode.style.display = "none";
  }

  el.jobList.appendChild(jobNode);
}

function createTag(type, node) {
  const tag = node.cloneNode(true);
  tag.setAttribute("data-tag", type);
  tag.style.display = "none";
  el.tagList.appendChild(tag);
}
