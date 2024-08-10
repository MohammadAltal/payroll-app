
class EmployeesService {

    constructor() {
        this.storageKey = 'employees';
    }

    // Method to save employee data
    saveEmployee(employeeData) {
        if (this.getEmployeeByStaffId(employeeData.staff_id)){
            return { status: false, message: 'Staff ID already used!' };
        }

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

        return { status: true, message: 'Employee added successful!' };
    }


    // Optional: Method to get all employees
    getAllEmployees() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    // Method to delete an employee by ID
    deleteEmployee(employeeId) {
        let employees = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        employees = employees.filter(employee => employee.id !== employeeId);
        localStorage.setItem(this.storageKey, JSON.stringify(employees));
    }

    getEmployeeById(id) {
        const employees = this.getAllEmployees();
        return employees.find(employee => employee.id == id);
    }

    getEmployeeByStaffId(staffId) {
        const employees = this.getAllEmployees();
        return employees.find(employee => employee.staff_id == staffId);
    }

    updateEmployeeById(id, updatedEmployee) {
        const check = this.getEmployeeByStaffId(updatedEmployee.staff_id);
        if (check && check.id != updatedEmployee.id){
            return { status: false, message: 'Staff ID already used!' };
        }

        const employees = this.getAllEmployees();
        const updatedEmployees = employees.map(employee =>
            employee.id == id ? { ...employee, ...updatedEmployee } : employee
        );

        localStorage.setItem('employees', JSON.stringify(updatedEmployees));

        return { status: true, message: 'Employee updated successful!' };
    }
}

export default EmployeesService;
