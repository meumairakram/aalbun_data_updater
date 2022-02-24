const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'cli_user',
    password:'vVXyLbVxEftF9zZY',
    database: 'aalbun_cli_data'
});



// "UPDATE current_publications as publications SET applicant_id = (SELECT applicants.id FROM applicants as applicants WHERE applicants
//     .applicant_name = (SELECT cpm.value FROM current_publication_metas as cpm WHERE `cpm`.`key` = 'snm' AND `cpm`.`publication_id` = `publications`.`pub_id`)) WHE
//     RE `publications`.`applicant_id` IS NULL LIMIT 40000;



var index = 0;

function updateDbRecords() {

    var query = "UPDATE current_publications as publications SET applicant_id = (SELECT applicants.id FROM applicants as applicants WHERE applicants.applicant_name = (SELECT cpm.value FROM current_publication_metas as cpm WHERE `cpm`.`key` = 'snm' AND `cpm`.`publication_id` = `publications`.`pub_id`)) WHERE `publications`.`applicant_id` IS NULL LIMIT 10";
    // var query = "SELECT * FROM current_publications LIMIT 10";
    connection.query(query, function(err, results) {

        if (err) {
            console.log("AN ERROR OCCURED",err);
            return false;
        }   
        
        
        index = index + results.length;
        if(results.length > 0 ) {
            console.log(`Updated ${index} records`);
            updateDbRecords();
        }

    })

}

updateDbRecords();