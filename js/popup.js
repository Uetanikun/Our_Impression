var array = new Array();　//異なる関数で使用するためグローバル宣言
var ItemArray = new Array();
var getUrl = "";
window.onload=function(){
  chrome.tabs.getSelected(window.id, function (tab) {
    //sendUrl("http://kakaku.com/camera/digital-camera/itemlist.aspx");//ローカルver
    var getUrl = tab.url;
    document.getElementById("p_bar").innerHTML="解析可能な対象物を検索中です。(20%)";
    var Url = getUrl.replace(/&/g,">");
    console.log(Url);
    sendUrl(Url);　//実用ver
    showObj = document.body;
    defultData= showObj.innerHTML;
    if ( getUrl.match(/kakaku/)) document.getElementById("sort").innerHTML="メーカー順";
    if ( getUrl.match(/tripadvisor/)) document.getElementById("sort").innerHTML="五十音順";
    if ( getUrl.match(/tabelog/)) document.getElementById("sort").innerHTML="五十音順";
    if ( getUrl.match(/weddingpark/)) document.getElementById("sort").innerHTML="会場タイプ別";
    if ( getUrl.match(/rakuten/)) document.getElementById("sort").innerHTML="五十音順"; //時間あれば価格順で
    if ( getUrl.match(/amazon/)) document.getElementById("sort").innerHTML="五十音順";
});
    document.getElementById("sort").onclick = MakerSort;
    document.getElementById("basic").onclick = BasicSort;
}

function returnDataSHow(){
  if(xmlhttp.readyState == 1){
    document.getElementById("p_bar").innerHTML="解析可能な対象物の一覧を取得中です。(40%)";
    timer = setInterval( function(){
                         value = 10;
                         if(value == 10){

                           clearInterval(timer);
                           timer = null;
                          }
                        },3000);
  }
  if(xmlhttp.readyState == 4){ //4=DONE,一連の動作が完了していることを示している。
    array = xmlhttp.responseText.split(",");
    ItemArray = array.concat();
    document.getElementById("p_bar").innerHTML="取得したデータを元にリストを作成中です。(80%)";
    timer = setInterval( function(){
                         value = 10;
                         if(value == 10){
                           Output();
                           clearInterval(timer);
                           timer = null;
                          }
                        },1000);
  }
}

function sendUrl(id){ //サーバとXMLHttpRequestによるPOST通信を行う。tab.url;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = returnDataSHow;
  xmlhttp.open("POST","http://aitech.ac.jp/hishida/ana01/Act_Chrome/XMLhttp.php");
  xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xmlhttp.send("id=" + id);
}

function Output(){
  document.getElementById("p_bar").innerHTML="解析可能な対象物の一覧を表示します。(100%)";
  console.log(getUrl);
  var count = ItemArray.length;
  var counter = 0;
  var resArray = new Array();
  //使用するTabを選定
  var SeilCount = Math.ceil(count/10);
  for(var i = 1;i <= SeilCount;i++){
    $(".tab"+i).removeClass('disnon');
  }
  var ItemElem = 0;
  ItemElem = ItemArray.length;
  //各Tabにリストを挿入していく
  for(var i = 1;i <= SeilCount;i++){
  showObject = document.getElementById("page"+i);
  var item = new Array();
  var url = new Array();
  var Result = new Array();
  for(var j = 0;j < 10;j++){
    resArray = ItemArray[counter].split("^");
    item[counter] = resArray[0]; //商品名
    url[counter] = resArray[1]; //解析URL
    Result[counter] = "<li class=\"list9-count\"><a href=\"http://aitech.ac.jp/hishida/ana01/Act_Chrome/MLanalyze.php?url="+url[counter]+"\" target=\"_blank\" style=\"font-size:15px;\">"+item[counter]+"</a></li>";
    console.log(item[counter]);
    if(count-1 == counter){//配列の一番最後まできたとき。
      j = 100;//ループ強制終了
    }
    counter++;
  }
  var ResultStr = Result.join(" ");
  showObject.innerHTML = ResultStr;
}
}

function MakerSort(){
  ItemArray = array.concat();
  /*
  //価格（安い順）でソートする場合に必要使用する場合に、ifelse文で条件分岐させて楽天のURLのときだけ適用するようにする
  var a=[1,5,3,2,4,5];//値段
  var b=[0,1,2,3,4,5];//対象物の添字番号
  function bcmp(v1, v2) {
  return a[v1] - a[v2];
  }
  b.sort(bcmp);
  console.log(b);
  //
  */
  ItemArray.sort();//ソート
  Output();
}

function BasicSort(){
  ItemArray = array.concat();
  Output();
}
