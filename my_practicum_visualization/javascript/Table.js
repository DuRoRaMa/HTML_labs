// table.js
let createTable = (data, idTable) => {
    let table = document.getElementById(idTable);
    
    table.innerHTML = '';
    
    let thead = document.createElement('thead');
    let trHead = document.createElement('tr');

    for(let key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        trHead.append(th);
    }

    thead.append(trHead);
    table.append(thead);
    
    let tbody = document.createElement('tbody');
    
    data.forEach((item) => {
        let tr = document.createElement('tr');
        
        for(let key in item) {
            let td = document.createElement('td');
            td.innerHTML = item[key];
            tr.append(td);
        }
        
        tbody.append(tr);
    });
    
    table.append(tbody);
}

let clearTable = (idTable) => {
    let table = document.getElementById(idTable);
    if (table.innerHTML !== '') table.innerHTML = "";
}