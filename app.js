const path = require('path')
const express = require('express')
var formidable = require('formidable');
var nodemailer = require('nodemailer')

const app = express();

function resolve(filePath){
    return path.resolve(__dirname, filePath)
}

app.use(express.static(resolve('./public')))

app.post('/sendmail',(req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send("Parsing Error")
        }
        const to_mail=fields['to_mail'];
        const name_to=fields['name_to'];
        const pdfBase64=fields['pdfBase64']
        console.log(to_mail);
        console.log(name_to);
        console.log(pdfBase64.length);
        let transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
            user: process.env.USER,
            pass: process.env.PASS
            }
        }
        );

        let mailOptions = {
            from: 'bytpphyte@gmail.com',
            to: to_mail,
            cc: 'bytpphyte@gmail.com',
            subject: 'Your report',
            text: `Dear ${name_to}, This is your graph reports`,
            attachments: [{
                    filename: `myfile.pdf`,
                    content: pdfBase64,
                    encoding: 'base64',
                },
            ],
        }

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error Occurs" + err);
            }
            else {
                console.log("Email Sent!!!");
                res.redirect('/');
            }
        });
    });
});

if(process.env.NODE_ENV == 'production' || true){
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname+'/public/index.html')
    })
}

module.exports = app