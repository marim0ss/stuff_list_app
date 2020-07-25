//https://note.com/consul_addtag/n/nd581fe122540
//スプレッドシート名指定
var id = "1QsqUcto1WbkA-eJQUgHz7mowJfJR4GUHXQB4rsmrNPQ";
var sheet = SpreadsheetApp.openById(id).getSheetByName("data");

//セッション情報からユーザID(メールアドレス)を取得
var objUser = Session.getActiveUser();
var mail = objUser.getEmail();
//タイムスタンプ
var time = Utilities.formatDate( new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');

var selectNo;
function doPost(e){
    doGet(e);
    return HtmlService.createTemplateFromFile("index").evaluate(); 
}
/* doGetのif文
URLパラメータによってどの画面から来た通信なのかを判別し、それぞれの画面に従って制御を分けるためにこのようなことをしています
*/
function doGet(e){
  if (e.parameter.name == undefined) {
    return HtmlService.createTemplateFromFile("index").evaluate(); 
  }
  if (e.parameter.name == 'view') {
    return HtmlService.createTemplateFromFile("index").evaluate(); 
  }else if (e.parameter.name == 'inputStuff'){
    return HtmlService.createTemplateFromFile("inputStuff").evaluate(); 
  }else if (e.parameter.name == 'modify'){
    selectNo = e.parameter.no;
    return HtmlService.createTemplateFromFile("modify").evaluate(); 
  }else if (e.parameter.name == 'postData'){
    //値の取得・設定
    no = sheet.getLastRow()-1;
    name = e.parameter.sname;
    commit = e.parameter.commit;
    company = e.parameter.company;
    payroll = e.parameter.payroll;
    roll = e.parameter.roll;
    post = e.parameter.post;
    profile = e.parameter.profile;
    tag = e.parameter.tag;
    avalable = e.parameter.avalable;
    address = e.parameter.address;
    facebook = e.parameter.facebook;
    ndadate = e.parameter.ndadate;
    status = e.parameter.status;
    tel = e.parameter.tel;
    remarks = e.parameter.remarks;
    adduser = mail;
    timestamp = time;
    
    //Getした値を配列にする
    var array = [ no,name,commit,company,payroll,roll,post,profile,tag,avalable,address,facebook,ndadate,status,tel,remarks,adduser,timestamp];

    //シートに配列を書き込み
    sheet.appendRow(array);
    return HtmlService.createTemplateFromFile("index").evaluate(); 

    //修正画面より
  }else if (e.parameter.name == 'modifyData'){
    //値の取得・設定
    stuffNo = e.parameter.stuffNo;
    name = e.parameter.sname;
    commit = e.parameter.commit;
    company = e.parameter.company;
    payroll = e.parameter.payroll;
    roll = e.parameter.roll;
    post = e.parameter.post;
    profile = e.parameter.profile;
    tag = e.parameter.tag;
    avalable = e.parameter.avalable;
    address = e.parameter.address;
    facebook = e.parameter.facebook;
    ndadate = e.parameter.ndadate;
    //d = new Date(e.parameter.ndadate);
    //ndadate = Utilities.formatDate(d, 'Asia/Tokyo', 'yyyy年M月d日');
    status = e.parameter.status;
    tel = e.parameter.tel;
    remarks = e.parameter.remarks;
    adduser = mail;
    timestamp = time;
    
    //Getした値を配列にして該当行を全て書き換える
    var array = [[stuffNo,name,commit,company,payroll,roll,post,profile,tag,avalable,address,facebook,ndadate,status,tel,remarks,adduser,timestamp]];
    //シートに配列を書き込み
    var i = parseInt(stuffNo) + 1;
    sheet.getRange(i, 1 , 1 , array[0].length).setValues(array);
    return HtmlService.createTemplateFromFile("index").evaluate(); 
  }
}

function getNo(){
  return selectNo;
}

//表示用日付を返す関数
function getViewDate (date) {
  if(date==""){
    return "";
  }else{
    d = new Date(date);
    return Utilities.formatDate( d, 'Asia/Tokyo', 'yyyy/M/d');
  }
};