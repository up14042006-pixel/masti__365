document.addEventListener("DOMContentLoaded", () => {
    const proofInput = document.getElementById("proof");
    const previewImage = document.getElementById("preview");

    if(proofInput && previewImage) {
        proofInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                previewImage.src = URL.createObjectURL(file);
                previewImage.style.display = "block";
            }
        });
    }

    const depositForm = document.getElementById("depositForm");
    if(depositForm) {
        depositForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const amount = document.getElementById("amount").value;
            const trxid = document.getElementById("trxid").value;
            
            fetch('http://localhost:3000/api/deposit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, trxid })
            })
            .then(res => res.json())
            .then(data => {
                const msg = `👋 *NEW DEPOSIT REQUEST - MASTI365* \n\n💰 *Amount:* Rs. ${amount}\n🆔 *TrxID:* ${trxid}`;
                window.open(`https://whatsapp.com{encodeURIComponent(msg)}`, '_blank');
            })
            .catch(err => {
                window.open(`https://whatsapp.com{encodeURIComponent("Offline TrxID: " + trxid)}`, '_blank');
            });
        });
    }
});
