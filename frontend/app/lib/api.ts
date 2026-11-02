import axios from "axios";
const BASE_URL = "http://localhost:8000/api/json-value/?key="; // change if needed
const ODR_URL = "http://localhost:8000/api/"
export const fetchBasicInfo = () =>
  axios.get(`${BASE_URL}basics`).then(res => res.data);

export const fetchProfiles = () =>
  axios.get(`${BASE_URL}profiles`).then(res => res.data);

export const fetchEducation = () =>
  
  axios.get(`${BASE_URL}education`).then(res => res.data);

// export const fetchEducation = () =>
//   axios.get(`${ODR_URL}education`).then(res => res.data);


export const fetchLanguages = () =>
  axios.get(`${BASE_URL}languages`).then(res => res.data); // <--- THIS IS CORRECT


export const fetchPublications = () =>
  axios.get(`${BASE_URL}publications`).then((res) => res.data);


export const fetchExperiences = () =>
  axios.get(`${BASE_URL}experiences`).then((res) => res.data);


export async function fetchSoftSkills() {
  return axios.get(`${BASE_URL}softSkills`).then((res) => res.data);
}

// lib/api/interests.ts
export async function fetchInterests() {
  return axios.get(`${BASE_URL}interests`).then((res) => res.data);
}

// lib/api/references.ts
export async function fetchReferences() {
  return axios.get(`${BASE_URL}references`).then((res) => res.data);
}

// lib/api/references.ts
export async function fetchSkills() {
  return axios.get(`${BASE_URL}skills`).then((res) => res.data);
}


// lib/api/references.ts
export async function fetchCertificates() {
  return axios.get(`${BASE_URL}certifications%20and%20courses`).then((res) => res.data);
}

