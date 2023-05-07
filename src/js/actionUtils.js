const sqlite = require('./dbUtils');

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

module.exports = { getAllotmentData };