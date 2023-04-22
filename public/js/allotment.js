function populateAllotmentData()
{
    sendGetRequest('/getData')
		.done(function (data, status, xhr) {
          const tableHeader = Object.keys(data[0]); // get the header from the first object in data
          const tableRows = data.map((row) => Object.values(row)); // get the data rows as an array of arrays

          const columnSelector = `
              ${tableHeader.map((header) => `
                <label style="padding-left:10px;">
                  <input type="checkbox" class="column-selector" name="column-selector" value="${header}" checked>
                  ${header}
                </label>
              `).join('')}
        `;

        let tableHtml = `<table id="dataTable" class="table table-striped table-bordered" style="width:100%">
          <thead>
            <tr>
              ${tableHeader.map((header) => `
                <th class="column-${header}">${header}</th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${tableRows.map((row) => `
              <tr>
                ${tableHeader.map((header) => `
                  <td class="column-${header}">${row[tableHeader.indexOf(header)]}</td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>`

        let allotmentData = $('div#allotment-data');
        allotmentData.html(tableHtml);

        let columnselection = $('div#columnSelectorItems');
        columnselection.html(columnSelector);
        });      

        
        $('#dataTable thead th').each(function () {
          const title = $(this).text();
          $(this).append('<br><input type="text" placeholder="Search" style="width:100px" />');
        });
       
   
      // DataTable
      //let datatable1 = new DataTable('#dataTable');
      const dataTable = $('#dataTable').DataTable({
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



        $('.column-selector').change(function() {
          const columnName = $(this).val();
          const columnVisible = $(this).prop('checked');
          const columnIndex = dataTable.column(`.column-${columnName}`).index();

          dataTable.column(columnIndex).visible(columnVisible);
        });

        // handle column selector dropdown toggle
        $('#columnSelectorBtn').click(function() {
          $('#custom-filter').toggle();
        });
} 


