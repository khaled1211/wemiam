const {Pool,Client} = require('pg');

const connectionString= 'postgressql://deventrepriseportal:!DEV!Tunis_entrepriseportal@database-wemiam-dev.cpr41esgbm78.eu-west-3.rds.amazonaws.com:5432/entrepriseportal'
// const config = {
//     host: 'database-wemiam-dev.cpr41esgbm78.eu-west-3.rds.amazonaws.com',
//     // Do not hard code your username and password.
//     // Consider using Node environment variables.
//     user: 'deventrepriseportal',     
//     password: '!DEV!Tunis_entrepriseportal',
//     database: 'entrepriseportal',
//     port: 5432,
//     ssl: true
// };

const client = new Client({
    connectionString:connectionString
});

  
client.connect(err => {
    if (err) throw err;
    else { queryDatabase(); }
});



        
    console.log(`Running query to PostgreSQL server`);
    // client
    // .query(query)
    // .then(() => {
    //     console.log('Table created successfully!');
    //     client.end(console.log('Closed client connection'));
    // })
    // .catch(err => console.log(err))
    // .then(() => {
    //     console.log('Finished execution, exiting now');
    //     process.exit();
    // });
    
        


