export function disableScroll() {
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.classList.add("disable-scroll");
  document.body.style.paddingRight = scrollbarWidth + "px";
}

export function enableScroll() {
  document.body.classList.remove("disable-scroll");
  document.body.style.paddingRight = "0px";
}

export function formatDate(date) {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = date;
  let dateParts = tempDiv.textContent.split(" ")[0].split("-");
  let dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

  const now = new Date();
  const diffTime = Math.abs(now - dateObject);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
}

export function hideEmptyState() {
  document.querySelector(".empty_state").classList.add("hide");
}

export function showEmptyState() {
  document.querySelector(".empty_state").classList.remove("hide");
  document.querySelector("#load-more-container").classList.add("hide");
}

export function formatLongDescription(description) {
  description = description.replace(/<br \/>/g, "");
  description = description.replace(/<br\/>/g, "");
  description = description.replace(/<p><\/p>/g, "");
  description = description.replace(/<h2>/g, "<h3>");
  description = description.replace(/<\/h2>/g, "</h3>");
  return description;
}

export function getImage(company) {
  if (company === "Boutique Hotel Torre di Cala Piccola") {
    return TorreImage;
  } else if (company === "La Roqqa Hotel") {
    return LaRoqqaImage;
  } else {
    return MiramisImage;
  }
}

export function formatCompany(company) {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = company;
  let formattedCompany = tempDiv.textContent.replace(
    "Boutique Hotel Torre di Cala Piccola",
    "Torre di Cala Piccola"
  );
  return formattedCompany;
}

export function formatShortDescription(description) {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = description;
  let firstPTag = tempDiv.querySelector("p");

  let shortDescription = firstPTag
    ? firstPTag.textContent
        .replace("JOIN OUR COMMUNITY,", "Join our community")
        .replace(`"JOIN OUR COMMUNITY"`, "Join our community")
        .replace(`:`, "...")
    : "";
  return shortDescription;
}
