let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
    let text = document.getElementById("text").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (text === "" || isNaN(amount)) return;

    let transaction = {
        id: Date.now(),
        text,
        amount
    };

    transactions.push(transaction);
    update();
    save();

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
}

function update() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let income = 0, expense = 0;

    transactions.forEach(t => {
        let li = document.createElement("li");

    if (t.amount > 0) {
        li.classList.add("income-item");
    } else {
        li.classList.add("expense-item");
    }

        li.innerHTML = `
            ${t.text} 
            <span class="amount">₹${t.amount}</span>
        `;

        let btn = document.createElement("button");
        btn.innerText = "X";
        btn.onclick = () => {
            transactions = transactions.filter(item => item.id !== t.id);
            update();
            save();
        };

        li.appendChild(btn);
        list.appendChild(li);

        if (t.amount > 0) income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + Math.abs(expense);
    document.getElementById("balance").innerText = "₹" + (income + expense);
}

function save() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

update();