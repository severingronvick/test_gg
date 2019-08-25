let limits = {"100": 20, "200": 10, "500": 5, "1000": 1, "2000": 2, "5000": 5},
  nominals = ["5000", "2000", "1000", "500", "200", "100"];

function atm(sum) {
  if (sum % 100 != 0) return "Error: bad sum";
  let needSum = sum, result = [], newLimits = Object.assign({}, limits);
  for (let i = 0; i < nominals.length; i++) {
    let nominal = nominals[i],
     count = Math.min(limits[nominal], Math.floor(needSum / (+nominal)));
    needSum -= (+nominal) * count;
    newLimits[nominal] -= count;
    if (count != 0) result.push(`${nominal}x${count}`);
  }
  if (needSum != 0) return "Error: not enough money";
  limits = newLimits;
  return result.join(" ");
}
