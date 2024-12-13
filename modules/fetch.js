import { URL } from "./config.js";

export function fetchData() {
  const data = fetch(
    "https://zinrec.intervieweb.it/annunci.php?lang=en&LAC=erqole&d=miramis.com&k=603e695eadef987e4321536bd158a881&CodP=&format=json_en&utype=0"
  )
    .then((response) => response.json())
    .then((data) => data);
  console.log(data);
  return data;
}

export function fetchItalianData() {
  const data = fetch(
    "https://zinrec.intervieweb.it/annunci.php?lang=it&LAC=erqole&d=miramis.com&k=603e695eadef987e4321536bd158a881&CodP=&format=json_en&utype=0"
  )
    .then((response) => response.json())
    .then((data) => data);

  console.log(data);
  return data;
}
