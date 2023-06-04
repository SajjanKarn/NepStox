function share_amount(units, buyingPrice) {
  return units * buyingPrice;
}

function sebon_commission(shareAmount) {
  return ((0.015 / 100) * shareAmount).toFixed(2);
}

function cost_per_share(
  shareAmount,
  sebonCommission,
  brokerCommission,
  dpFee,
  units
) {
  return (
    (shareAmount + sebonCommission + brokerCommission + dpFee) /
    units
  ).toFixed(2);
}

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

  return bkcomm.toFixed(2);
}

function total_paying_amount(
  shareAmount,
  sebonCommission,
  brokerCommission,
  dpFee
) {
  return (shareAmount + sebonCommission + brokerCommission + dpFee).toFixed(2);
}

export {
  share_amount,
  sebon_commission,
  cost_per_share,
  total_paying_amount,
  broker_commission,
};
