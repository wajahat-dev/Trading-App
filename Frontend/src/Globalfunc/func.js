export const ToDatabaseFormat = (inputDate) => {
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


export const generateDateTime = () => {
    var date = new Date()
    return date.getFullYear() + ("0" + (date.getMonth())).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
}

export const generateExpiryDateTime = () => {
    var date = new Date()
    date.setHours(date.getHours() + 1);
    return date.getFullYear() + ("0" + (date.getMonth())).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
}


export const getTransactionDateTime = () => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return year + month + day + hours + minutes + seconds;
}

export const  getTransactionExpiry = (expiryMinutes) => {
    const now = new Date();
    const expiryDate = new Date(now.getTime() + expiryMinutes * 60000); // add expiry duration in milliseconds
    const year = expiryDate.getFullYear().toString();
    const month = (expiryDate.getMonth() + 1).toString().padStart(2, '0');
    const day = expiryDate.getDate().toString().padStart(2, '0');
    const hours = expiryDate.getHours().toString().padStart(2, '0');
    const minutes = expiryDate.getMinutes().toString().padStart(2, '0');
    const seconds = expiryDate.getSeconds().toString().padStart(2, '0');
    return year + month + day + hours + minutes + seconds;
  }


export const generateSecureHash = (payload, INTEGRITY_KEY, hmacSHA256) => {
    const secureHash = (data) => {
        const ordered = Object.keys(data).sort().reduce(
            (obj, key) => {
                obj[key] = data[key];
                return obj;
            },
            {}
        );
        var hash = ""
        Object.entries(ordered).forEach(
            ([key, value]) => {
                if (value != "") {
                    hash += '&' + value
                }
            }
        );;
        return hash;
    }
    var hash = INTEGRITY_KEY + secureHash(payload)
    const finalHash = hmacSHA256(hash, INTEGRITY_KEY).toString();
    return finalHash
}




export const generateSecureHashv2 = (request, integrityText, crypto) => {

    const sortedList = {};
    Object.keys(request)
        .sort()
        .forEach(function (key) {
            if (key !== 'pp_SecureHash') sortedList[key] = request[key];
        });

    let finalString = `${integrityText}&`;
    Object.keys(sortedList).forEach(function (key) {
        finalString = finalString.concat(sortedList[key]);
        if (sortedList[key] != null && sortedList[key] !== '') finalString = finalString.concat('&');
    });

    finalString = finalString.substr(0, finalString.length - 1);

    return crypto.createHmac('sha256', integrityText)
        .update(finalString)
        .digest('hex')
        .toUpperCase();
}

export const EmailValidation = (value) => {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regex = new RegExp(validRegex);
    if (value.trim() !== '' && regex.test(value)) return false
    return true
  };


  export const PhoneValidation = (value) => {
    const validRegex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;
    const regex = new RegExp(validRegex);
    if (value.trim() !== '' && regex.test(value)) return false
    return true
  };


  export const CNICValidation = (value) => {
    const validRegex = /^([0-9]{5})[\-]([0-9]{7})[\-]([0-9]{1})+/
    const regex = new RegExp(validRegex);
    if (value.trim() !== '' && !regex.test(value)) return false
    return true
  };


  export const maxDecimalLengthNumberCtlRegex = (value, num = 7, dec = 2, plusMinus = true) => {
    debugger;
    const paramExp = plusMinus ? '[-+]?[0-9]{0,' + num + '}(?:[\.][0-9]{0,' + dec + '})' : '[0-9]{0,' + num + '}(?:[\.][0-9]{0,' + dec + '})';
    const regStartExp = '^' + paramExp + '?$';
    const regex = new RegExp(regStartExp);
    return regex.test(value);
  };
  
  export const maxLengthTextCtlRegex = (value, num = 7) => {
    const paramExp = '.{0,' + num + '}';
    const regStartExp = '^' + paramExp + '?$';
    const regex = new RegExp(regStartExp);
    return regex.test(value);
  };
  

//   CREATE FUNCTION updateRecord()
// RETURNS BOOLEAN
// BEGIN
//   UPDATE my_table SET my_column = 'new_value' WHERE id = 1;
//   RETURN TRUE;
// END;


// CREATE EVENT dailyUpdate
// ON SCHEDULE EVERY 1 DAY
// DO
//   CALL updateRecord();