
class SalariesService {

    constructor() {
        this.storageKey = 'payments';
    }

    // Method to get all payments from localStorage
    getPayments() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    // Method to check if a payment already exists for the given month and year
    paymentExists(month, year, staff_id) {
        const payments = this.getPayments();
        return payments.some(payment => payment.month === month && payment.year === year && payment.staff_id === staff_id);
    }

    savePayment(payment) {
        if (this.paymentExists(payment.month, payment.year, payment.staff_id)) {
            return { success: false, message: "The salary for "+ payment.month +" already released" };
        }

        // Retrieve existing payments from localStorage
        const payments = this.getPayments();

        // Add the new payment to the array
        payments.push(payment);

        // Save the updated array back to localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(payments));

        return { success: true, message: "The salary for "+ payment.month +" released successfully!" };
    }


}

export default SalariesService;
