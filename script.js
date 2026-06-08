function calculate() {

    const amount =
        Number(document.getElementById("amount").value);

    const buyPrice = 75;

    const currentPrice = 200;

    const shares = amount / buyPrice;

    const currentValue =
        shares * currentPrice;

    const profit =
        currentValue - amount;

    document.getElementById("result").innerText =
        `Your investment would be worth $${currentValue.toFixed(2)}
         (Profit: $${profit.toFixed(2)})`;
}
