#!/usr/bin/env node
const juice = require('juice');
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const moment = require('moment')

//宣告發信物件
// gmail 需啟用 IMAP
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: ''  // google app password
    }
})

const uedAndPm = []
const mailList = []
const sourceFile = process.argv[2]
const sendMail = (process.argv.indexOf('--sendMail') !== -1)

if (fs.existsSync(sourceFile)) {

  var isForSender = sourceFile.indexOf('voucherEmailForSender') !== -1
  const fileName = path.basename(sourceFile).split('.')
  const dirName = path.dirname(sourceFile)
  const source = fs.readFileSync(sourceFile, 'utf8')
  const result = juice(source, {preserveMediaQueries: true})
  if (sendMail) {
    let i = 0
    mailList.map((targetMail) => {
      i++
      setTimeout(() => {
        const options = {
            from: '', //寄件者
            to: targetMail, //收件者
            cc: '', //副本
            bcc: '', //密件副本
            subject: `TEST - eVoucherEmail for ${isForSender ? '寄件者' : '收件者' } ${moment().format('MM/DD HH:ss')} 請幫忙驗證`, // Subject line
            text: 'eVoucherEmail', // plaintext body
            html: result,
            attachments: []
        }

        //發送信件
        transporter.sendMail(options, function(error, info) {
            if(error){
                console.log(error);
            } else {
                console.log(`${moment().format('HH:ss')} 郵件發送 >>>>>>> ${targetMail}`);
                console.log(`${moment().format('HH:ss')} 郵件標題 >>>>>>> `+ options.subject);
                console.log(`${moment().format('HH:ss')} 發送結果 >>>>>>> ${info.response}`);
                console.log('');
            }
        })
      }, 1000 + i*1000 )
     })
  }
  //fs.writeFileSync(`${dirName}/${fileName[0]}_cssInLine.html`, result, 'utf8');
  fs.writeFile(`${dirName}/${fileName[0]}_cssInLine.html`, result, 'utf-8', (err) => {
      if (err) {
        console.log("failed to save");
      } else {
        console.log(`Conver result is saving to ${dirName}/${fileName[0]}_cssInLine.html`);
      }
  })
} else {
  console.log('Source File not found')
  console.log('USAGE: inline-css [fileName]')
}
