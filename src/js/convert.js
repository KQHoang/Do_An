export default{
    formatDateToSave(date){
        if(date){
            var arr = date.split("/");
            var month = arr[0].length == 1 ? `0${arr[0]}` : arr[0];
            var day = arr[1].length == 1 ? `0${arr[1]}` : arr[1];
            return `${arr[2]}-${month}-${day}`;
        }
        return "";
    },
    formatDateToShow(date){
        if(date){
            date = date.split("T")[0];
            var arr = date.split("-");
            return `${arr[2]}/${arr[1]}/${arr[0]}`;
        }
        return "";
    },
    formatDateToEdit(date){
        if(date){
            date = date.split("T")[0];
            var arr = date.split("-");
            return `${arr[1]}/${arr[2]}/${arr[0]}`;
        }
        return "";
    }
}