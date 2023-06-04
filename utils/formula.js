function broker_commission(total) {
  let bkcomm;

  if (total <= 50000) {
    bkcomm = (0.4 / 100) * total;
  } else if (total > 50000 && total <= 500000) {
    bkcomm = (0.37 / 100) * total;
  } else if (total > 500000 && total <= 2000000) {
    bkcomm = (0.34 / 100) * total;
  } else if (total > 2000000 && total <= 10000000) {
    bkcomm = (0.3 / 100) * total;
  } else {
    bkcomm = (0.27 / 100) * total;
  }

  if (bkcomm <= 10) {
    bkcomm = 10;
  }

  return bkcomm;
}

export { broker_commission };
