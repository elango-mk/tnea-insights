
const allotmentColumns = {'Application No':0, 'Name':1, 'Mark':2, 'Rank':3, 'Community':4, 'College Code':5, 'Branch Code':6, 'Alloted Category':7, 'Round':8};


function tneaHomeOnload()
{
  $('#columnSelectorBtn').click(function() {
    $('#custom-filter').toggle();
  });
  getAllotmentData();
  
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

 

  


    /*$('#allotment-data thead th').each(function () {
      $(this).append('<br><input type="text" placeholder="Search" style="width:100px" onclick="event.stopPropagation();"/>');
    });*/ 

    /*$('#allotment-data input').on('keyup change clear', function () {
      alert("test");
      if (column.search() !== this.value) {
        column.search(this.value).draw();
      }
    });*/            
  
} 

       
function applyFilter()
{
  console.log("Applying Filters");
  var tableFilter;
  const dataTable = $('#allotment-table').DataTable();

  const filters = getFiltersAsArray($('#advanced-filter'));
  
  $.fn.dataTable.ext.search = [];
  filters.forEach(function(filter){
    const key = filter[0].toUpperCase();
    const comparater = filter[1].toLowerCase();
    const value = filter[2];
    if(key === "MARK")
    {
      if(comparater === "<=")
      {
        tableFilter = function (settings, data, dataIndex) {
          var mark = parseFloat(data[allotmentColumns['Mark']]) || 0;     
          if(mark <= parseFloat(value)) return true;
          else return false;
        };
      }else if(comparater === ">=")
      {
        tableFilter = function (settings, data, dataIndex) {
          var mark = parseFloat(data[allotmentColumns['Mark']]) || 0;
          if(mark >= parseFloat(value)) return true;
          else return false;
        };
        //$.fn.dataTable.ext.search.push(tableFilter);
      }else if(comparater === "="){
        tableFilter = function (settings, data, dataIndex) {
          var mark = parseFloat(data[allotmentColumns['Mark']]) || 0;
          if(mark == parseFloat(value)) return true;
          else return false;
        };
        //$.fn.dataTable.ext.search.push(tableFilter);
      }else if(comparater === "range"){
        tableFilter = function (settings, data, dataIndex) {
          var mark = parseFloat(data[allotmentColumns['Mark']]) || 0;
          if(mark >= parseFloat(value) && mark <= parseFloat(filter[3])) return true;
          else return false;
        };
        //$.fn.dataTable.ext.search.push(tableFilter);
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
  const row = $(element).parentsUntil('table');
  const value = $(element).val();
  if(value === "range")
  {
    row.find('input[name="filter-value2"]').show();
  } 
  else {
    row.find('input[name="filter-value2"]').hide();
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


