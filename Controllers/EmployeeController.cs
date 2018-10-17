using AngularCRUD.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularCRUD.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult EmployeeList()
        {
            using (EmployeeEntities contextObj = new EmployeeEntities())
            {
                var employeeList = contextObj.usp_view_EmployeeDetails().ToList();
                return Json(employeeList, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Employee By ID
        public JsonResult GetEmployeeByID(string EmpID)
        {
            using (EmployeeEntities contextObj = new EmployeeEntities())
            {
                var Employee = contextObj.usp_viewbyid_EmployeeDetails(Convert.ToInt32(EmpID)).FirstOrDefault();
                return Json(Employee, JsonRequestBehavior.AllowGet);
            }
        }

        // save Employee
        public string SaveEmployee(EmployeeDetails objEmployee)
        {
            if (objEmployee != null)
            {
                using (EmployeeEntities contextObj = new EmployeeEntities())
                {
                    ObjectParameter param = new ObjectParameter("OutID", typeof(Int32));
                    contextObj.usp_save_EmployeeDetails(objEmployee.EmpID,objEmployee.EmpName,objEmployee.BasicPay,objEmployee.Allowance, param);
                    contextObj.SaveChanges();
                    return "Employee added with ID : " + param.Value;
                }
            }
            else
            {
                return "Invalid Data";
            }
        }

        // Delete Employee
        public string DeleteEmployee(string EmpID)
        {
            using (EmployeeEntities contextObj = new EmployeeEntities())
            {
                contextObj.usp_delete_EmployeeDetails(Convert.ToInt32(EmpID));
                contextObj.SaveChanges();
                return "Employee deleted successfully";
            }
        }
    }
}