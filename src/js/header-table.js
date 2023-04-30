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

    ]
}
export default HeaderTables;