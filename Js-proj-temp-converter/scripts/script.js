const tempInput = document.getElementById("temp-input");
const unitSelect = document.getElementById("unit-select");
const convertButton = document.getElementById("convert-button");
const resultDisplay = document.getElementById("result-display");
const errorDisplay = document.getElementById("error-display");

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function convertTemprature(value, unit) {
  if (unit == "celsius") return celsiusToFahrenheit(value);
  if (unit == "fahrenheit") return fahrenheitToCelsius(value);
  throw new Error(`unknown unit: ${unit}`);
}

function clearUI() {
  resultDisplay.textContent = "";
  errorDisplay.textContent = "";
}

function showResult(converted, unit) {
  const toUnit = unit === "celsius" ? "°F" : "°C";
  const fromUnit = unit === "celsius" ? "°C" : "°F";
  const formatted = parseFloat(converted.toFixed(2));
  resultDisplay.textContent = `${formatted}${toUnit}`;
  errorDisplay.textContent = "";
}

function showError(message) {
  errorDisplay.textContent = message;
  resultDisplay.textContent = "";
}

function validateInput(rawValue) {
  const trimmed = rawValue.trim();

  if (trimmed === "") {
    return { valid: false, error: "Please enter a temprature value." };
  }
  const num = Number(trimmed);

  if (isNaN(num)) {
    return { valid: false, error: `"${trimmed}" is not a valid number.` };
  }

  if (unitSelect.value === "celsius" && num < -459.67) {
    return {
      valid: false,
      error: "Below absolute zero (−459.67°F). Not physically possible.",
    };
  }

  return { valid: true, value: num };
}

function handleConvert() {
  clearUI();

  const validation = validateInput(tempInput.value);

  if (!validation.valid) {
    showError(validation.error);
    return; // early return = no nested if/else
  }

  const converted = convertTemperature(validation.value, unitSelect.value);
  showResult(converted, unitSelect.value);
}

convertBtn.addEventListener("click", handleConvert);

tempInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleConvert();
});
