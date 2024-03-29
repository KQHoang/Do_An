const ENUMS = {
    PagingControl:{
        PageIndex: 1,
        PageSize: 15,
    },
    TABLE_PAGE_SIZE: [15, 25, 50, 100],
    PICK_LIST_ETHNICITY:[
        { value: 1, name: "Kinh"},
        { value: 2, name: "Tày"},
        { value: 3, name: "Thái"},
        { value: 4, name: "Hoa"},
        { value: 5, name: "Khơ-me"},
        { value: 6, name: "Mường"},
        { value: 7, name: "Nùng"},
        { value: 8, name: "HMông"},
        { value: 9, name: "Dao"},
        { value:10, name: "Gia-rai"},
        { value:11, name: "Ngái"},
        { value:12, name: "Ê-đê"},
        { value:13, name: "Ba na"},
        { value:14, name: "Xơ-Đăng"},
        { value:15, name: "Sán Chay"},
        { value:16, name: "Cơ-ho"},
        { value:17, name: "Chăm"},
        { value:18, name: "Sán Dìu"},
        { value:19, name: "Hrê"},
        { value:20, name: "Mnông"},
        { value:21, name: "Ra-glai"},
        { value:22, name: "Xtiêng"},
        { value:23, name: "Bru-Vân "},
        { value:24, name: "Thổ"},
        { value:25, name: "Giáy"},
        { value:26, name: "Cơ-tu"},
        { value:27, name: "Gié Triêng"},
        { value:28, name: "Mạ"},
        { value:29, name: "Khơ-mú"},
        { value:30, name: "Co"},
        { value:31, name: "Tà-ôi"},
        { value:32, name: "Chơ-ro"},
        { value:33, name: "Kháng"},
        { value:34, name: "Xinh-mun"},
        { value:35, name: "Hà Nhì"},
        { value:36, name: "Chu ru"},
        { value:37, name: "Lào"},
        { value:38, name: "La Chí"},
        { value:39, name: "La Ha"},
        { value:40, name: "Phù Lá"},
        { value:41, name: "La Hủ"},
        { value:42, name: "Lự"},
        { value:43, name: "Lô Lô"},
        { value:44, name: "Chứt"},
        { value:45, name: "Mảng"},
        { value:46, name: "Pà Thẻn"},
        { value:47, name: "Co Lao"},
        { value:48, name: "Cống"},
        { value:49, name: "Bố Y"},
        { value:50, name: "Si La"},
        { value:51, name: "Pu Péo"},
        { value:52, name: "Brâu"},
        { value:53, name: "Ơ Đu"},
        { value:54, name: "Rơ măm"}
    ],
    PICK_LIST_GENDER:[
        {
            GenderID: 1,
            GenderName: "Nam",
        },
        {
            GenderID: 2,
            GenderName: "Nữ",
        }
    ],
    ACTION_TYPE:[
        {
            value: 1,
            name: "Edit"
        },
        {
            value: 2,
            name: "View"
        },
        {
            value: 3,
            name: "Add"
        }
    ],
    PICK_LIST_IDENTIFY_TYPE:[
        {
            value: 1,
            name: "CCCD"
        },
        {
            value: 2,
            name: "CMND"
        }
    ],
    PICK_LIST_COUNTRY:[
        {
            value: 1,
            name: "Việt Nam"
        },
        {
            value: 2,
            name: "Khác"
        }
    ],
    
    PICK_LIST_CCCD:[
        {
            ProvinceID: 64,
            ProvinceName: "Cục Cảnh sát quản lý hành chính về trật tự xã hội"
        },
        {
            ProvinceID: 65,
            ProvinceName: "Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư"
        }
        
    ],

    PICK_LIST_CONTRACT_TYPE:[
        {
            ContractTypeID: 1,
            ContractTypeName: "Thử việc"
        },
        {
            ContractTypeID: 2,
            ContractTypeName: "Hợp đồng xác định thời hạn"
        }
    ],
    CONTRACT_STATUS:[
        {
            ContractStatusID: 1,
            ContractStatusName: "Có hiệu lực"
        },
        {
            ContractStatusID: 2,
            ContractStatusName: "Hết hiệu lực"
        }
    ],
    WORK_SHEETS_TYPE:[
        {
            value: 1,
            name: "Ca hành chính"
        },
        {
            value: 2,
            name: "Tăng ca"
        }
    ],
    PICK_LIST_MONTH:[
        {value: 1, name: "tháng 1"},
        {value: 2 , name: "tháng 2"},
        {value: 3 , name: "tháng 3"},
        {value: 4 , name: "tháng 4"},
        {value: 5 , name: "tháng 5"},
        {value: 6, name: "tháng 6"},
        {value: 7 , name: "tháng 7"},
        {value: 8, name: "tháng 8"},
        {value: 9, name: "tháng 9"},
        {value: 10, name: "tháng 10"},
        {value: 11, name: "tháng 11"},
        {value: 12, name: "tháng 12"},
    ],
    PICK_LIST_YEAR:[
        {value: 2024, name: "năm 2024"},
        {value: 2023, name: "năm 2023"},
        {value: 2022, name: "năm 2022"},
        {value: 2021, name: "năm 2021"},
        {value: 2020, name: "năm 2020"},
        {value: 2019, name: "năm 2019"},
        {value: 2018, name: "năm 2018"},
        {value: 2017, name: "năm 2017"},
        {value: 2016, name: "năm 2016"},
        {value: 2015, name: "năm 2015"},
    ],
    RADIO_SALARY:
    [
        {
            label: "Lương",
            value: 1,
        },
        {
            label: "Kỳ lương",
            value: 2,
        },
        {
            label: "Quy chế tính lương",
            value: 3,
        }
    ],
    STATUS_SALARY_PERIOD:[
        {
            label: "Đã chi trả",
            value: 1,
        },
        {
            label: "Chưa chi trả",
            value: 2,
        }
    ],
    PICK_LIST_RELATION:[
        {
            value: 1,
            label: "Ông"
        },
        {
            value: 2,
            label: "Bà"
        },
        {
            value: 3,
            label: "Bố"
        },
        {
            value: 4,
            label: "Mẹ"
        },
        {
            value: 5,
            label: "Chồng"
        },
        {
            value: 6,
            label: "Vợ"
        },
        {
            value: 7,
            label: "Anh"
        },
        {
            value: 8,
            label: "Chị"
        },
        {
            value: 9,
            label: "Em trai"
        },
        {
            value: 10,
            label: "Em gái"
        },
        {
            value: 11,
            label: "Con gái"
        },
        {
            value: 12,
            label: "Con trai"
        },
    ]
}
export default ENUMS;