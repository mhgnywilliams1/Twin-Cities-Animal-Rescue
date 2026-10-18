"use strict";
// This educational demo stores only a help category, never contact details.
const HELP_OPTIONS = [
  { id: "adoption", label: "Adopting", advice: "Ask about the adoption process and which animals fit your household." },
  { id: "fostering", label: "Fostering", advice: "Learn about short-term care, supplies, and foster expectations." },
  { id: "volunteering", label: "Volunteering", advice: "Share your schedule and ask about events or animal care support." }
];
const STORAGE_KEYS = { helpChoice: "tcar-help-choice" };
const ERROR_MESSAGES = {
  fullname: "Enter your full name (at least 2 characters).",
  email: "Enter a valid email address.",
  interest: "Choose how you would like to help.",
  message: "Write at least 10 characters about your interest."
};
function getSavedChoice() {
  try { return localStorage.getItem(STORAGE_KEYS.helpChoice) || ""; }
  catch { return ""; }
}
function saveChoice(value) {
  try { if (value) localStorage.setItem(STORAGE_KEYS.helpChoice, value);
    else localStorage.removeItem(STORAGE_KEYS.helpChoice); }
  catch { /* The feature still works when storage is blocked. */ }
}
function showChoice(value) {
  const result = document.querySelector("#help-result");
  const link = document.querySelector("#help-link");
  if (!result || !link) return;
  const option = HELP_OPTIONS.find(item => item.id === value);
  result.textContent = option ? option.label + ": " + option.advice : "Choose an option to see how to get started.";
  link.hidden = !option;
  if (option) link.href = "contact.html?interest=" + encodeURIComponent(option.id);
}
function initHelpTool() {
  const select = document.querySelector("#help-choice");
  if (!select) return;
  const saved = getSavedChoice();
  if (HELP_OPTIONS.some(item => item.id === saved)) select.value = saved;
  showChoice(select.value);
  select.addEventListener("change", () => { saveChoice(select.value); showChoice(select.value); });
  document.querySelector("#clear-choice").addEventListener("click", () => {
    select.value = ""; saveChoice(""); showChoice("");
  });
}
function errorFor(field) {
  const value = field.value.trim();
  if (field.id === "fullname" && value.length < 2) return ERROR_MESSAGES.fullname;
  if (field.id === "email" && (!value || !field.validity.valid)) return ERROR_MESSAGES.email;
  if (field.id === "interest" && !HELP_OPTIONS.some(item => item.id === value)) return ERROR_MESSAGES.interest;
  if (field.id === "message" && value.length < 10) return ERROR_MESSAGES.message;
  return "";
}
function validateField(field) {
  const error = errorFor(field);
  document.getElementById(field.id + "-error").textContent = error;
  field.setAttribute("aria-invalid", error ? "true" : "false");
  field.setAttribute("aria-describedby", field.id + "-error");
  return !error;
}
function initInterestForm() {
  const form = document.querySelector("#interest-form");
  if (!form) return;
  const interest = document.querySelector("#interest");
  const urlChoice = new URLSearchParams(location.search).get("interest");
  const remembered = getSavedChoice();
  const choice = [urlChoice, remembered].find(value => HELP_OPTIONS.some(item => item.id === value));
  if (choice) interest.value = choice;
  const fields = ["fullname", "email", "interest", "message"].map(id => document.getElementById(id));
  fields.forEach(field => field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") validateField(field);
  }));
  interest.addEventListener("change", () => { saveChoice(interest.value); validateField(interest); });
  form.addEventListener("submit", event => {
    event.preventDefault(); // Demo site: never transmit personal details.
    const valid = fields.map(validateField).every(Boolean);
    const status = document.querySelector("#form-status");
    if (!valid) { status.textContent = "Please correct the highlighted fields before continuing.";
      fields.find(field => field.getAttribute("aria-invalid") === "true").focus(); return; }
    saveChoice(interest.value);
    status.textContent = "Your information looks complete. This is a classroom demo, so no inquiry was sent.";
  });
}
document.addEventListener("DOMContentLoaded", () => { initHelpTool(); initInterestForm(); });
