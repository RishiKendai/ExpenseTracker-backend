// Import modules
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'this-is-a-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none'
    }
}));

/// env configuration
require('dotenv').config();
// PORT configuration
const port = process.env.PORT | 5000;

/// DB Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('mongodb connected')).catch(err => console.log(err));

/// Routes
const User = require('./routes/userRoute');
const Label = require('./routes/labelRoute');
const ExpenseList = require('./routes/expenseListRoute');
const Expense = require('./routes/expenseRoute.js');
const DailyExpense = require('./routes/dailyExpenseRoute');
// const CollaborateExpense = require('./routes/collaborateExpenseRoute');

/// API endpoint for routes
app.use('/api/user', User);
app.use('/api/label', Label);
app.use('/api/expense-list', ExpenseList);
app.use('/api/expense', Expense);
app.use('/api/daily-expense', DailyExpense);
// app.use('/api/collaborate-expense', CollaborateExpense);

app.get('/', (req, res) => {
    res.send('server running');
});
app.listen(port, () => {
    console.log(`link: http://localhost:${port}`);
});