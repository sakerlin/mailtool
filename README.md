Email template
-----------

**開發說明**
* 因為email html content 諸多限制, 為了完整呈現在寄email 時需把 internal Style Sheet 轉為 inline style
* 這邊用juice 這個package 來做這件事
* 為了測試方便用 nodemailer 來做寄送mail 的工具

**inline-css.js**
* 把 juice 與 nodemailer 集合起來的command line tool

* Usage:
  ```
  npm link
  inline-css.js yourEmailHtml.html
  ```
* 會在 yourEmailHtml.html path 下 生成 yourEmailHtml_cssInLine.html , yourEmailHtml_cssInLine.html  即為 inline style
的 yourEmailHtml.html
* Send mail:
```
  inline-css.js yourEmailHtml.html --sendmail
```
* 會把 html 轉為 inline style 後寄送 mail 到設定好的信箱
* 請在 mailList 設定寄送的 mail address
* 使用 gmail 寄送的話需啟用 IMAP,password 請用 google app password
