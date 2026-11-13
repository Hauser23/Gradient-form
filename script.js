"use strict";

const authForm = document.querySelector("#auth-form");
const modeTitle = document.querySelector("#mode-title");
const modeToggle = document.querySelector("#mode-toggle");
const authDescription = document.querySelector("#auth-description");
const submitLabel = document.querySelector("#submit-label");
const forgotPassword = document.querySelector("#forgot-password");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#password-toggle");
const formMessage = document.querySelector("#form-message");
const backButton = document.querySelector("#back-button");

let isSignUp = false;

function showMessage(message) {
  formMessage.textContent = message;
}

function animateBackground(provider) {
  document.body.dataset.background = provider;
  const animation = document.body
    .getAnimations({ subtree: true })
    .find((item) => item.animationName === "gradient-flow");
  if (animation) {
    animation.currentTime = 0;
  }
}

function clearValidation() {
  authForm.querySelectorAll("input").forEach((input) => {
    input.removeAttribute("aria-invalid");
  });
}

function setMode(signUp) {
  isSignUp = signUp;
  modeTitle.textContent = signUp ? "Sign up" : "Sign in";
  modeToggle.textContent = signUp ? "Sign in" : "Sign up";
  modeToggle.setAttribute(
    "aria-label",
    `Switch to ${signUp ? "sign in" : "sign up"}`,
  );
  authDescription.textContent = signUp
    ? "Create an account to get started"
    : "Fill the form to sign into account";
  submitLabel.textContent = signUp ? "Sign Up" : "Sign In";
  showMessage("");
  clearValidation();
}

modeToggle.addEventListener("click", () => {
  setMode(!isSignUp);
});

backButton.addEventListener("click", () => {
  history.back();
});

passwordToggle.addEventListener("click", () => {
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text";
  passwordToggle.setAttribute("aria-pressed", String(!isVisible));
  passwordToggle.setAttribute(
    "aria-label",
    isVisible ? "Show password" : "Hide password",
  );
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  animateBackground("default");
  showMessage("");
  clearValidation();

  if (!authForm.checkValidity()) {
    authForm.querySelectorAll("input").forEach((input) => {
      if (!input.checkValidity()) {
        input.setAttribute("aria-invalid", "true");
      }
    });
    authForm.reportValidity();
    return;
  }

  showMessage(
    "This is a demo interface. Connect an authentication service to continue.",
  );
});

authForm.addEventListener("input", (event) => {
  if (event.target instanceof HTMLInputElement) {
    event.target.removeAttribute("aria-invalid");
    showMessage("");
  }
});

forgotPassword.addEventListener("click", (event) => {
  event.preventDefault();
  showMessage("Password reset is not connected yet.");
});

document.querySelectorAll(".social-button").forEach((button) => {
  button.addEventListener("click", () => {
    animateBackground(button.dataset.provider);
    showMessage(`${button.dataset.provider} sign-in is not connected yet.`);
  });
});
