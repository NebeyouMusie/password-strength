let password = document.getElementById('password');
let message = document.getElementById('message');
let strength = document.getElementById('strength');

function checkPasswordStrength(password) {
  let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
  let length = password.length;

  if (length < 8 || !regex.test(password)) {
    return 'weak';
  } else if ((length >= 8 && length < 12) || length < 16) {
    return 'medium';
  } else {
    return 'strong';
  }
}

function calculateTimeToCrack(password) {
  let characterSet = {
    lowercase: 26,
    uppercase: 26,
    digits: 10,
    special: 33
  };

  let totalPossibilities = 0;
  let complexity = 1;

  if (password.match(/[a-z]/)) {
    totalPossibilities += characterSet.lowercase;
    complexity *= characterSet.lowercase;
  }
  if (password.match(/[A-Z]/)) {
    totalPossibilities += characterSet.uppercase;
    complexity *= characterSet.uppercase;
  }
  if (password.match(/\d/)) {
    totalPossibilities += characterSet.digits;
    complexity *= characterSet.digits;
  }
  if (password.match(/\W/)) {
    totalPossibilities += characterSet.special;
    complexity *= characterSet.special;
  }

  let timeInSeconds = Math.pow(totalPossibilities, password.length) / (1000 * 1000 * 1000);
  return { time: timeInSeconds, complexity: complexity };
}

password.addEventListener('input', () => {
  if (password.value.length > 0) {
    message.style.display = 'block';
    let strengthLevel = checkPasswordStrength(password.value);
    let timeToCrack = calculateTimeToCrack(password.value);

    strength.innerHTML = strengthLevel;
    password.style.borderColor = strengthLevel === 'weak' ? '#ff5925' : strengthLevel === 'medium' ? 'yellow' : '#26d730';
    message.style.color = strengthLevel === 'weak' ? '#ff5925' : strengthLevel === 'medium' ? 'yellow' : '#26d730';

    message.innerHTML = `Estimated time to crack: ${timeToCrack.time.toFixed(2)} seconds with a complexity of ${timeToCrack.complexity.toLocaleString()} possibilities. This password is considered ${strengthLevel}.`;
  } else {
    message.style.display = 'none';
  }
});
