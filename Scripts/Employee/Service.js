
app.service("employeeService", function ($http) {
    this.employeeList = function () {
        return $http.get("../Employee/EmployeeList");
    }

    //// Add Employee
    //this.AddEmployee = function (employee) {
    //    var response = $http({
    //        method: "post",
    //        url: "../Employee/SaveEmployee",
    //        data: JSON.stringify(employee),
    //        dataType: "json"
    //    });
    //    return response;
    //}

    // Get Employee By ID
    this.GetEmployeeByID = function (EmpID) {
        var response = $http({
            method: "post",
            url: "../Employee/GetEmployeeByID",
            params: {
                EmpID: JSON.stringify(EmpID)
            }
        });
        return response;
    }

    // Save Employee

    this.SaveEmployee = function (Employee) {
        var response = $http({
            method: "post",
            url: "../Employee/SaveEmployee",
            data: JSON.stringify(Employee),
            dataType: "json"
        });
        return response;
    }

    // Delete Employee

    this.DeleteEmployee = function (EmpID) {
        var response = $http({
            method: "post",
            url: "../Employee/DeleteEmployee",
            params: {
                EmpID: JSON.stringify(EmpID)
            }
        });
        return response;
    }
});