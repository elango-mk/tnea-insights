
const allotmentColumns = {'Application No':0, 'Name':1, 'Mark':2, 'Rank':3, 'Community':4, 'College Code':5, 'Branch Code':6, 'Alloted Category':7, 'Round':8};


function tneaHomeOnload()
{
  $('#columnSelectorBtn').click(function() {
    $('#custom-filter').toggle();
  });
  getAllotmentData();
  addFilterRow($('#advanced-filter'));
  
}



function getAllotmentData()
{
  sendGetRequest('/getData')
  .done(function (data, status, xhr) {
    localStorage.setItem('allotmentData', JSON.stringify(data));
    populateAllotmentData();
  });
}

function populateAllotmentData()
{
  const allotmentData = JSON.parse(localStorage.getItem('allotmentData'));

  let dataTableCol = [];
  for(let colName in allotmentColumns) {
    dataTableCol.push({ title: colName });
  }

  console.log(allotmentData);
  const dataTable = $('#allotment-table').DataTable({
    data: allotmentData,
    columns: dataTableCol,
    "pageLength": 25,
    "scrollY": "610px",
    "scrollX": true,
    order: [1, 'asc']
  });

  addColumnSelection();            
  
} 

       
function applyFilter()
{
  console.log("Applying Filters");
  var tableFilter;
  const dataTable = $('#allotment-table').DataTable();

  const filters = getFiltersAsArray($('#advanced-filter'));
  
  $.fn.dataTable.ext.search = [];
  filters.forEach(function(filter){
    //console.log(filter);
    const key = filter[0].toLowerCase();
    const comparater = filter[1].toLowerCase();
    const value = filter[2];
    if(key === "mark" || key === "rank" || key === "round" || key === "collegecode")
    {
      let colIndex = 0;
      switch (key)
      {
        case "mark":
          colIndex = allotmentColumns['Mark'];
          break;
        case "rank":
          colIndex = allotmentColumns['Rank'];
          break;
        case "round":
          colIndex = allotmentColumns['Round'];
          break;
        case "collegecode":
          colIndex = allotmentColumns['College Code'];
          break;
      } 
      if(comparater === "<=")
      {
        tableFilter = function (settings, data, dataIndex) {
          var colData = parseFloat(data[colIndex]) || 0;     
          if(colData <= parseFloat(value)) return true; else return false;
        };
      }else if(comparater === ">=")
      {
        tableFilter = function (settings, data, dataIndex) {
          var colData = parseFloat(data[colIndex]) || 0;
          if(colData >= parseFloat(value)) return true; else return false;
        };
      }else if(comparater === "="){
        tableFilter = function (settings, data, dataIndex) {
          var colData = parseFloat(data[colIndex]) || 0;
          if(colData == parseFloat(value)) return true; else return false;
        };
      }else if(comparater === "range"){
        tableFilter = function (settings, data, dataIndex) {
          var colData = parseFloat(data[colIndex]) || 0;
          if(colData >= parseFloat(value) && colData <= parseFloat(filter[3])) return true; else return false;
        };
      }
      else
      {
        console.log("Error : applyFilter | Not a valid comparater - " + filter[1].toLowerCase())
      }   
    }
    else if(key === "community" || key === "branch" || key === "allotedcategory")
    {
      let colIndex = 0;
      switch (key)
      {
        case "community":
          colIndex = allotmentColumns['Community'];
          break;
        case "branch":
          colIndex = allotmentColumns['Branch Code'];
          break;
        case "allotedcategory":
          colIndex = allotmentColumns['Alloted Category'];
          break;
      } 
      if(comparater === "is")
      {
        tableFilter = function (settings, data, dataIndex) {
          var colData = data[colIndex] || "";     
          if(colData === value) return true; else return false;
        };
      }
      else if(comparater === "is not"){
        tableFilter = function (settings, data, dataIndex) {
          var colData = data[colIndex] || "";     
          if(colData !== value) return true; else return false;
        };
      }
      else
      {
        console.log("Error : applyFilter | Not a valid comparater - " + filter[1].toLowerCase())
      }   
    }
    else
    {
      console.log("Error : applyFilter | Not a valid Key - " + filter[1].toLowerCase())
    }
    $.fn.dataTable.ext.search.push(tableFilter);
  });  
  dataTable.draw();

}

function removeFilter()
{
  var table = $('#allotment-table').DataTable();
  table
  .search( '' )
  .columns().search( '' )
  .draw();

  $.fn.dataTable.ext.search = [];
  table.draw();
}

function addColumnSelection()
{
  console.log("Adding Column Selection Options")
  const dataTable = $('#allotment-table').DataTable();

  //column selection options
  let columnSelector = '';
  for(let colName in allotmentColumns)
  {
    columnSelector += `<label style="padding-left:10px;">
      <input type="checkbox" class="column-selector" name="column-selector" value="${allotmentColumns[colName]}" checked>
      ${colName}
      </label>`;
  }
  $('div#columnSelectorItems').html(columnSelector);

   // column selection event
   $('.column-selector').change(function() {
    const columnIndex = $(this).val();
    const columnVisible = $(this).prop('checked');
    dataTable.column(columnIndex).visible(columnVisible);
  });

}

function testRangeFilter()
{
  const table = $('#allotment-table').DataTable();
    var minEl = 190;
    var maxEl = 195;
 
    // Custom range filtering function
    var myFilter = function (settings, data, dataIndex) {
      var min = 190;
      var max = 195;
      var age = parseFloat(data[2]) || 0; // use data for the age column

      if (
          (isNaN(min) && isNaN(max)) ||
          (isNaN(min) && age <= max) ||
          (min <= age && isNaN(max)) ||
          (min <= age && age <= max)
      ) {
          return true;
      }

      return false;
  };
  
  $.fn.dataTable.ext.search.push(myFilter);
  //$.fn.dataTable.ext.search.splice($.fn.dataTable.ext.search.indexOf(myFilter, 1));

 
    //var table = $('#example').DataTable();
 
    // Changes to the inputs will trigger a redraw to update the table
    table.draw();
    /*minEl.on('input', function () {
        table.draw();
    });
    maxEl.on('input', function () {
        table.draw();
    });*/
}
    

function comparatorOnUpdate(element)
{
  console.log("inside comparatorOnUpdate");
  const filterRow = $(element).parentsUntil('table');
  const filterComparater = $(element).val();

  filterRow.find('input[name="filter-value2"]').hide();
  if(filterComparater === "range")
    filterRow.find('input[name="filter-value2"]').show();
  else if(filterComparater === "is")
  {

  }

}
     

function filterKeyOnUpdate(element)
{
  const numberKeys = ["mark", "rank", "round", "collegecode"];
  const dropdownKeys = ["community", "allotedcategory", "branch"];
  const stringKeys = [];

  console.log("inside filterKeyOnUpdate");
  const row = $(element).parentsUntil('table');
  const value = $(element).val();
  const comparater = $(row).find('select[name="filter-comp"]');
  if(numberKeys.includes(value))
  {
    comparater.empty();
    comparater.append($('<option>').text('<=').val('<=')).attr("selected", true);
    comparater.append($('<option>').text('=').val('='));
    comparater.append($('<option>').text('>=').val('>='));
    comparater.append($('<option>').text('range').val('range'));
  } 
  else if(dropdownKeys.includes(value))
  {
    comparater.empty();
    comparater.append($('<option>').text('is').val('is')).attr("selected", true);
    comparater.append($('<option>').text('is not').val('is not')).attr("selected", true);
  }else if(stringKeys.includes(value))
  {
    comparater.empty();
    comparater.append($('<option>').text('is').val('is')).attr("selected", true);
    comparater.append($('<option>').text('contains').val('contains'));
  } else {
    comparater.empty();
  }
  comparatorOnUpdate($(comparater));
}

function addFilterRow(element)
{
  const filterTable = $(element).closest('table');
  let filterRow = $('<tr>').appendTo(filterTable);
  
  let filterKeySelect = $('<select>').attr({'name':'filter-key','onchange':'filterKeyOnUpdate(this)'});
  filterKeySelect.append($('<option>').text('Mark').val('mark')).attr('selected', true);
  filterKeySelect.append($('<option>').text('Rank').val('rank'));
  filterKeySelect.append($('<option>').text('Community').val('community'));
  filterKeySelect.append($('<option>').text('College Code').val('collegecode'));
  filterKeySelect.append($('<option>').text('Branch').val('branch'));
  filterKeySelect.append($('<option>').text('Alloted Category').val('allotedcategory'));
  filterKeySelect.append($('<option>').text('Round').val('round'));

  let filterComparaterSelect = $('<select>').attr({'name':'filter-comp','onchange':'comparatorOnUpdate(this)'});

  let filterValueInput = $('<input>').attr({'name':'filter-value'});
  let filterValueInput2 = $('<input>').attr({'name':'filter-value2'}).hide();


  let filterAddButton = $('<input>').attr({'type':'button','value':'+','onclick':'addFilterRow(this)'}).css({'width':'50px','font-size':'12px'});
  let filterRemoveButton = $('<input>').attr({'type':'button','value':'x','onclick':'removeFlterRow(this)'}).css({'width':'50px','font-size':'12px'});

  $('<td>').append(filterKeySelect).appendTo(filterRow);
  $('<td>').append(filterComparaterSelect).appendTo(filterRow);
  $('<td>').append(filterValueInput).appendTo(filterRow);
  $('<td>').append(filterValueInput2).appendTo(filterRow);
  $('<td>').append(filterAddButton).appendTo(filterRow);
  $('<td>').append(filterRemoveButton).appendTo(filterRow);


  filterKeyOnUpdate($(filterKeySelect));

}

function removeFlterRow(element)
{
  const filterTable = $(element).closest('table');
  const filterRow = $(element).closest('tr');
  filterRow.remove();

  
  console.log(filterTable);
  if(filterTable.find('tr').length == 0)
  {
    addFilterRow($(filterTable));
  }
  
}


/*const dataTable = $('#dataTable').DataTable({
          initComplete: function () {
              // Apply the search
              this.api()
                  .columns()
                  .every(function () {
                    const column = this;
   
                      $('input', this.header()).on('keyup change clear', function () {
                        if (column.search() !== this.value) {
                          column.search(this.value).draw();
                        }
                      });
                  });
          },
          "pageLength": 25,
          "scrollY": "510px",
          "scrollX": true
      });



function applyFilter()
{
  console.log("Applying Filters")
  const dataTable = $('#allotment-table').DataTable();

  let mark = $('#filter-mark-input').val();
  let markComp = $('#filter-mark-comp').val();
  let rank = $('#filter-rank-input').val();
  let community = $('#filter-community-input').val();
  let college = $('#filter-college-input').val();
  let branch = $('#ffilter-branch-input').val();
  let round = $('#ffilter-round-input').val();

  dataTable.column(allotmentColumns['Mark']).search('^>50$', true, false).draw();
  //dataTable.column(allotmentColumns['Mark']).search(`^${markComp}${mark}$`, true, false).draw();

  console.log(mark);
  //let markCol = dataTable.column(allotmentColumns['Mark']);
  //if (markCol.search() !== mark) {
  //  markCol.search(mark).draw();
 // }


//$('#allotment-data input').on('keyup change clear', function () {
 //   alert("test");
    
  });

}

        */


