var express = require('express');
var router = express.Router();
const mssql = require('mssql');
/* GET home page. */

const config = {
            // "user"      : "sa",
            // "password"  : "qw12qw12)",
            // "server"    : "192.168.0.122",
            // "port"      : 1433,
            // "database"  : "aTEST",
            // "timezone"  : 'utc',
            // "options"   : {
            //     "encrypt" : false
            // }
        "user"      : "sa",
        "password"  : "qw12qw12",
        "server"    : "192.168.0.135",
        "port"      : 1433,
        "database"  : "BD_TEST",
        // "timezone"  : 'utc',
        "options"   : {
            encrypt: false, // Use this if you're on Windows Azure 
            enableArithAbort: true
    }
}

// 일반적으로 사용하는 쿼리 사용 방법
router.get('/callData', function(req, res, next) {
    try {

        console.log('callData');

        mssql.connect(config, function (err) {

            console.log('Connect');
            var request = new mssql.Request();

            var queryString = "Exec p_BM";

            request.query(queryString, function (err, recordset) {
        
                res.json({data : recordset.recordset} );
                //console.log(recordset.recordset)
                //res.render()
            });
        
        
            

            // request.input('p_Parameter', sql.NVARCHAR(sql.MAX), '|||ExecTy       ===gvvA|||E_IDs        ===E0000001|||asas         ===  |||');
        
            // request.execute('p__PT_FA', function (err, recordsets, returnValue) {

            //     res.json(
            //         { data : recordsets }
            //     );
            // });
        });
    } catch (err) {
        alert(err);
        //console.log('error fire')
    }
    // res.render('index', { title: 'Express' });

});

router.post('/addData', function(req, res, next) {
    try {

        console.log('addData');

        mssql.connect(config, function (err) {

            console.log('Connect');
            var request = new mssql.Request();

            console.log(req.body);
            var queryString = "Exec p_BM_CUD " + req.body.pUpIDs + ", '" + req.body.pTitle + "'";

            // 

            request.query(queryString, function (err, recordset) {
        
                //console.log(recordset.recordset)
                //res.render()
                
                res.json({data : 'OK'} );
            });
        
        
            

            // request.input('p_Parameter', sql.NVARCHAR(sql.MAX), '|||ExecTy       ===gvvA|||E_IDs        ===E0000001|||asas         ===  |||');
        
            // request.execute('p__PT_FA', function (err, recordsets, returnValue) {

            //     res.json(
            //         { data : recordsets }
            //     );
            // });
        });
    } catch (err) {
        alert(err);
        //console.log('error fire')
    }
    // res.render('index', { title: 'Express' });

});


//데이터 불러오기
router.get('/board', async function(req, res){
    //트랜잭션 미 사용
    try {
        let pool = await mssql.connect(config)

        let result = await pool.request()
            .query(`select * from tAD left join tADY on tAD.AD_ADY_ID = tADY.ADY_ID`)
        // console.log(result.recordset);
        res.json({ data : result.recordset });
    } catch (err) {
        console.log(err);
        console.log('error fire')
    }
})

//데이터 삽입
router.post('/board', async function (req, res, next) {
    //트랜잭션 미 사용
    try {
        let pool = await mssql.connect(config)

        //첫번째 인서트
        await pool.request()
        .input('NUMBER', mssql.Int, req.body.PARAM)
        .input('VARCHAR', mssql.NVarChar, req.PARAM)
        .query(`INSERT INTO board 
                    VALUES(
                        (select CASE  WHEN MAX(B_Group) IS NULL THEN 1 ELSE MAX(B_Group)+1 END FROM board),
                        0,
                        0,
                        @board_text
                        )`
                );

        //두번째 인서트
        await pool.request()
        .input('NUMBER', mssql.Int, req.body.PARAM)
        .input('VARCHAR', mssql.NVarChar, req.body.PARAM)
        .query(`INSERT INTO board 
                    VALUES(
                        (select CASE  WHEN MAX(B_Group) IS NULL THEN 1 ELSE MAX(B_Group)+1 END FROM board),
                        0,
                        0,
                        @board_text
                        )`
                );
 
        res.json({data:'1'})
    } catch (err) {
        console.log(err);
        console.log('error fire')
    }
});
//데이터 수정
router.put('/board/:urlParam', async function (req, res, next) {

    let param = req.params.urlParam
    //트랜잭션 사용 시
    const transaction =new mssql.Transaction();
    try {
        let pool = await mssql.connect(config)

        let query1 = 'SELECT'

        let query2 = 'INSERT'
            
        await new Promise(resolve => transaction.begin(resolve));
        let request = new mssql.Request(transaction);

        //첫번째 쿼리
        await request
            .input('NUMBER', mssql.Int, req.body.PARAM)
            .input('VARCHAR', mssql.NVarChar, param)
            .query(query1);
        //두번째 쿼리
        await request
            .input('NUMBER', mssql.Int, req.body.PARAM)
            .input('VARCHAR', mssql.NVarChar, param)
            .query(query2);

        await transaction.commit();
        res.json({result : 1})
    } catch (err) {
        await transaction.rollback();
        console.log(err);
        console.log('error fire')
    }
});

//데이터 삭제
router.put('/board/:urlParam', async function (req, res, next) {

    let param = req.params.urlParam
    //트랜잭션 사용 시
    const transaction =new mssql.Transaction();
    try {
        let pool = await mssql.connect(config)

        let query1 = 'SELECT'

        let query2 = 'DELETE'
            
        await new Promise(resolve => transaction.begin(resolve));
        let request = new mssql.Request(transaction);
        //첫번째 쿼리
        await request
            .input('NUMBER', mssql.Int, req.body.PARAM)
            .input('VARCHAR', mssql.NVarChar, param)
            .query(query1);

        //두번째 쿼리
        await request
            .input('NUMBER', mssql.Int, req.body.PARAM)
            .input('VARCHAR', mssql.NVarChar, param)
            .query(query2);

        await transaction.commit();
        res.json({result : 1})
    } catch (err) {
        await transaction.rollback();
        console.log(err);
        console.log('error fire')
    }
});

module.exports = router;