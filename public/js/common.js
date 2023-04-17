function sendRequest(reqObj) {
	console.log("Executing Request : " + JSON.stringify(reqObj));
	var resp = $.ajax(reqObj);
	resp.done(function (data, status, xhr) {
		console.log(xhr.status + " - " + status + " - " + JSON.stringify(data));
	});
	resp.fail(function (x) {
		//failure handling
	});
	return resp;

}

//GET
function sendGetRequest(url, data, contentType) {
	var reqObj = {
		type: 'GET',
		url: url,
		async: false
	};
	if (typeof contentType !== 'undefined' && contentType != '')
		reqObj['contentType'] = contentType;
	if (typeof data !== 'undefined' && data != '')
		reqObj['data'] = data;
	return sendRequest(reqObj);
}

function sendAsyncGetRequest(url, data, contentType) {
	var reqObj = {
		type: 'GET',
		url: url,
		async: true
	};
	if (typeof contentType !== 'undefined' && contentType != '')
		reqObj['contentType'] = contentType;
	if (typeof data !== 'undefined' && data != '')
		reqObj['data'] = data;
	return sendRequest(reqObj);
}

//POST
function sendPostRequest(url, data, contentType) {
	var reqObj = {
		type: 'POST',
		url: url,
		async: false
	};
	if (typeof contentType !== 'undefined' && contentType != '')
		reqObj['contentType'] = contentType;
	if (typeof data !== 'undefined' && data != '')
		reqObj['data'] = data;
	return sendRequest(reqObj);
}

function sendAsyncPostRequest(url, data, contentType) {
	var reqObj = {
		type: 'POST',
		url: url,
		async: true
	};
	if (typeof contentType !== 'undefined' && contentType != '')
		reqObj['contentType'] = contentType;
	if (typeof data !== 'undefined' && data != '')
		reqObj['data'] = data;
	return sendRequest(reqObj);
}


//Creating checkbox input[type=checkbox]
function createCheckbox(txtContent, params) {
	let colStr = ``;
	if (typeof params !== 'undefined' && params != '') {
		for (const key of params.keys()) {
			colStr += ` ${key}="${params.get(key)}"`;
		}
	}
	if (typeof txtContent === 'undefined')
		txtContent = "";
	else
		txtContent = ' ' + txtContent + ' ';
	return `<input type="checkbox" ${colStr}>${txtContent}</input>`;
}

function getCheckboxElement(attrs) {
	attrs['type'] = 'checkbox';
	return $('<input>').attr(attrs);
}

function getTextInputElement(attrs) {
	attrs['type'] = 'text';
	return $('<input>').attr(attrs);
}

//Creating label
function createLabel(txtContent, params) {
	let colStr = ``;
	if (typeof params !== 'undefined' && params != '') {
		for (const key of params.keys()) {
			colStr += ` ${key}="${params.get(key)}"`;
		}
	}
	if (typeof txtContent === 'undefined')
		txtContent = "";
	else
		txtContent = ' ' + txtContent + ' ';
	return `<label ${colStr}>${txtContent}</label>`;
}

function getLabelElement(attrs) {
	let text = attrs['text'];
	delete attrs.text;
	let html = attrs['html'];
	delete attrs.html;
	return $('<label>')
		.attr(attrs)
		.text(text)
		.html(html);
}

//Creating div
function createDiv(txtContent, params) {
	let colStr = ``;
	if (typeof params !== 'undefined' && params != '') {
		for (const key of params.keys()) {
			colStr += ` ${key}="${params.get(key)}"`;
		}
	}
	if (typeof txtContent === 'undefined')
		txtContent = "";
	else
		txtContent = ' ' + txtContent + ' ';
	return `<div ${colStr}>${txtContent}</div>`;
}

function getDivElement(attrs) {
	let html = attrs['html'];
	delete attrs.html;

	return $('<div>')
		.attr(attrs)
		.html(html);
}

//creating span element
function getSpanElement(attrs) {
	let html = attrs['html'];
	delete attrs.html;

	return $('<span>')
		.attr(attrs)
		.html(html);
}

function getImgElement(attrs) {
	let html = attrs['html'];
	delete attrs.html;

	return $('<img>')
		.attr(attrs)
		.html(html);
}


//Creating Column td
function createColumn(colContent, params) {
	let colStr = ``;
	if (typeof params !== 'undefined' && params != '') {
		for (const key of params.keys()) {
			colStr += ` ${key}="${params.get(key)}"`;
		}
	}
	if (typeof colContent === 'undefined')
		colContent = "";
	else
		colContent = ' ' + colContent + ' ';
	return `<td${colStr}>${colContent}</td>`;
}

function createMultiColumn(columnObj) {
	theader = ``;
	for (let j in columnObj) {
		theader += createColumn(columnObj[j]);
	}
	return theader;
}

function createRow(rowContent, params) {
	let rowStr = ``;
	if (typeof params !== 'undefined' && params != '') {
		for (const key of params.keys()) {
			rowStr += ` ${key}="${params.get(key)}"`;
		}
	}
	if (typeof rowContent === 'undefined')
		rowContent = "";
	else
		rowContent = ' ' + rowContent + ' ';
	return `<tr${rowStr}>${rowContent}</tr>`;
}

function createTable(tableContent, params) {
	let tableStr = ``;
	if (typeof params !== 'undefined' && params != '') {
		for (const key of params.keys()) {
			tableStr += ` ${key}="${params.get(key)}"`;
		}
	}
	if (typeof tableContent === 'undefined')
		tableContent = "";
	else
		tableContent = ' ' + tableContent + ' ';
	return `<table${tableStr}>${tableContent}</table>`;
}

function getTableElement(attrs) {
	let html = attrs['html'];
	delete attrs.html;

	return $('<table>')
		.attr(attrs)
		.html(html);
}
function getRowElement(attrs) {
	let html = attrs['html'];
	delete attrs.html;

	return $('<tr>')
		.attr(attrs)
		.html(html);
}
function getColumnElement(attrs) {
	let text = attrs['text'];
	delete attrs.text;
	let html = attrs['html'];
	delete attrs.html;

	return $('<td>')
		.attr(attrs)
		.text(text)
		.html(html);
}
function getMultipleColumnElement(cellArr) {
	let tds = [];
	for (let i = 0; i < cellArr.length; i++) {
		let td = $('<td>').text(cellArr[i]);
		tds.push(td);
	}
	return tds;
}
function getMultipleHeaderElement(cellArr) {
	let ths = [];
	for (let i = 0; i < cellArr.length; i++) {
		let th = $('<th>').text(cellArr[i]);
		ths.push(th);
	}
	return ths;
}

function covertMachineTime(dateTimeStr) {
	let date = new Date(dateTimeStr);
	let formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	return formattedDate;
}

function createModuleEntry(labelName, params) {
	let moduleEntryStr = ``;
	moduleEntryStr += createCheckbox('', params);
	moduleEntryStr += createLabel(labelName, params);

	return `<a>${moduleEntryStr}</a><br>`;


}

// Confirm popup
function showConfirm(message, callback) {
	const popup = document.getElementById("confirm-popup");
	const popupMessage = document.getElementById("confirm-message");
	const buttonsContainer = $('.confirm-buttons');

	buttonsContainer.empty();
	buttonsContainer.append($("<button>", { id: "confirm-yes", text: "Yes" }));
	buttonsContainer.append($("<button>", { id: "confirm-no", text: "No" }));


	let popupYes = document.getElementById("confirm-yes");
	let popupNo = document.getElementById("confirm-no");

	//let clonedYesElement = popupYes.cloneNode(true);
	//let clonedNoElement = popupYes.cloneNode(true);


	//popupYes.parentNode.replaceChild(cloneElement, popupYes);
	//popupYes = cloneElement;

	//popupYes = popupYes.cloneNode(true);

	//$(popupYes).off(); //removing all eventlisteners - not working
	//$('#confirm-no').off();


	popupYes.addEventListener("click", () => {
		popup.style.display = "none";
		callback();
	});

	popupNo.addEventListener("click", () => {
		popup.style.display = "none";
		console.log("Confirmation Rejected!");
	});

	popupMessage.textContent = message;
	popup.style.display = "block";
}

function jsonSyntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}



