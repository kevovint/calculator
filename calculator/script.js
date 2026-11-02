var display = document.getElementById("display");
var buttons = document.querySelectorAll("#buttons button");

function calculate(a, op, b) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }
}

function showResult() {
  var tokens = display.value.match(/\d+\.?\d*|[+\-*\/]/g);

  var valid = tokens !== null && tokens.join("") === display.value && tokens.length % 2 === 1;
  for (var k = 0; valid && k < tokens.length; k += 2) {
    if (!/^\d/.test(tokens[k])) valid = false;
  }

  if (!valid) {
    display.value = "Error";
    return;
  }

  try {
    var numbers = [parseFloat(tokens[0])];
    var ops = [];

    for (var i = 1; i < tokens.length; i += 2) {
      var op = tokens[i];
      var num = parseFloat(tokens[i + 1]);

      if (op === "*" || op === "/") {
        numbers[numbers.length - 1] = calculate(numbers[numbers.length - 1], op, num);
      } else {
        ops.push(op);
        numbers.push(num);
      }
    }

    var result = numbers[0];
    for (var j = 0; j < ops.length; j++) {
      result = calculate(result, ops[j], numbers[j + 1]);
    }

    display.value = String(parseFloat(result.toFixed(10)));
  } catch (e) {
    display.value = "Error";
    alert(e.message);
  }
}

function handleClick(value) {
  if (display.value === "Error") {
    display.value = "0";
  }

  if (value === "C") {
    display.value = "0";
  } else if (value === "=") {
    showResult();
  } else if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {
    display.value = display.value + value;
  }
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    handleClick(this.textContent);
  });
}