const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');
const fs = require('fs');

// Open SQLite3 database connection
function openDbConection() {
    let sqLiteDb = new sqlite3.Database('./db/tnea.db', (err) => {
        if (err) {
            console.error("Error: " + err.message);
        }
        else {
            console.log('Connected to the tnea database.');
        }
    });
    return sqLiteDb;
};

function closeDbConnection(db) {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log('Closed the database connection.');
            //callback();
        }
    });
};


function runQuery(sqlQuery)
{
    console.log("Running Query : " + sqlQuery);
    const db = openDbConection();
    //let sqlQuery = `SELECT APPLICATION_NO,CANDIDATE_NAME,AGGR_MARK,RANK,COMMUNITY,COLLEGE_CODE,BRANCH_CODE,ALLOTTED_CATEGORY,ROUND FROM Allotment`;

    return new Promise((resolve, reject) => {
      db.all(sqlQuery, [], (err, rows) => {
        // Close the database connection
        closeDbConnection(db);  
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
}


//const db = openDbConection();

function createTables()
{
    // Create "Allotment" table
    db.run(`CREATE TABLE IF NOT EXISTS Allotment (
    ALLOTMENT_ID INTEGER PRIMARY KEY,  
    APPLICATION_NO,
    CANDIDATE_NAME TEXT,
    DOB TEXT,
    AGGR_MARK REAL,
    RANK INTEGER,
    COMMUNITY TEXT,
    COLLEGE_CODE TEXT,
    BRANCH_CODE TEXT,
    ALLOTTED_CATEGORY TEXT,
    ROUND INTEGER,
    YEAR INTEGER
  )`);
  
    db.run(`CREATE TABLE IF NOT EXISTS College (
    COLLEGE_ID INTEGER PRIMARY KEY,  
    COLLEGE_NAME TEXT,
    COLLEGE_TYPE TEXT
  )`);
}




// Import data from CSV file to "Allotment" table
function importAllotmentData(file) {
    console.log("Import Started");
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
      db.run(`INSERT INTO Allotment (
        ALLOTMENT_ID,
        APPLICATION_NO,
        CANDIDATE_NAME,
        DOB,
        AGGR_MARK,
        RANK,
        COMMUNITY,
        COLLEGE_CODE,
        BRANCH_CODE,
        ALLOTTED_CATEGORY,
        ROUND,
        YEAR
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [row['ALLOTMENT_ID'],
        row['APPLICATION_NO'],
        row['CANDIDATE_NAME'],
        row['DOB'],
        row['AGGR_MARK'],
        row['RANK'],
        row['COMMUNITY'],
        row['COLLEGE_CODE'],
        row['BRANCH_CODE'],
        row['ALLOTTED_CATEGORY'],
        1,
        2022
      ], (err) => {
        if (err) {
          console.error("CSV Error  " + err.message);
        }
      });
      console.log("Processed :" + row['ALLOTMENT_ID']);
    })
    .on('end', () => {
      console.log('Data imported successfully.');
      closeDbConnection(db);
    });
}

function importCollegeData(file) {
    console.log("Import Started");
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
      db.run(`INSERT INTO College (
        COLLEGE_ID,
        COLLEGE_NAME,
        COLLEGE_TYPE
      ) VALUES (?, ?, ?)`, [row['COLLEGE_ID'],
        row['COLLEGE_NAME'],
        row['COLLEGE_TYPE']
      ], (err) => {
        if (err) {
          console.error("CSV Error  " + err.message);
        }
      });
      console.log("Processed :" + row['COLLEGE_ID']);
    })
    .on('end', () => {
      console.log('Data imported successfully.');
      closeDbConnection(db);
    });
}

function getRows(db) {
    const sql = `SELECT * FROM Allotment WHERE ALLOTMENT_ID < 100500`;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(rows);
      }
    });
  }

// Usage
//createTables()
//importCollegeData('./data/college.csv');
//getRows();
//closeDbConnection(db);

module.exports = { openDbConection, closeDbConnection, runQuery};