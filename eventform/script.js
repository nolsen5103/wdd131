const form = document.querySelector("#event-form");
const typeSelect = document.querySelector("#type");
const typeDetails = document.querySelector("#type-details");
const detailsLabel = document.querySelector("#details-label");
const detailsInput = document.querySelector("#details-input");
const messages = document.querySelector("#messages");
const dateInput = document.querySelector("#date");

// Prevent the user from selecting today or an earlier date.
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const year = tomorrow.getFullYear();
const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
const day = String(tomorrow.getDate()).padStart(2, "0");
dateInput.min = `${year}-${month}-${day}`;

typeSelect.addEventListener("change", () => {
  const isStudent = typeSelect.value === "student";
  const isGuest = typeSelect.value === "guest";

  typeDetails.classList.toggle("hidden", !isStudent && !isGuest);
  detailsInput.required = isStudent || isGuest;

  if (isStudent) {
    detailsLabel.textContent = "Student I#";
    detailsInput.placeholder = "Enter your 9-digit I number";
    detailsInput.inputMode = "numeric";
  } else if (isGuest) {
    detailsLabel.textContent = "Access Code";
    detailsInput.placeholder = "Enter Access Code";
    detailsInput.inputMode = "text";
  } else {
    detailsLabel.textContent = "";
    detailsInput.placeholder = "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  messages.replaceChildren();

  const errors = [];
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const selectedDate = dateInput.value;
  const type = typeSelect.value;
  const details = detailsInput.value.trim();

  if (!name) errors.push("Please enter your name.");
  if (!email || !email.includes("@")) errors.push("Please enter a valid email address.");
  if (!selectedDate) {
    errors.push("Please choose an event date.");
  } else if (selectedDate < dateInput.min) {
    errors.push("The event date must be later than today.");
  }
  if (!type) errors.push("Please choose Student or Guest.");

  if (type === "student" && !/^\d{9}$/.test(details)) {
    errors.push("Student I# must contain exactly 9 digits.");
  }
  if (type === "guest" && details !== "EVENT131") {
    errors.push("The guest access code is incorrect.");
  }

  if (errors.length > 0) {
    const errorBox = document.createElement("div");
    errorBox.className = "error";
    errorBox.setAttribute("role", "alert");
    errorBox.innerHTML = `<h2>Please correct these errors:</h2><ul>${errors.map((error) => `<li>${error}</li>`).join("")}</ul>`;
    messages.append(errorBox);
    return;
  }

  const successBox = document.createElement("div");
  successBox.className = "success";
  successBox.innerHTML = `
    <h2>Registration successful!</h2>
    <p>Thank you, ${name}. Your ticket has been reserved for ${selectedDate}.</p>
    <p>Please check ${email} for your event information.</p>`;
  messages.append(successBox);
  form.reset();
  typeDetails.classList.add("hidden");
  detailsInput.required = false;
});
