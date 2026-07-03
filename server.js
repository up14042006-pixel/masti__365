const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let deposits = [];
let subscribers = [];

app.get('/', (req, res) => {
    res.send('<h1>Masti365 Backend Server is Running Perfectly! 🚀</h1>');
});

app.post('/api/deposit', (req, res) => {
    const { amount, trxid } = req.body;
    if (!amount || !trxid) return res.status(400).json({ success: false });
    const newDeposit = { id: deposits.length + 1, amount, trxid, status: "Pending", date: new Date() };
    deposits.push(newDeposit);
    console.log("👉 New Deposit Logged:", newDeposit);
    res.status(200).json({ success: true, data: newDeposit });
});

app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email lazmi hai!" });
    
    const alreadySubscribed = subscribers.find(sub => sub.email === email);
    if (alreadySubscribed) return res.status(400).json({ success: false, message: "Pehle se registered hai!" });

    const newSubscriber = { id: subscribers.length + 1, email, date: new Date() };
    subscribers.push(newSubscriber);
    console.log("📧 New Subscriber Alert:", newSubscriber);
    res.status(200).json({ success: true, message: "Mubarak ho! Subscribe ho gaya. 🎉" });
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on: http://localhost:${PORT}`);
});
// 5. API to update Deposit Status (Approve / Reject)
app.post('/api/admin/update-status', (req, res) => {
    const { id, status } = req.body; // Form se ID aur new status milega

    if (!id || !status) {
        return res.status(400).json({ success: false, message: "Missing data fields!" });
    }

    // Database array mein se us unique deposit ko dhoondhein
    const depositItem = deposits.find(item => item.id === parseInt(id));

    if (depositItem) {
        depositItem.status = status; // Status update karein (Approved ya Rejected)
        console.log(`🔄 Deposit #${id} Status Updated to: ${status}`);
        return res.status(200).json({ success: true, message: `Deposit status updated to ${status}!` });
    } else {
        return res.status(404).json({ success: false, message: "Deposit not found!" });
    }
});

