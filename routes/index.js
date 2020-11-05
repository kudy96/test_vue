var express = require('express');
var router = express.Router();
var cors = require('cors');
const mssql = require('mssql');
/* GET home page. */


router.get('/', function(req, res, next) {
    res.render('test', { title: 'Express' });
});

router.get('/test',function(req,res,next){
    console.log('good');
    res.render('test');
})

router.get('/editor',function(req,res,next){
    console.log('good');
    res.render('editor');
})

router.get('/ckeditor',function(req,res,next){
    console.log('ckeditor!');
    res.render('ckeditor');
})

router.post('/api/SaveDocument', function (req, res) {
    var fileAsBase64 = req.body.base64;
    var fileName = req.body.fileName;
    var format = req.body.format;
    var reason = req.body.reason;
    console.log('nice nice');
    fs.writeFile(`${fileName}.${getDocumentExtension(format)}`, fileAsBase64, 'base64', (err) => { });
    res.sendStatus(200);
});


function getDocumentExtension(format) {
    switch (format) {
        case '4': return "docx";
        case '2': return "rtf";
        case '1': return "txt";
    }
    return "docx";
    }


////////  DevExtreme

//웹 에디터
router.get('/dev',function(req,res){
  res.render('dev_test');
})


//드래그 테이블
router.get('/drag',function(req,res,next){
    console.log('ckeditor!');
    res.render('board_drag');
})

module.exports = router;
