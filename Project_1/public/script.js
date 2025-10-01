const addBtn = document.getElementById("addBtn")
const expenseForm = document.getElementById("expenseForm")
const formCancel = document.getElementById("formCancel")


const dateInput = document.getElementById('date')
const amountInput = document.getElementById('amount')
const categoryInput = document.getElementById('category')
const descInput = document.getElementById('desc')

const expenseList = document.getElementById('expenseList')
const emptyState = document.getElementById('emptyState')
const totalAmount = document.getElementById('totalAmount')
const searchInput = document.getElementById('search')

const url = "http://localhost:3636/expenses"

function updateTotal(expenses){
    const total = expenses.reduce((sum, e)=> sum + Number(e.amount), 0)
    totalAmount.textContent = `$${total.toFixed(2)}`
}

function renderExpenses(){
    expenseList.innerHTML = ""

    if(expenses.length === 0){
        emptyState.style.display = "block"
        expenseList.hidden = true
        updateTotal([])
        return
    }

    emptyState.style.display = "none"
    expenseList.hidden = false

    expenses.forEach(expense => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${expense.description || "No description"}</strong>
                <span> (${expense.category})</span><br>
                <small>${expense.date}</small>
            </div>
            <div>
                $${Number(e.amount).toFixed(2)}
                <button class="delBtn">Delete</button>
            </div>
            `;

        li.querySelector(".delBtn").addEventListener("click", async ()=>{
            await fetch(`${url}/${expense.id}`, {method: "DELETE"})
            loadExpenses()
        });

        expenseList.appendChild(li)
    });

    updateTotal(expenses)
}

function openForm() {
    expenseForm.style.display = "block"
}

function closeForm() {
    expenseForm.style.display = "none"
    expenseForm.reset()
}

addBtn.addEventListener("click", openForm)
formCancel.addEventListener("click", closeForm)

expenseForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const expense = {
        date: dateInput.value,
        amount: amountInput.value,
        category: categoryInput.value,
        description: descInput.value,
    }

    if (!expense.date || !expense.amount || !expense.category) return

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
    })

    loadExpenses()
    closeForm()
})

async function loadExpenses() {
    const res = await fetch(url)
    const data = await res.json()
    renderExpenses(data)
}

function init() {
    expenseForm.style.display = "none"
    loadExpenses()
}
init()