var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser  = require('body-parser');
app.use(express.static(__dirname));
app.use(bodyParser.json());
// app.use(express.json());

var connection = mysql.createConnection({
    host  :'localhost',
    user  :'testmysql',
    password :'test123',
    database : 'test'
});

connection.connect(function(err){
    if(err){
        console.log("Error in connecting DB" + err);
        return;
    }

    console.log("Connection Estabilished");

});

    
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
                                
/*customer details*/
// post //

app.post('/addcustomer',function(req,res){
	
    var ToyaltyCode=req.query.ToyaltyCode;
	var BranchCode=req.query.BranchCode;
    var CustomerName= req.query.CustomerName;
    var CustomerMobile= req.query.CustomerMobile;
    var CustomerEmailid = req.query.CustomerEmailid;
	var date= req.query.date;
    var Address1 = req.query.Address1;
	var Address2 = req.query.Address2;
	var Address3 = req.query.Address3;
    var Estimateno = req.query.Estimateno;
	var Boughtitem = req.query.Boughtitem;
	var Valid = req.query.Valid;
	var Valid_Category = req.query.Valid_Category;
    var data={
        "error":1,
        "clients":""
    };
connection.query("insert into customerdetails(ToyaltyCode,BranchCode,CustomerName,CustomerMobile,CustomerEmailid,date,Address1,Address2,Address3,Estimateno,Boughtitem,Valid,Valid_Category) values('"+ToyaltyCode+"','"+BranchCode+"','"+CustomerName+"','"+CustomerMobile+"','"+CustomerEmailid+"','"+date+"','"+Address1+"','"+Address2+"','"+Address3+"','"+Estimateno+"','"+Boughtitem+"','"+Valid+"','"+Valid_Category+"')",function(err,rows,fields){
             if(!err){
            res.json({code:1,message:'added'});
        }else{
            data["error"]=1;
            data["users"]="not added";
            res.json({code:0,message:'not added'+err});
        }  
         
    })
  });
  
   //update//
  
  app.put('/updatecustomer',function(req,res,next){
    
    var ToyaltyCode=req.query.ToyaltyCode;
	var BranchCode=req.query.BranchCode;
    var CustomerName= req.query.CustomerName;
    var CustomerMobile= req.query.CustomerMobile;
    var CustomerEmailid = req.query.CustomerEmailid;
	var date= req.query.date;
    var Address1 = req.query.Address1;
	var Address2 = req.query.Address2;
	var Address3 = req.query.Address3;
    var Estimateno = req.query.Estimateno;
	var Boughtitem = req.query.Boughtitem;
	var Valid = req.query.Valid;
	var Valid_Category = req.query.Valid_Category;
    var id = req.query.id;
    var data={
        "error":1,
        "clients":""
    };
    
connection.query("UPDATE customerdetails SET ToyaltyCode='"+ToyaltyCode+"',BranchCode='"+BranchCode+"',CustomerName='"+CustomerName+"',CustomerMobile='"+CustomerMobile+"',CustomerEmailid='"+CustomerEmailid+"',date='"+date+"',Address1='"+Address1+"',Address2='"+Address2+"',Address3='"+Address3+"',Estimateno='"+Estimateno+"',Boughtitem='"+Boughtitem+"',Valid='"+Valid+"',Valid_Category='"+Valid_Category+"' where id = '"+id+"'", function(err, rows){                

          if(!err) {
                  res.json("Successfully updated!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                        res.json("There was an error with MySQL.");
                }
        //connection.release();
    })
  
});

//delete method//

app.delete('/removecustomer',function(req,res){
     var id = req.query.id;
     var data={
        "error":1,
        "clients":""
    };
  
     var query = connection.query('delete from customerdetails where id = ?',[id],function(err,result ,rows){   
      if(!err) {
                  res.json("Successful deleted!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                   res.json(data);
                   res.json("There was an error with MySQL.");
                }
    })
  
  
});
app.get('/getcustomer',function(req,res){
    connection.query("SELECT * FROM customerdetails ",function(err, rows){

        res.json(rows);
        console.log(rows);
    });
});


/*subitem details*/
// post //

app.post('/addsubitem',function(req,res){
   
    var Stoneno= req.query.Stoneno;
    var BARCODE= req.query.BARCODE;
    var STONENAME = req.query.STONENAME;
	var STQTY= req.query.STQTY;
    var STCT = req.query.STCT;
	var STCTRATE = req.query.STCTRATE;
	var STAMOUNT= req.query.STAMOUNT;
    var STONECUT = req.query.STONECUT;
    var data={
        "error":1,
        "clients":""
    };
connection.query("insert into subitemdetails(Stoneno, BARCODE, STONENAME, STQTY, STCT, STCTRATE, STAMOUNT, STONECUT) values('"+Stoneno+"', '"+BARCODE+"', '"+STONENAME+"', '"+STQTY+"', '"+STCT+"', '"+STCTRATE+"', '"+STAMOUNT+"', '"+STONECUT+"')",function(err,rows,fields){
             if(!err){
            res.json({code:1,message:'added'});
        }else{
            data["error"]=1;
            data["users"]="not added";
            res.json({code:0,message:'not added'+err});
        }  
         
    })
  });
  
   //update//
  
  app.put('/updatesubitem',function(req,res,next){
	  
    var Stoneno= req.query.Stoneno;
    var BARCODE= req.query.BARCODE;
    var STONENAME = req.query.STONENAME;
	var STQTY= req.query.STQTY;
    var STCT = req.query.STCT;
	var STCTRATE = req.query.STCTRATE;
	var STAMOUNT= req.query.STAMOUNT;
    var STONECUT = req.query.STONECUT;
  
    var data={
        "error":1,
        "clients":""
    };
    
connection.query("update subitemdetails set BARCODE='"+BARCODE+"',STONENAME='"+STONENAME+"',STQTY='"+STQTY+"',STCT='"+STCT+"',STCTRATE='"+STCTRATE+"',STAMOUNT='"+STAMOUNT+"',STONECUT='"+STONECUT+"' where Stoneno = '"+Stoneno+"'", function(err, rows){                

           if(!err) {
                  res.json("Successfully updated!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                        res.json("There was an error with MySQL.");
                }
        //connection.release();
    })
  
});

//delete method//

app.delete('/removesubitem',function(req,res){
     var id = req.query.id;
     var data={
        "error":1,
        "clients":""
    };
  
     var query = connection.query('delete from subitemdetails where Stoneno = ?',[Stoneno],function(err,result ,rows){   
      if(!err) {
                  res.json("Successful deleted!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                   res.json(data);
                   res.json("There was an error with MySQL.");
                }
    })
  
  
});

// get //
 
app.get('/getsubitem',function(req,res){
    
    connection.query("SELECT * FROM subitemdetails",function(err, rows){
        res.json(rows);
        console.log(rows);
    });
});

/*kyc details*/
// post //

app.post('/addkyc',function(req,res){
   
    var CUSTOMERNAME= req.query.CUSTOMERNAME;
    var ADDRESS1= req.query.ADDRESS1;
    var ADDRESS2 = req.query.ADDRESS2;
	var ADDRESS3= req.query.ADDRESS3;
    var MOBILE = req.query.MOBILE;
	var LASTVISITSTORE = req.query.LASTVISITSTORE;
	var LASTVISITDATE= req.query.LASTVISITDATE;
    var TOTALBUSINESSVALUE = req.query.TOTALBUSINESSVALUE;
	var TOTALWEIGHT= req.query.TOTALWEIGHT;
    var AVGDISCOUNT= req.query.AVGDISCOUNT;
    var AVGWEIGHT = req.query.AVGWEIGHT;
	var TOTALCARATS= req.query.TOTALCARATS;
    var ADVANCEINHAND = req.query.ADVANCEINHAND;
	var DEPOSITSCHEME = req.query.DEPOSITSCHEME;
	var DEPOSITAMOUNT= req.query.DEPOSITAMOUNT;
    var CREDITRATING = req.query.CREDITRATING;
	var IDPROOF = req.query.IDPROOF;
	var NUMBEROFVISITS = req.query.NUMBEROFVISITS;
	var DAYSSINCELASTVISTDATE= req.query.DAYSSINCELASTVISTDATE;
    var Email = req.query.Email;
    var data={
        "error":1,
        "clients":""
    };
connection.query("insert into kyc(CUSTOMERNAME,ADDRESS1,ADDRESS2,ADDRESS3,MOBILE,LASTVISITSTORE,LASTVISITDATE,TOTALBUSINESSVALUE,TOTALWEIGHT,AVGDISCOUNT,AVGWEIGHT,TOTALCARATS,ADVANCEINHAND,DEPOSITSCHEME,DEPOSITAMOUNT,CREDITRATING,IDPROOF,NUMBEROFVISITS,DAYSSINCELASTVISTDATE,Email) values('"+CUSTOMERNAME+"','"+ADDRESS1+"','"+ADDRESS2+"','"+ADDRESS3+"','"+MOBILE+"','"+LASTVISITSTORE+"','"+LASTVISITDATE+"','"+TOTALBUSINESSVALUE+"','"+TOTALWEIGHT+"','"+AVGDISCOUNT+"','"+AVGWEIGHT+"','"+TOTALCARATS+"','"+ADVANCEINHAND+"','"+DEPOSITSCHEME+"','"+DEPOSITAMOUNT+"','"+CREDITRATING+"','"+ADVANCEINHAND+"','"+NUMBEROFVISITS+"','"+DAYSSINCELASTVISTDATE+"','"+Email+"')",function(err,rows,fields){
             if(!err){
            res.json({code:1,message:'added'});
        }else{
            data["error"]=1;
            data["users"]="not added";
            res.json({code:0,message:'not added'+err});
        }  
         
    })
  });
  
   //update//
  
  app.put('/updatekyc',function(req,res,next){
	  
    var CUSTOMERNAME= req.query.CUSTOMERNAME;
    var ADDRESS1= req.query.ADDRESS1;
    var ADDRESS2 = req.query.ADDRESS2;
	var ADDRESS3= req.query.ADDRESS3;
    var MOBILE = req.query.MOBILE;
	var LASTVISITSTORE = req.query.LASTVISITSTORE;
	var LASTVISITDATE= req.query.LASTVISITDATE;
    var TOTALBUSINESSVALUE = req.query.TOTALBUSINESSVALUE;
	var TOTALWEIGHT= req.query.TOTALWEIGHT;
    var AVGDISCOUNT= req.query.AVGDISCOUNT;
    var AVGWEIGHT = req.query.AVGWEIGHT;
	var TOTALCARATS= req.query.TOTALCARATS;
    var ADVANCEINHAND = req.query.ADVANCEINHAND;
	var DEPOSITSCHEME = req.query.DEPOSITSCHEME;
	var DEPOSITAMOUNT= req.query.DEPOSITAMOUNT;
    var CREDITRATING = req.query.CREDITRATING;
	var IDPROOF = req.query.IDPROOF;
	var NUMBEROFVISITS = req.query.NUMBEROFVISITS;
	var DAYSSINCELASTVISTDATE= req.query.DAYSSINCELASTVISTDATE;
    var Email = req.query.Email;
    var id = req.query.id;
    var data={
        "error":1,
        "clients":""
    };
    
connection.query("update kyc set CUSTOMERNAME='"+CUSTOMERNAME+"',ADDRESS1='"+ADDRESS1+"',ADDRESS2='"+ADDRESS2+"',ADDRESS3='"+ADDRESS3+"',MOBILE='"+MOBILE+"',LASTVISITSTORE='"+LASTVISITSTORE+"',LASTVISITDATE='"+LASTVISITDATE+"',TOTALBUSINESSVALUE='"+TOTALBUSINESSVALUE+"',TOTALWEIGHT='"+TOTALWEIGHT+"',AVGDISCOUNT='"+AVGDISCOUNT+"',AVGWEIGHT='"+AVGWEIGHT+"',TOTALCARATS='"+TOTALCARATS+"',ADVANCEINHAND='"+ADVANCEINHAND+"',DEPOSITSCHEME='"+DEPOSITSCHEME+"',DEPOSITAMOUNT='"+DEPOSITAMOUNT+"',CREDITRATING='"+CREDITRATING+"',IDPROOF='"+IDPROOF+"',NUMBEROFVISITS='"+NUMBEROFVISITS+"',DAYSSINCELASTVISTDATE='"+DAYSSINCELASTVISTDATE+"',Email='"+Email+"' where id = '"+id+"'", function(err, rows){                

           if(!err) {
                  res.json("Successfully updated!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                        res.json("There was an error with MySQL.");
                }
        //connection.release();
    })
  
});

//delete method//

app.delete('/removekyc',function(req,res){
     var id = req.query.id;
     var data={
        "error":1,
        "clients":""
    };
  
 connection.query('delete from kyc where Id = ?',[Id],function(err,result ,rows){   
      if(!err) {
                  res.json("Successful deleted!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                   res.json(data);
                   res.json("There was an error with MySQL.");
                }
    })
  
  
});

// get //
 
app.get('/getkyc',function(req,res){
    
    connection.query("SELECT * FROM kyc",function(err, rows){
        res.json(rows);
        console.log(rows);
    });
});

/*product details*/
// post //

app.post('/addproduct',function(req,res){
   
    var Itemno= req.query.Itemno;
    var BARCODE= req.query.BARCODE;
    var MODELNAME = req.query.MODELNAME;
	var QUANTITY= req.query.QUANTITY;
    var GROSSWT = req.query.GROSSWT;
	var NETWT = req.query.NETWT;
	var BOARDRATE= req.query.BOARDRATE;
    var VA = req.query.VA;
	var STONERATE= req.query.STONERATE;
    var AMOUNT= req.query.AMOUNT;
    var PLATINUMRATE = req.query.PLATINUMRATE;
	var VAPERCENT= req.query.VAPERCENT;
    var VAPERGRAM = req.query.VAPERGRAM;
	var OTHERSTONECHARGE = req.query.OTHERSTONECHARGE;
	var TOTCLRSTNCT= req.query.TOTCLRSTNCT;
    var TOTDMDCT = req.query.TOTDMDCT;
	var TOTSTONECARAT = req.query.TOTSTONECARAT;
	var GOLDVALUE = req.query.GOLDVALUE;
    var TAXAMOUNT = req.query.TAXAMOUNT;
	var CESSAMOUNT = req.query.CESSAMOUNT;
	var NETAMOUNT= req.query.NETAMOUNT;
    var STONEWT = req.query.STONEWT;
	var PROMOPERCENT = req.query.PROMOPERCENT;
	var PROMODISC = req.query.PROMODISC;
	var ITEMTYPE= req.query.ITEMTYPE;
    var METALVALUE = req.query.METALVALUE;
	var BARCODESTATUS = req.query.BARCODESTATUS;
	var VALID = req.query.VALID;
	var VALID_CATEGORY = req.query.VALID_CATEGORY;
    var data={
        "error":1,
        "clients":""
    };
connection.query("insert into productdetails( BARCODE,MODELNAME,QUANTITY,GROSSWT,NETWT,BOARDRATE,VA,STONERATE,AMOUNT,PLATINUMRATE,VAPERCENT,VAPERGRAM,OTHERSTONECHARGE,TOTCLRSTNCT,TOTDMDCT,TOTSTONECARAT,GOLDVALUE,TAXAMOUNT,CESSAMOUNT,NETAMOUNT,STONEWT,PROMOPERCENT,PROMODISC,ITEMTYPE,METALVALUE ,BARCODESTATUS,VALID,VALID_CATEGORY) values('"+BARCODE+"', '"+MODELNAME+"', '"+QUANTITY+"', '"+GROSSWT+"', '"+NETWT+"', '"+BOARDRATE+"', '"+VA+"', '"+STONERATE+"', '"+AMOUNT+"', '"+PLATINUMRATE+"', '"+VAPERCENT+"', '"+VAPERGRAM+"', '"+OTHERSTONECHARGE+"', '"+TOTCLRSTNCT+"', '"+TOTDMDCT+"', '"+TOTSTONECARAT+"', '"+GOLDVALUE+"', '"+TAXAMOUNT+"', '"+CESSAMOUNT+"', '"+NETAMOUNT+"', '"+STONEWT+"', '"+PROMOPERCENT+"', '"+PROMODISC+"', '"+ITEMTYPE+"','"+METALVALUE+"' ,'"+BARCODESTATUS+"', '"+VALID+"' ,'"+VALID_CATEGORY+"')",function(err,rows,fields){
             if(!err){
            res.json({code:1,message:'added'});
        }else{
            data["error"]=1;
            data["users"]="not added";
            res.json({code:0,message:'not added'+err});
        }  
         
    })
  });
  
   //update//
  
  app.put('/updateproduct',function(req,res,next){
	  
    var Itemno= req.query.Itemno;
    var BARCODE= req.query.BARCODE;
    var MODELNAME = req.query.MODELNAME;
	var QUANTITY= req.query.QUANTITY;
    var GROSSWT = req.query.GROSSWT;
	var NETWT = req.query.NETWT;
	var BOARDRATE= req.query.BOARDRATE;
    var VA = req.query.VA;
	var STONERATE= req.query.STONERATE;
    var AMOUNT= req.query.AMOUNT;
    var PLATINUMRATE = req.query.PLATINUMRATE;
	var VAPERCENT= req.query.VAPERCENT;
    var VAPERGRAM = req.query.VAPERGRAM;
	var OTHERSTONECHARGE = req.query.OTHERSTONECHARGE;
	var TOTCLRSTNCT= req.query.TOTCLRSTNCT;
    var TOTDMDCT = req.query.TOTDMDCT;
	var TOTSTONECARAT = req.query.TOTSTONECARAT;
	var GOLDVALUE = req.query.GOLDVALUE;
    var TAXAMOUNT = req.query.TAXAMOUNT;
	var CESSAMOUNT = req.query.CESSAMOUNT;
	var NETAMOUNT= req.query.NETAMOUNT;
    var STONEWT = req.query.STONEWT;
	var PROMOPERCENT = req.query.PROMOPERCENT;
	var PROMODISC = req.query.PROMODISC;
	var ITEMTYPE= req.query.ITEMTYPE;
    var METALVALUE = req.query.METALVALUE;
	var BARCODESTATUS = req.query.BARCODESTATUS;
	var VALID = req.query.VALID;
	var VALID_CATEGORY = req.query.VALID_CATEGORY;
    var data={
        "error":1,
        "clients":""
    };
    
connection.query("update productdetails set BARCODE='"+BARCODE+"',MODELNAME='"+MODELNAME+"',QUANTITY='"+QUANTITY+"',GROSSWT='"+GROSSWT+"',NETWT='"+NETWT+"',BOARDRATE='"+BOARDRATE+"',VA='"+VA+"',STONERATE='"+STONERATE+"',AMOUNT='"+AMOUNT+"',PLATINUMRATE='"+PLATINUMRATE+"',VAPERCENT='"+VAPERCENT+"',VAPERGRAM='"+VAPERGRAM+"',OTHERSTONECHARGE='"+OTHERSTONECHARGE+"',TOTCLRSTNCT='"+TOTCLRSTNCT+"',TOTDMDCT='"+TOTDMDCT+"',TOTSTONECARAT='"+TOTSTONECARAT+"',GOLDVALUE='"+GOLDVALUE+"',TAXAMOUNT='"+TAXAMOUNT+"',CESSAMOUNT='"+CESSAMOUNT+"',NETAMOUNT='"+NETAMOUNT+"',STONEWT='"+STONEWT+"',PROMOPERCENT='"+PROMOPERCENT+"',PROMODISC='"+PROMODISC+"',ITEMTYPE='"+ITEMTYPE+"',METALVALUE='"+METALVALUE+"' ,BARCODESTATUS='"+BARCODESTATUS+"',VALID='"+VALID+"' ,VALID_CATEGORY='"+VALID_CATEGORY+"' where Itemno = '"+Itemno+"'", function(err, rows){                

           if(!err) {
                  res.json("Successfully updated!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                        res.json("There was an error with MySQL.");
                }
        //connection.release();
    })
  
});

//delete method//

app.delete('/removeproduct ',function(req,res){
     var id = req.query.id;
     var data={
        "error":1,
        "clients":""
    };
  
connection.query('delete from productdetails where Itemno = ?',[Itemno],function(err,result ,rows){   
      if(!err) {
                  res.json("Successful deleted!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                   res.json(data);
                   res.json("There was an error with MySQL.");
                }
    })
  
  
});

// get //
 
app.get('/getproduct',function(req,res){
    
    connection.query("SELECT * FROM productdetails",function(err, rows){
        res.json(rows);
        console.log(rows);
    });
});

// *Join Tables *//
 
app.get('/FetchBarcode',function(req,res){
	 
    connection.query("select * from jewels.subitemdetails AS A INNER JOIN jewels.productdetails AS B ON A.BARCODE = B.BARCODE",function(err, rows){
        res.json(rows);
        console.log(rows);
    });
});

app.get('/getproductbarcode',function(req,res){
    var BARCODE= req.query.BARCODE;
    connection.query("SELECT * FROM productdetails where BARCODE='"+BARCODE+"'",function(err, rows){
        res.json(rows);
        console.log(rows);
    });
});

app.get('/getsubitemsbarcode',function(req,res){
    var BARCODE= req.query.BARCODE;
    connection.query("SELECT * FROM subitemdetails where BARCODE='"+BARCODE+"'",function(err, rows){
        res.json(rows);
        console.log(rows);
    });
});

/*ip details*/
// post //

app.post('/addip',function(req,res){
   
    var Ip_Address= req.query.Ip_Address;
    var Port= req.query.Port;
    var Category = req.query.Category;
    var data={
        "error":1,
        "clients":""
    };
connection.query("insert into ip_details(Ip_Address, Port, Category)values('"+Ip_Address+"', '"+Port+"', '"+Category+"')",function(err,rows,fields){
             if(!err){
            res.json({code:1,message:'added'});
        }else{
            data["error"]=1;
            data["users"]="not added";
            res.json({code:0,message:'not added'+err});
        }  
         
    })
  });
  
   //update//
  
app.put('/updateip_details',function(req,res,next){
	  
    var Ip_Address= req.query.Ip_Address;
    var Port= req.query.Port;
    var Category = req.query.Category;
    var id = req.query.id;
    var data={
        "error":1,
        "clients":""
    };
    
connection.query("update ip_details set Ip_Address='"+Ip_Address+"',Port='"+Port+"',Category='"+Category+"' where id = '"+id+"'", function(err, rows){                

           if(!err) {
                  res.json("Successfully updated!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                        res.json("There was an error with MySQL.");
                }
        //connection.release();
    })
  
});

//delete method//

app.delete('/removeip',function(req,res){
     var id = req.query.id;
     var data={
        "error":1,
        "clients":""
    };
  
connection.query('delete from ip_details where id = ?',[id],function(err,result ,rows){   
      if(!err) {
                  res.json("Successful deleted!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                   res.json(data);
                   res.json("There was an error with MySQL.");
                }
    })
  
  
});

// get //
 
app.get('/getip_details',function(req,res){
    
    connection.query("SELECT * FROM ip_details",function(err, rows){
        res.json(rows);
        console.log(rows);
    });
});

/*emp details*/
// post //

app.post('/addemp',function(req,res){
   
    var Emp_id= req.query.Emp_id;
    var Emp_name= req.query.Emp_name;
    var Emp_dob = req.query.Emp_dob;
	var Emp_Address= req.query.Emp_Address;
    var Category = req.query.Category;
    var data={
        "error":1,
        "clients":""
    };
connection.query("insert into emp_details(Emp_id, Emp_name, Emp_dob, Emp_Address, Category)values('"+Emp_id+"', '"+Emp_name+"', '"+Emp_dob+"', '"+Emp_Address+"', '"+Category+"')",function(err,rows,fields){
             if(!err){
            res.json({code:1,message:'added'});
        }else{
            data["error"]=1;
            data["users"]="not added";
            res.json({code:0,message:'not added'+err});
        }  
         
    })
  });
  
   //update//
  
  app.put('/update',function(req,res,next){
	  
    var Emp_id= req.query.Emp_id;
    var Emp_name= req.query.Emp_name;
    var Emp_dob = req.query.Emp_dob;
	var Emp_Address= req.query.Emp_Address;
    var Category = req.query.Category;
    var id = req.query.id;
    var data={
        "error":1,
        "clients":""
    };
    
 connection.query("update emp_details set Emp_id='"+Emp_id+"',Emp_name='"+Emp_name+"',Emp_dob='"+Emp_dob+"',Emp_Address='"+Emp_Address+"',Category='"+Category+"' where id = '"+id+"'", function(err, rows){                

           if(!err) {
                  res.json("Successfully updated!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                        res.json("There was an error with MySQL.");
                }
        //connection.release();
    })
  
});

//delete method//

app.delete('/remove',function(req,res){
     var id = req.query.id;
     var data={
        "error":1,
        "clients":""
    };
  
connection.query('delete from emp_details where id = ?',[id],function(err,result ,rows){   
      if(!err) {
                  res.json("Successful deleted!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                   res.json(data);
                   res.json("There was an error with MySQL.");
                }
    })
  
  
});

// get //
 
app.get('/getemp_details',function(req,res){
    connection.query("SELECT * FROM emp_details",function(err, rows){
        res.json(rows);
        console.log(rows);
    });
});

/* Get mstrItem Details */

//app.get('/getcategory', function(req, res) {
	
   //  var Category = req.query.Category;
	
//connection.query("SELECT * FROM ip_details where Category='D' OR 'G'",function(err, recordsets, returnValue, results) {
 // res.json(rows);
    //    console.log(rows);
    //});
//});

// get //
 
app.get('/getcustomerdetails',function(req,res){
    var CustomerMobile= req.query.CustomerMobile;
	var CustomerEmailid= req.query.CustomerEmailid;
    connection.query("SELECT id, ToyaltyCode, BranchCode, CustomerName, CustomerMobile, CustomerEmailid, date, Address1, Address2, Address3, Estimateno, Boughtitem, Valid, Valid_Category FROM customerdetails WHERE CustomerMobile ='"+CustomerMobile+"' OR CustomerEmailid='"+CustomerEmailid+"'",function(err, rows){
        res.json(rows);
        console.log(rows);
    });
});



 //update//
  
 app.put('/Updateproductdetails',function(req,res,next){
	  
    var Itemno= req.query.Itemno;
    var BARCODE= req.query.BARCODE;
	var BARCODESTATUS = req.query.BARCODESTATUS;
    var data={
        "error":1,
        "clients":""
    };
    
connection.query("update productdetails set BARCODESTATUS='"+BARCODESTATUS+"' where BARCODE = '"+BARCODE+"'", function(err, rows){                

           if(!err) {
                  res.json("Successfully updated!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                        res.json("There was an error with MySQL.");
                }
        //connection.release();
    })
  
});

                                
/*Estimate Transactions*/
// post //

app.post('/addEstimate_Transactions',function(req,res){
	
    var Cust_Id=req.query.Cust_Id;
    var CustomerName= req.query.CustomerName;
    var CustomerMobileno= req.query.CustomerMobileno;
    var Emailid = req.query.Emailid;
    var Address1 = req.query.Address1;
	var Address2 = req.query.Address2;
	var Gender = req.query.Gender;
    var Selected_Category = req.query.Selected_Category;
	var UserId = req.query.UserId;
	var BarcodeList = req.query.BarcodeList;
	var BarCode = req.query.BarCode;
    var data={
        "error":1,
        "clients":""
    };
connection.query("insert into Estimate_Transactions(Cust_Id, CustomerName, CustomerMobileno, Emailid, Address1, Address2, Gender, Selected_Category, UserId, BarcodeList, BarCode) values('"+Cust_Id+"', '"+CustomerName+"', '"+CustomerMobileno+"', '"+Emailid+"', '"+Address1+"', '"+Address2+"', '"+Gender+"', '"+Selected_Category+"', '"+UserId+"', '"+BarcodeList+"', '"+BarCode+"')",function(err,rows,fields){
             if(!err){
            res.json({code:1,message:'added'});
        }else{
            data["error"]=1;
            data["users"]="not added";
            res.json({code:0,message:'not added'+err});
        }  
         
    })
  });
  
   //update//
  
  app.put('/updateTransaction',function(req,res,next){
    
  
    var Cust_Id=req.query.Cust_Id;
    var CustomerName= req.query.CustomerName;
    var CustomerMobileno= req.query.CustomerMobileno;
    var Emailid = req.query.Emailid;
    var Address1 = req.query.Address1;
	var Address2 = req.query.Address2;
	var Gender = req.query.Gender;
    var Selected_Category = req.query.Selected_Category;
	var UserId = req.query.UserId;
	var BarcodeList = req.query.BarcodeList;
	var BarCode = req.query.BarCode;
    var data={
        "error":1,
        "clients":""
    };
    
connection.query("UPDATE Estimate_Transactions SET CustomerName='"+CustomerName+"',CustomerMobileno='"+CustomerMobileno+"',Emailid='"+Emailid+"',Address1='"+Address1+"',Address2='"+Address2+"',Gender='"+Gender+"',Selected_Category='"+Selected_Category+"',UserId='"+UserId+"',BarcodeList='"+BarcodeList+"',BarCode='"+BarCode+"' where Cust_Id = '"+Cust_Id+"'", function(err, rows){                

          if(!err) {
                  res.json("Successfully updated!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                        res.json("There was an error with MySQL.");
                }
        //connection.release();
    })
  
});

//delete method//

app.delete('/removeTransaction',function(req,res){
     var id = req.query.id;
     var data={
        "error":1,
        "clients":""
    };
  
     var query = connection.query('delete from Estimate_Transactions where Cust_Id = ?',[Cust_Id],function(err,result ,rows){   
      if(!err) {
                  res.json("Successful deleted!");
                }
                else {
                   data["error"]=1;
                   data["clients"]="no details found";
                   res.json(data);
                   res.json("There was an error with MySQL.");
                }
    })
  
  
});
app.get('/getTransaction',function(req,res){
    connection.query("SELECT * FROM Estimate_Transactions ",function(err, rows){

        res.json(rows);
        console.log(rows);
    });
});



app.listen(7000);
console.log('Server running at port 7000');
