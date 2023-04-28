export default{
    formatDateToSave(date){
        if(date){
            var arr = date.split("/");
            var day = arr[0].length == 1 ? `0${arr[0]}` : arr[0];
            var month = arr[1].length == 1 ? `0${arr[1]}` : arr[1];
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
            return `${arr[2]}/${arr[1]}/${arr[0]}`;
        }
        return "";
    }
}