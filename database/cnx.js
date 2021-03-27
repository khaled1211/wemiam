const knex=require('knex')({
    client :'pg',
    connection:{
        host:'database-wemiam-dev.cpr41esgbm78.eu-west-3.rds.amazonaws.com',
        user: 'deventrepriseportal',     
            password: '!DEV!Tunis_entrepriseportal',
        database:'entrepriseportal'
    }
}

);
module.exports=knex;