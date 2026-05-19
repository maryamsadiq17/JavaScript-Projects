const tempInput     = document.getElementById("temp-input");
const unitSelect    = document.getElementById("unit-select");
const convertButton = document.getElementById("convert-button");
const clearButton   = document.getElementById("clear-button");   // ← ADD
const resultBlock   = document.getElementById("result-block");   // ← ADD
const resultDisplay = document.getElementById("result-display");
const errorDisplay  = document.getElementById("error-display");

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

// Types of JS functions

// let fahrenheitToCelsius = function (fahrenheit) {
//   return ((fahrenheit - 32) * 5) / 9;
// };

// let celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;



function convertTemperature(value, unit) {
  if (unit === "celsius")    return celsiusToFahrenheit(value);
  if (unit === "fahrenheit") return fahrenheitToCelsius(value);
  throw new Error(`Unknown unit: ${unit}`);
}

// ✅ Updated — now clears input + resets select + hides result block
function clearUI() {
  tempInput.value           = "";
  unitSelect.value          = "celsius";
  resultDisplay.textContent = "";
  errorDisplay.textContent  = "";
  resultBlock.classList.add("hidden");   // hide the result box
}

// ✅ Updated — now reveals the result block when showing result
function showResult(converted, unit) {
  const toUnit    = unit === "celsius" ? "°F" : "°C";
  const fromUnit  = unit === "celsius" ? "°C" : "°F";
  const formatted = parseFloat(converted.toFixed(2));

  resultDisplay.textContent = `${formatted}${toUnit}`;
  errorDisplay.textContent  = "";
  resultBlock.classList.remove("hidden");  // show the result box

  console.log(`Converted ${tempInput.value}${fromUnit} to ${formatted}${toUnit}`);
}

function showError(message) {
  errorDisplay.textContent  = message;
  resultDisplay.textContent = "";
  resultBlock.classList.add("hidden");    // hide result box on error
}

function validateInput(rawValue) {
  const trimmed = rawValue.trim();

  if (trimmed === "") {
    return { valid: false, error: "Please enter a temperature value." };
  }

  const num = Number(trimmed);

  if (isNaN(num)) {
    return { valid: false, error: `"${trimmed}" is not a valid number.` };
  }

  if (!isFinite(num)) {
    return { valid: false, error: "Please enter a finite number." };
  }

  if (unitSelect.value === "celsius"    && num < -273.15) {
    return { valid: false, error: "Below absolute zero (−273.15°C)." };
  }

  if (unitSelect.value === "fahrenheit" && num < -459.67) {
    return { valid: false, error: "Below absolute zero (−459.67°F)." };
  }

  return { valid: true, value: num };
}

function handleConvert() {
  errorDisplay.textContent = "";         // clear only error before converting
  resultBlock.classList.add("hidden");   // hide result block until new result ready

  const validation = validateInput(tempInput.value);

  if (!validation.valid) {
    showError(validation.error);
    return;
  }

  const converted = convertTemperature(validation.value, unitSelect.value);
  showResult(converted, unitSelect.value);
}

// ← Wiring
convertButton.addEventListener("click", handleConvert);
clearButton.addEventListener("click", clearUI);        // ← ADD

tempInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleConvert();
});