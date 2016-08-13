function isPrime(n) {
  for(var i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function checkGoldbach(n) {
  if (n < 4 || n % 2 !== 0) {
    console.log(null);
    return;
  }

  var num1 = 1,
      num2,
      found;

  while (num1 !== num2) {
    num1++;
    num2 = n - num1;

    if (isPrime(num1) && isPrime(num2)) {
      found = true;
      console.log(num1, num2);
    }
  }

  if (!found) {
    console.log(null);
  }
}
