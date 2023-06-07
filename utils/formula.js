// buy screen
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

// sell screen
function sell_result(units, purchasePrice, sellingPrice, cgtPercentage) {
  const shareAmount = units * sellingPrice;
  const purchasedPrice = purchasePrice;
  const sebonCommission = ((0.015 / 100) * shareAmount).toFixed(2);
  const brokerCommission = broker_commission(shareAmount);
  const dpFee = 25;

  // for buy
  const total_purchased_price = Number(units) * Number(purchasePrice);
  const sebon_commission_buy = sebon_commission(total_purchased_price);
  const broker_commission_buy = broker_commission(total_purchased_price);
  const total_purchased_amount = total_paying_amount(
    Number(total_purchased_price),
    Number(sebon_commission_buy),
    Number(broker_commission_buy),
    Number(dpFee)
  );

  // final calculation
  const netProfit =
    Number(shareAmount) -
    Number(total_purchased_amount) -
    Number(sebonCommission) -
    Number(brokerCommission) -
    Number(dpFee);

  const cgt = (Number(cgtPercentage) / 100) * netProfit;
  const receivableAmount = (
    shareAmount -
    cgt -
    brokerCommission -
    dpFee -
    sebonCommission
  ).toFixed(2);
  const profit =
    Number(shareAmount) -
    Number(total_purchased_amount) -
    Number(sebonCommission) -
    Number(brokerCommission) -
    Number(dpFee) -
    Number(cgt);

  return {
    shareAmount,
    purchasedPrice,
    sebonCommission,
    brokerCommission,
    dpFee,
    total_purchased_amount,
    cgt,
    receivableAmount,
    netProfit: profit,
  };
}

// adjustment screen
function right_share(marketPrice, rightSharePercentage, paidUpValue) {
  return (
    (marketPrice + (paidUpValue * rightSharePercentage) / 100) /
    (1 + rightSharePercentage / 100)
  ).toFixed(2);
}

function bonus_share(marketPrice, bonusSharePercentage) {
  return (marketPrice / (1 + bonusSharePercentage / 100)).toFixed(2);
}

export {
  // buy screen
  share_amount,
  sebon_commission,
  cost_per_share,
  total_paying_amount,
  broker_commission,
  // sell screen
  sell_result,
  // adjustment screen
  right_share,
  bonus_share,
};
