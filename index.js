const express = require('express');
const path = require('path')
const port = 8000;

const db = require('./confiq/mongoose');
const contact = require('./models/contact');
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());   //middleware
app.use(express.static('assets'));
// app.use(function(req,res,next){
    
//     console.log('first');                   //own middleware
//     next();                           
// })

var contactList =[
    {
        name : "Deepak",
        phone:"90798"
    },
    {
        name:"Rahat",
        phone:"90999"
    }
]

app.get('/',function(req,res){
    // res.send('Cool!');
    // console.log(req);
    contact.find({},function(err,contacts){
        if(err)
        {
            console.log('error in finding contacts');
            return;
        }
        return res.render('home',{title:"Contact List",contact_list:contacts});
    });
    
});

app.get('/practice',function(req,res){
    // res.send('Cool!');
    // console.log(req);
    return res.render('practice',{title:"Practice"});
})

app.post('/create-contact',function(req,res){
    
    contact.create({
        name:req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err)
        {
            console.log('error creating contact');
            return;
        }
        else
        {
            console.log(newContact);
            return res.redirect('back');
        }
    })
    // contactList.push({
    //     name:req.body.name,
    //     phone: req.body.phone
    // })
    // return res.redirect('back');
})
app.get('/delete/',function(req,res){
    
    console.log(req.query);
    let id = req.query.id;
    contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log('error deleting');
            return;
        }
        return res.redirect('back');
    });
    // if(index!=-1)
    // {
    //     contactList.splice(index,1);
    // }
    
})



app.listen(port,function(err){
    if(err)
    {
        console.log(err);
        return;
    }
    console.log('server is running');
});