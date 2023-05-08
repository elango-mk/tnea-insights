const sqlite = require('./dbUtils');
const zlib = require('zlib');

const allotmentQuery  = `SELECT APPLICATION_NO,CANDIDATE_NAME,AGGR_MARK,RANK,COMMUNITY,COLLEGE_CODE,BRANCH_CODE,ALLOTTED_CATEGORY,ROUND FROM Allotment`;

async function getAllotmentData()
{
  const data = await sqlite.runQuery(allotmentQuery);

  if(typeof data != 'undefined')
  {
    console.log("actionUtils Data Length : " + data.length);
  }
  return data;
}

async function getAllotmentArrays()
{
  let reponseObj = {};
  const data = await sqlite.getRowObjects(allotmentQuery);

  if(typeof data != 'undefined')
  {
    console.log("actionUtils Data Length : " + data.length);
  }
  reponseObj['data'] = data;
  return reponseObj;
}

async function getAllotmentObjects()
{
  let reponseObj = {};
  const data = await sqlite.getRowObjects(allotmentQuery);

  if(typeof data != 'undefined')
  {
    console.log("actionUtils Data Length : " + data.length);
  }
  reponseObj['data'] = data;
  console.log(reponseObj);
 
  const compressedData = zlib.brotliCompressSync(Buffer.from(JSON.stringify(reponseObj)));
  return compressedData;
}

module.exports = { getAllotmentData, getAllotmentObjects };