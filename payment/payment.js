
  window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("paymentCompleted") === "true") {
    disableAllPayments();
  } else {
    const finalAmount = localStorage.getItem("finalAmount") || "0";
    document.getElementById("totalAmount").textContent = finalAmount;
  }
});


      
    const totalSpan = document.getElementById('totalAmount');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let discount = total * 0.1;
    let finalAmount = total - discount;
    totalSpan.textContent = finalAmount;

    document.querySelectorAll(".tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });

    document.getElementById("cardForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("cardName").value;
      const number = document.getElementById("cardNumber").value.replace(/\s/g, '');
      const expiry = document.getElementById("expiry").value;
      const cvv = document.getElementById("cvv").value;

      if (!name || number.length !== 16 || !expiry.match(/^\d{2}\/\d{2}$/) || cvv.length < 3) {
        alert("Please fill all fields correctly.");
        return;
      }

      paySuccess("Card");
    });

    async function paySuccess(method) {
      document.querySelector('.payment-container form')?.classList.add("hide");
      document.getElementById("success").style.display = "block";

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("🍽️ Food Restaurant Receipt", 20, 20);
      doc.setFontSize(12);
      let y = 35;
      cart.forEach(item => {
        doc.text(`${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`, 20, y);
        y += 8;
      });
      doc.text(`Subtotal: ₹${total}`, 20, y);
      y += 8;
      doc.text(`Discount: ₹${discount.toFixed(2)}`, 20, y);
      y += 8;
      doc.text(`Total Paid (${method}): ₹${finalAmount.toFixed(2)}`, 20, y);
      y += 12;
      doc.text("✅ Thank you for dining with us!", 20, y);
      doc.save("receipt.pdf");

      localStorage.removeItem('cart');
    }

    window.addEventListener('DOMContentLoaded', () => {
  const totalSpan = document.getElementById('totalAmount');

  // Try to get finalAmount
  let finalAmount = localStorage.getItem('finalAmount');

  // If not found, recalculate from cart
  if (!finalAmount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });

    const discount = total * 0.1;
    finalAmount = (total - discount).toFixed(2);

    localStorage.setItem('finalAmount', finalAmount); // Save for later use
  }

  // Display the total
  totalSpan.textContent = finalAmount;
});


function completePayment() {
  alert("✅ Payment successful! Thank you for your order.");

  // Disable payment button
  const payButton = document.getElementById("payBtn");
  payButton.disabled = true;
  payButton.textContent = "Payment Completed";

  // Clear cart & final amount
  localStorage.removeItem("cart");
  localStorage.removeItem("finalAmount");

 localStorage.setItem("paymentCompleted", "true");


}
// check for empty cart 

window.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const finalAmount = localStorage.getItem("finalAmount");

  // Prevent payment if cart is empty or amount is gone
  if (cart.length === 0 || !finalAmount) {
    alert("⚠️ No items to pay for. Redirecting to menu...");
    window.location.href = "index.html"; // or show empty state
    return;
  }

  // Fill total
  document.getElementById("totalAmount").textContent = finalAmount;
});


// toggle the menu bar 
  function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
  }