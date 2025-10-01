import { db } from "../../data/db.js";

const expenseController = {
    create: async (req, res, next) => {
        try{
            const { date, amount, category, description } = req.body;
            const expenses = await db.readDB()
            if (!date || !amount || !category) {
                return res.status(400).json({ error: 'Date, amount, and category are required.' });
            }

            const newExpense = {
                id: Date.now().toString(),
                date,
                amount: parseFloat(amount),
                category,
                description: description || ''
            };

            expenses.push(newExpense)
            await db.writeDB(expenses)
            res.status(201).json(newExpense)
        }catch(err){
            next(err)
        }
    },
    getAll: async (req, res, next) => { 
        try{
            const expenses = await db.readDB()
            res.json(expenses)
        }catch(err){
            next(err)
        }
    },
    delete: async (req, res, next) => {
        try{
            const { id } = req.params;
            const expenses = await db.readDB()
            const index = expenses.findIndex(e => e.id === id);
            if (index === -1) {
                return res.status(404).json({ error: 'Expense not found.' });
            }
            expenses.splice(index, 1);
            await db.writeDB(expenses)
            res.status(204).end()
        }catch(err){
            next(err)
        }
    }
}

export default expenseController