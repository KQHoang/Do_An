const HeaderTables = {
    PROFILE_EMPLOYEE:[
        {
            value: "EmployeeCode",
            name: "Mã nhân viên",
            width: 150
        },
        {
            value: "FullName",
            name: "Họ và tên",
            width: 200
        },
        {
            value: "GenderID",
            name: "Giới tính",
            width: 100,
            type: "gender"
        },
        {
            value: "DateOfBirth",
            name: "Ngày sinh",
            width: 150,
            type: "date"
        },
        {
            value: "TaxCode",
            name: "Mã số thuế",
            width: 150
        },
        {
            value: "IdentifyNumber",
            name: "Số CMND/CCCD",
            width: 200
        },
        {
            value: "PhoneNumber",
            name: "Số điện thoại",
            width: 180
        },


    ],
    DEPARTMENT:
    [
        {
            value: "DepartmentName",
            name: "Tên phòng ban",
            width: 200
        },
        {
            value: "Description",
            name: "Mô tả",
            width: 500
        },
        {
            value: "Address",
            name: "Địa chỉ phòng ban",
            width: 200
        },
    ],
    POSITION:[
        {
            value: "PositionName",
            name: "Tên chức vụ",
            width: 200
        },
        {
            value: "Description",
            name: "Mô tả",
            width: 500
        },
    ],
    CONTRACT:[
        {
            value: "ContractNumber",
            name: "Số hợp đồng",
            width: 200
        },
        {
            value: "FullName",
            name: "Họ và tên nhân viên",
            width: 200
        },
        {
            value: "SignatureDate",
            name: "Ngày ký kết",
            width: 200,
            type: "date"
        },
        {
            value: "Salary",
            name: "Lương thoả thuận",
            width: 200
        },
        {
            value: "ContractType",
            name: "Loại hợp đồng",
            width: 200,
            type: "contractType"
        },
        {
            value: "Position",
            name: "Vị trí",
            width: 200,
        },
        {
            value: "EffectiveDate",
            name: "Ngày hiệu lực",
            width: 200,
            type: "date"
        },
        {
            value: "DateEnd",
            name: "Ngày hết hạn",
            width: 200,
            type: "date"
        },

    ],
    MANAGE_TIMESHEETS:[
        {
            value: "EmployeeCode",
            name: "Mã nhân viên",
            width: 200,
        }, 
        {
            value: "FullName",
            name: "Tên nhân viên",
            width: 200,
        }, 
        {
            value: "WorkDate",
            name: "Ngày làm việc",
            width: 200,
            type: "date"
        }, 
        {
            value: "TimeToEnter",
            name: "Giờ vào",
            width: 100,
        }, 
        {
            value: "TimeToOut",
            name: "Giờ ra về",
            width: 100,
        }, 
        {
            value: "WorkType",
            name: "Loại công việc",
            width: 200,
            type: "workType"
        }, 
    ],
    MANAGE_SALARY:[
        {
            value: "EmployeeCode",
            name: "Mã nhân viên",
            width: 200,
        }, 
        {
            value: "FullName",
            name: "Tên nhân viên",
            width: 200,
        }, 
        {
            value: "BasicPay",
            name: "Tiền lương",
            width: 200,
        }, 
        {
            value: "TaxMoney",
            name: "Đóng thuế",
            width: 200,
        }, 
        {
            value: "SocialInsurance",
            name: "Đóng bảo hiểm xã hội",
            width: 200,
        }, 

    ],

    MANAGE_SALARY_PERIOD:[
        {
            value: "EmployeeCode",
            name: "Mã nhân viên",
            width: 200,
        }, 
        {
            value: "FullName",
            name: "Tên nhân viên",
            width: 200,
        }, 
        {
            value: "MonthSalary",
            name: "Tháng chi trả",
            width: 200,
        }, 
        {
            value: "YearSalary",
            name: "Năm chi trả",
            width: 200,
        }, 
        {
            value: "TotalWorkDay",
            name: "Tổng ngày công",
            width: 200,
        }, 
        {
            value: "Bonus",
            name: "Tiền thưởng",
            width: 200,
        }, 
        {
            value: "Status",
            name: "Trạng thái",
            width: 200,
            type: "statusSalaryPeriod"
        }, 
        {
            value: "TotalReceive",
            name: "Tổng tiền được nhận",
            width: 200,
        }, 

    ],
    ACCOUNT:[
        {
            value: "FullName",
            name: "Họ và tên",
            width: 200,
        },  
        {
            value: "Email",
            name: "Email",
            width: 200,
        },  
        {
            value: "PhoneNumber",
            name: "Số điện thoại",
            width: 200,
        },  
    ],
    PERMISSION:[
        {
            value: "EmployeeCode",
            name: "Mã nhân viên",
            width: 200,
        }, 
        {
            value: "FullName",
            name: "Họ và tên",
            width: 200,
        },  
    ]
}
export default HeaderTables;