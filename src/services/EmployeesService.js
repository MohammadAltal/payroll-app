
class EmployeesService {

    constructor() {
        this.storageKey = 'employees';
    }

    // Method to save employee data
    saveEmployee(employeeData) {

        const newEmployee = {
            ...employeeData,
            id: Math.floor(Math.random() * 900000) + 100000,  // Add the unique ID here
        };

        // Get existing employees from localStorage
        const employees = JSON.parse(localStorage.getItem(this.storageKey)) || [];

        // Add the new employee to the array
        employees.push(newEmployee);

        // Save the updated array back to localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(employees));
    }


    // Optional: Method to get all employees
    getAllEmployees() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

}

export default EmployeesService;
