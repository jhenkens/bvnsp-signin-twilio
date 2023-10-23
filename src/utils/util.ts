function row_col_to_excel_index(row: number, col: number){
    let colString = "";
    col+=1;
    while(col > 0){
        col-=1;
        const modulo = col % 26;
        const colLetter = String.fromCharCode('A'.charCodeAt(0) + modulo);
        colString = colLetter + colString;
        col = Math.floor(col / 26);
    }
    return colString + (row+1).toString();
}

function split_to_row_col(excel_index: string) {
    const regex = new RegExp("^([A-Za-z]+)([0-9]+)$");
    const match = regex.exec(excel_index);
    if (match == null) {
        throw new Error("Failed to parse string for excel position split");
    }
    const col = excel_row_to_index(match[1]);
    const raw_row = Number(match[2]);
    if (raw_row < 1) {
        throw new Error("Row must be >=1");
    }
    return [raw_row - 1, col];
}

function lookup_row_col_in_sheet(excel_index: string, sheet: any[][]) {
    const [row, col] = split_to_row_col(excel_index);
    if (row >= sheet.length) {
        return undefined;
    }
    return sheet[row][col];
}

function excel_row_to_index(letters: string):number {
    const lowerLetters = letters.toLowerCase();
    let result: number = 0;
    for (var p = 0; p < lowerLetters.length; p++) {
        const characterValue =
            lowerLetters.charCodeAt(p) - "a".charCodeAt(0) + 1;
        result = characterValue + result * 26;
    }
    return result - 1;
}

function sanitize_phone_number(number: number | string) {
    let new_number = number.toString();
    new_number = new_number.replace("whatsapp:", "");
    let temporary_new_number: string = "";
    while(temporary_new_number != new_number){
        // Do this multiple times so we get all +1 at the start of the string, even after stripping.
        temporary_new_number = new_number;
        new_number = new_number.replace(/(^\+1|\(|\)|\.|-)/g, "");
    }
    const result = String(parseInt(new_number)).padStart(10,"0");
    if (result.length == 11 && result[0] == "1"){
        return result.substring(1);
    }
    return result;
}


export {
    row_col_to_excel_index,
    excel_row_to_index,
    sanitize_phone_number,
    split_to_row_col,
    lookup_row_col_in_sheet,
};
