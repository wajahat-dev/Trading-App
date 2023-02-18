export const  ToDatabaseFormat = (inputDate) => {
    //    debugger
        try {
    
    
            if (inputDate != null && inputDate != '') {
                if (inputDate.length == 10) inputDate += ' 00:00:00';
                const date = new Date(inputDate);
                if (!isNaN(date.getTime())) {
                    const d = new Date(inputDate);
                    let month = '' + (d.getMonth() + 1);
                    let day = '' + d.getDate();
                    const year = d.getFullYear();
            
                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;
            
                return [year, month, day].join('-');
                } else {
                    return '';
                }
            
            } else {
                return '';
            }
          
        } catch (error) {
    
        }
    
    };


    export const CheckemptyDate = (e) => {  
        switch (e) {
            case '':
            case null:
            case undefined:
            case '0001-01-01T00:00:00':
            case '1900-01-01T00:00:00':
            case '01/01/0001':
            case '01/01/1900':
            case '12/31/1899':
            case '1-01-01':
              return false;
            default:
              return true;
          }
      }
    