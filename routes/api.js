const { EditCommandRequest } = require('devexpress-richedit/lib/core/model/json/command-request');
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



// await pool 방식
router.post('/updateData', async function(req, res, next) {
    try {

        console.log('updateData');

        let pool = await mssql.connect(config)

        console.log(JSON.parse(req.body.data));
        //console.log(JSON.parse(req.body.data));

        var updateObj = JSON.parse(req.body.data);

        var queryString = "";

        for(i=0; i<updateObj.length; i++) {
            var selectQueryString = "SELECT * FROM tBM WHERE BM_i = " + updateObj[i].c_BM_IDs;

            console.log("Query : " + selectQueryString);
            //res.render()
            let result = await pool.query(selectQueryString)
                console.log('I : :', i);
                console.log("BM_i : " + result.recordset[0].BM_i);
                console.log("BM_UpIDs : " + result.recordset[0].BM_UpIDs);
                console.log("BM_LoIDs : " + result.recordset[0].BM_LoIDs);
                console.log("org up : " + updateObj[i].orgUpIDs);
                console.log("org lo : " + updateObj[i].orgLoIDs);

            if(result.recordset[0].BM_UpIDs == updateObj[i].orgUpIDs && result.recordset[0].BM_LoIDs == updateObj[i].orgLoIDs) {
                queryString += "UPDATE tBM SET BM_UpIDs = " + updateObj[i].c_BM_UpIDs + ", BM_LoIDs = " + updateObj[i].c_BM_LoIDs 
                queryString += " WHERE BM_i = " + updateObj[i].c_BM_IDs
                queryString += ";";
                console.log('queryString :', queryString);
            } else {
                console.log("Data Compare Error");
                res.json({data : 'Error'} );
                return;
            }
        }

        pool.query(queryString, function (err, recordset) {
            res.json({data : 'OK'} );
        });

        
    } catch (err) {
        // alert(err);
        console.log('error fire',err)
    }
    // res.render('index', { title: 'Express' });

});


// router.post('/updateData', function(req, res, next) {
//     try {

//         console.log('updateData');

//         mssql.connect(config, function (err) {

//             console.log('Connect');
//             var request = new mssql.Request();

//             console.log(JSON.parse(req.body.data));
//             //console.log(JSON.parse(req.body.data));

//             var updateObj = JSON.parse(req.body.data);

//             console.log(updateObj.length);

//             var queryString = "";
//             console.log('updateObj :', updateObj);
//             // -- 이전 것과 비교

//             // -- 이걸 프로시저에서 체크해야 하나?
//             // -- 프로시저에서 체크하는 경우 Error가 발생하거나
//             // -- 결과를 Return 받아야 한다.
//             // -- 하지만 여러개를 동작하는 경우이기에 Return 받는것은 맞지 않다.
//             // -- 에러의 경우도 명확한 에러를 확인해야하는데 이러면 확인할 수 없다.

//             // -- 프로시저가 아닌 프로그램에서 진행한다면?

//             // 예외처리는 좀 더 상세 진행하기로 한다.

//             for(i=0; i<updateObj.length; i++) {
//                 var selectQueryString = "SELECT * FROM tBM WHERE BM_i = " + updateObj[i].c_BM_IDs;

//                 console.log("Query : " + selectQueryString);
//                 //res.render()
//                 request.query(selectQueryString, function (err, recordset) {
//                     console.log("BM_i : " + recordset.recordset[0].BM_i);
//                     console.log('i :',i);
//                     console.log("org up : " + updateObj[i].orgUpIDs);
//                     console.log("org lo : " + updateObj[i].orgLoIDs);
//                 });
//                 // console.log('rescordset :', recordset);
//                 if(recordset.recordset[0].BM_UpIDs == updateObj[i].orgUpIDs && recordset.recordset[0].BM_LoIDs == updateObj[i].orgLoIDs) {
//                     queryString += "UPDATE tBM SET BM_UpIDs = " + updateObj[i].c_BM_UpIDs + ", BM_LoIDs = " + updateObj[i].c_BM_LoIDs 
//                     queryString += " WHERE BM_i = " + updateObj[i].c_BM_IDs
//                     queryString += ";";
//                 } else {
//                     res.json({data : 'Error'} );
//                     return;
//                 }
//             }

//             request.query(queryString, function (err, recordset) {
        
//                 //console.log(recordset.recordset)
//                 //res.render()
//                 res.json({data : 'OK'} );
//             });

//             request.input('p_Parameter', sql.NVARCHAR(sql.MAX), '|||ExecTy       ===gvvA|||E_IDs        ===E0000001|||asas         ===  |||');
        
//             request.execute('p__PT_FA', function (err, recordsets, returnValue) {

//                 res.json(
//                     { data : recordsets }
//                 );
//             });
//         });
//     } catch (err) {
//         alert(err);
//         //console.log('error fire')
//     }
//     // res.render('index', { title: 'Express' });

// });

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