var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors=require("cors")
const bodyParser=require("body-parser")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const speakeasy=require("speakeasy")
const nodemailer = require('nodemailer');
const twilio=require("twilio")
const bcrypt=require("bcryptjs")
const jwtToken=require('jsonwebtoken')

var app = express();
app.use(cors())
app.use(bodyParser.json())

//Database connection:
const sqlite3=require("sqlite3").verbose()
let db=new sqlite3.Database(path.resolve(__dirname,"blogsdata.db"))

// db.run(`create Table users (username varchar(250),password int,first_name varchar(250),last_name varchar(250))`,(err)=>{
//   console.log("table is created...")
// })
// db.run(`create Table blogs (post_id int,post_no int,post_title text,post_desc text,post_image blob)`,()=>{
//   console.log("table is created...")
// })
// db.run(`drop Table blogs`,()=>{
//   console.log("drop")
// })

// let sql=`insert into blogs (post_id,post_no,post_title,post_desc,post_image ) values (?,?,?,?,?)`
// db.run(sql,[8,8,"JavaScript","JavaScript is a scripting or programming language that allows you to implement complex features on web pages ","https://res.cloudinary.com/ddsddqkgs/image/upload/v1724425372/Js_pd6ngt.jpg"],()=>{
//   console.log("inserted...")
// })

//Routing:


//Register API:
app.post('/register',async (req,res)=>{
  const clientdata=req.body
  const {username,password,firstName,lastName}=clientdata
  // Generate a salt
  const salt=await bcrypt.genSalt(10);
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, salt);
  const sql_query_2=`select * from users where first_name=?` 
  db.get(sql_query_2,firstName,(err,user)=>{
    if (err) console.error(err.message)
      if (!user){
        const sql_query_1=`insert into users (username,password,first_name,last_name) values (?,?,?,?)`
        db.run(sql_query_1,[username,hashedPassword,firstName,lastName],(err)=>{
        if (err) return console.error(err.message)
        else{
          res.json({"success_message":"User is added suucessfully..."})  
        }  
      })
      }
      else{
          res.json({"database_msg":"User is already exist in database..."})
        }  
    })        
  })

//Login API:
app.post('/login',async (req,res)=>{
    const userData=req.body
    const { username,password}=userData
    const sql_query=`select * from users where username=?`
    db.get(sql_query,username,(err,dbUser)=>{
    if (err){
      console.error(err.message)
      }
      else{
        if (!dbUser){
          console.log('result Not found...')
          return res.status(400).json({ error: 'User not found' });
        }
         // Compare the entered password with the stored hashed password
         (typeof dbUser.password==='number'&&(dbUser.password=dbUser.password.toString()))
        const isMatch = bcrypt.compare(password, dbUser.password);
        if (isMatch) {
          const payload={
            username,
            password
          }
          const jwt_token= jwtToken.sign(payload,'jwt_token')
           res.status(200).json({ token:jwt_token });
      } else {
          res.status(400).json({ error: 'Invalid credentials' });
      }
      }
    })
}) 

//GET API:
app.get("/",(req,res)=>{
  const sql=`select * from blogs`
  db.all(sql,[],(err,data)=>(
    // console.log(data)
    res.json(data)
  ))
  
})

//GET/:id API:
app.get("/list/:id",async (req,res)=>{
    const {id}=req.params
    const sql_query=`select * from blogs where post_no=${id}`
    db.get(sql_query,[],(err,row)=>{
      res.json(row)
      
    })
})

//Post API:
app.post("/list/add",(req,res)=>{
  console.log("postCalled")
  const sql_query=`insert into blogs (post_id,post_no,post_title,post_desc,post_image) values(?,?,?,?,?)`
  const newPost=req.body
  const {postId,postNo,postTitle,postDesc,postImage}=newPost 
  db.run(sql_query,[postId,postNo,postTitle,postDesc,postImage],(err,row)=>{
    if (err){
      res.send(err.message)
    }
    else{
      // console.log(row)
      res.send("Post is added in the blog...")
    }
  })  
})

//DELETE API:
app.delete('/list/delete/:id',(req,res)=>{
  const {id}=req.params
  // console.log("delete",id)
  const sql_query=`delete from blogs where post_no=?`
  db.run(sql_query,id,(err,row)=>{
    if (err){
      // console.log(err)
      res.send(err.message)
    }
    else{
      res.send("Post is deleted from the Blog...")
    }
  })
})

//PUT API:
app.put("/list/edit/:id",(req,res)=>{
  console.log("edit")
  const data=req.body
  const {postId}=req.params  
  const {postNo,postTitle,postDesc,postImage}=data
  const sql_query=`update blogs set post_id=?,post_title=?,post_desc=?,post_image=? where post_no=?`
  const newValues=[postId,postTitle,postDesc,postImage,postNo]
  db.run(sql_query,newValues,(err)=>{
    if (err){
      res.send(err.message)
    }
    res.send("Post is edited in the Blog....")
  })
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
