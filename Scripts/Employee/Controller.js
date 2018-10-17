
app.controller("employeeController", function ($scope, employeeService) {
    $scope.divEmployee = false;
    EmployeeList();
    function EmployeeList() {
        debugger;
        var employeeList = employeeService.employeeList();
        employeeList.then(function (employee) {
            $scope.employeeList = employee.data;
        }, function () { alert("Employee details cannot be found"); });
    }

    function ClearFields() {
        $scope.EmpID = "";
        $scope.EmpName = "";
        $scope.BasicPay = "";
        $scope.Allowance = "";
    }

    $scope.SaveEmployeeDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divEmployee = true;
    }
    $scope.Cancel = function () {
        $scope.divEmployee = false;
    };

    $scope.EditEmployee = function (employee) {
        var GetEmployeeByID = employeeService.GetEmployeeByID(employee.EmpID);
        GetEmployeeByID.then(function (_employee) {
            $scope.employee = _employee.data;
            $scope.EmpID = employee.EmpID;
            $scope.EmpName = employee.EmpName;
            $scope.BasicPay = employee.BasicPay;
            $scope.Allowance = employee.Allowance;
            $scope.Action = "Update";
            $scope.divEmployee = true;
        }, function () {
            alert("Employee details cannot be found");
        });
    }


    $scope.SaveEmployee = function () {
        var Employee = {
            EmpID: $scope.EmpID,
            EmpName: $scope.EmpName,
            BasicPay: $scope.BasicPay,
            Allowance: $scope.Allowance

        };

        var EmployeeData = employeeService.SaveEmployee(Employee);
        EmployeeData.then(function (msg) {
            EmployeeList();
            alert(msg.data);
            $scope.divEmployee = false;
        }, function () {
            alert("Employee details cannot be found");
        });
    }

    $scope.DeleteEmployee = function (employee) {
        var DeleteEmployee = employeeService.DeleteEmployee(employee.EmpID);
        DeleteEmployee.then(function (msg) {
            EmployeeList();
            alert(msg.data);
        }, function () {
            alert("Employee details cannot be found");
        });
    }
});