// gen vars
var fstLsn = [1,21,41,61,82,101,111,126];// array containing 1st lesson # for each unit
// var pTLN the index represents the paragraph # and the value represents the lesson # that contains the paragraph #
// this var will be used in fct getLsn when the user clicks on a para. # in the Grammap Index section
var pTLN = [0,1,1,2,2,3,3,4,4,5,5,5,6,7,7,8,9,11,11,12,13,13,14,15,15,15,16,16,17,17,,18,18,18,19,19,19,21,22,22,23,23,23,24,24,25,25,26,26,26,26,27,27,27,27,28,28,28,29,29,29,31,32,32,32,33,33,33,34,35,35,35,36,36,36,37,37,37,37,38,38,39,39,39,41,41,41,41,41,42,42,42,"43","43",44,44,45,45,45,46,47,47,47,48,48,51,51,52,52,53,54,54,55,55,56,56,57,57,57,58,59,59,61,61,61,61,62,62,62,63,64,65,66,66,66,67,67,68,68,69,69,69,71,72,72,72,72,73,74,"74",75,75,75,76,76,76,78,78,78,79,80,80,80,82,83,83,83,84,84,85,85,85,86,86,86,86,86,87,87,88,88,88,88,89,91,91,91,91,92,92,93,93,94,94,95,95,95,96,97,97,98,98,98,99,99,102,102,102,103,103,103,104,104,104,105,105,"105",106,106,106,107,107,107,108,108,109,111,111,111,112,113,114,114,115,115,115,115,116,116,116,117,118,118,118,119,119,120,120,120,120,121,121,122,122,123,124];
//var pTlNu1 = [0,1,1,2,2,3,3,4,4,5,5,5,6,7,7,8,9,11,11,12,13,13,14,15,15,15,16,16,17,17,,18,18,18,19,19,19];
//var pTlNu2 = [21,22,22,23,23,23,24,24,25,25,26,26,26,26,27,27,27,27,28,28,28,29,29,29,31,32,32,32,33,33,33,34,35,35,35,36,36,36,37,37,37,37,38,38,39,39,39];
//var pTlNu3 = [41,41,41,41,41,42,42,42,"43","43",44,44,45,45,45,46,47,47,47,48,48,51,51,52,52,53,54,54,55,55,56,56,57,57,57,58,59,59];
//var pTlNu4 = [61,61,61,61,62,62,62,63,64,65,66,66,66,67,67,68,68,69,69,69,71,72,72,72,72,73,74,"74",75,75,75,76,76,76,78,78,78,79,80,80,80];
//var pTlNu5 = [82,83,83,83,84,84,85,85,85,86,86,86,86,86,87,87,88,88,88,88,89,91,91,91,91,92,92,93,93,94,94,95,95,95,96,97,97,98,98,98,99,99];
//var pTlNu6 = [102,102,102,103,103,103,104,104,104,105,105,"105",106,106,106,107,107,107,108,108,109];
//var pTlNu7 = [111,111,111,112,113,114,114,115,115,115,115,116,116,116,117,118,118,118,119,119,120,120,120,120,121,121,122,122,123,124];
var lsnLdd = new Array(); // array to indicate whether a lesson has been loaded (true) or not (false)
var anyLsnLdd = false; 
var prsScDspId = "intrCntId"; //Introduction is the first section displayed
var prsScBtnId = "intrBtnId"; //Keeps track of clicked btn so it can be highlighted when clicked
var prsUntDsp = "1";//  unit(1 thru 7) presently displayed
var untCrtd = [false,false,false,false,false,false,false];
var prsLsnDsp = [1,21,41,61,82,101,111];// "-1" idicates that no lesson is presently displayed for the respective unit
var mnBtnTx = ["Introduction","Lessons","Rules","Vocabulary","Index"];// names of the 5 main sections
var mnBtnId = ["intrBtnId","lsnBtnId","rlsBtnId","vcbBtnId","indxBtnId"]; // id's of button for these 5 sections
var scCntId = ['intrCntId','lsnCntId','rlsCntId','vcbCntId','indxCntId']; // id's of div that into which will be loaded the corresponding pages        
var scHtmlNm = ["intro","","rules","vocab","gramIndex"];        
// initial set up
function gramCnts(){
    // now create grammar section and append to cnt0 (ie content div of "Kirundi Grammar" window)
    // first create nav section
    var grNv = $("<nav></nav>");
    $(grNv).attr({"id":"mnNv"});
    // crt the 5 main nav buttons and append to grNv 
    for (var i=0; i < 5; i++) {
        var grNvInp = $("<label></label>").text(mnBtnTx[i]);
        $(grNvInp).attr({"id":mnBtnId[i], "onclick":"selILRVI(event)"});
//        $(grNvInp).css({"class":"mnNvLbl"});
//        var sp = $("<span></span>").text(" // ");
        $(grNv).append(grNvInp);
//        if (i!=4){
//            $(grNv).append(sp);
//        };
    };//end for i
    
    // append nav to window 0 container
    $("#cnt0").append(grNv);
    // add book cover img to
    $("#cnt0").css({"background-image":"url('imgs/BurGr.jpg')", "background-position":"right", "background-size":"contain"});
    
    // crt div containers for each of the 5 sections and append to cnt0
    for (var i=0; i < 5; i++) {
        var secCntr = $("<div></div>");
        $(secCntr).attr({"id":scCntId[i], "class":"scCnt"});
        $("#cnt0").append(secCntr);
    };// end for
            
     
    // now load the corresponding html files for each of the 4 sections(not the lessons htmls- they will be loaded later)
    for (var i=0; i < 5; i++) {
        if (i==1) {
                //do nothing for lessons that will be loaded later
            } else{
                var url = "html/" + scHtmlNm[i] + '.html';
                $('#' + scCntId[i]).load(url, function (responseText, statusText, xhr) {
                    if (statusText == "error"){
                        alert( "Not able to load file");
                    }; //end of if              
                });// end of  load
        };// end of if then else
                   
    }; // end of for (i)
    // this ends the creation nav and contents for the 5 main sections
    
    // now crt nav and contents specifically for the lesson section 
    // crt nav and append to lesson container(eg div with id=lessons)
    var nv = $("<nav></nav>"); // gen nav which contains both unit and lesson navs
    $(nv).attr({"id":"untLsnNv"});
     
    var untNv = $("<nav></nav>"); // nav for unit nav buttons
    $(untNv).attr({"id":"untNv"});
        //create nav buttons for each unit and append to unit nav(id=untNav)
        for (var i=1; i < 8; i++) {
            var untBtn = $("<label></label>").text(fstLsn[i-1]+'-'+(fstLsn[i]-1)); // unit button
            $(untBtn).attr({"id":'untBtn'+i+"Id", "class":"untBtn", "onclick":"getUnt(event)"});
//            var sp = $("<span></span>").text(" // ");
            $(untNv).append(untBtn);
//            if (i!==7){
//                $(untNv).append(sp);
//            }; //end of if
        }; // end of for (i) unit nav buttons crtd and appended
    $(nv).append(untNv);
    
    var lsnNv = $("<nav></nav>"); // nav for lesson nav buttons
    $(lsnNv).attr({"id":"lsnNv"});
        // create lesson nav buttons for each unit and append to lesson nav(id=lsnNav)
        var clsUnt = "lsnBtn unt1Btn";
        for (var i=0; i < 7; i++) { // i traverses 0 thru 6 (ie for each of the 7 units)
            for (var j=fstLsn[i]; j < fstLsn[i+1]; j++) { // j traverses from first lesson of each unit to the

                var lsnBtn = $("<label></label>").text(j); // lesson button
                $(lsnBtn).attr({"id":j, "class":clsUnt, "onclick":"getLsn(event)"});
                lsnLdd[j-1] = false; // false since each lesson is initially unloaded
                $(lsnNv).append(lsnBtn);
            }; // end of for (j)
            clsUnt = "lsnBtn unt"+(i+2)+"Btn";
        }; //end of for (i) lesson nav buttons crtd and appended
    $(nv).append(lsnNv);
    // append <nav> to lesson container
    $("#lsnCntId").append(nv);// remember that div with id=lessons was created above

    
    // pre load first lesson of each unit
//    for (var i=1; i >=0; i--) {
//        alert(i);
//          getLsnId(fstLsn[i]);
//    };// end for i
    
//    prsLsnDsp = "lsnCntr1";
//    prsLsnUnt1 = "lsn1";
//    $("#lsn111").css({"display":"none"});
//    $("#lsn1").css({"display":"block"}); // initially display lesson 1
 //   $("#untBtn1Id").css({"fontWeight":"bold","backgroundColor":"#aaa"}); // make the button for unit 1 "bold"       
}; // end of fct gramCnts
            

// this fct is called by each of the 5 main buttons (intro, lessons, rules etc.)

function selILRVI(evt){                   // selected Id(sldId) is id of main button clicked 
     var sldId = evt.target.id;      // (one of these of mnBtnId = ["intrBtnId","lsnBtnId","rlsBtnId","vcbBtnId","indxBtnId"]
    selILRVIfrmId(sldId);
};

function selILRVIfrmId(sldId){
    $("#cnt0").css({"background-size":"0%"});
    if (sldId=="lsnBtnId" && !anyLsnLdd) {
        $("#cnt0").css({"background-image":"url('imgs/BurGrIntro.jpg')", "background-position":"right", "background-size":"contain"});
    };
    $("#"+prsScBtnId).css({"fontWeight":"normal","backgroundColor":"#ddd"});
    $("#"+sldId).css({"fontWeight":"bold","backgroundColor":"#aaa"});
    prsScBtnId = sldId;
    // search thru this array to find index of sel 
    for (var i=0; i<5; i++){
        if (sldId==mnBtnId[i]) {
            break; //when there is a match break will terminate the for and i will be the index of sel
        };
    }; // end of for
    var dvId = scCntId[i]; // eg scCntId = ['intrCntId','lsnCntId','rlsCntId','vcbCntId','indxCntId']
    $("#"+prsScDspId).css("display","none");
    $("#"+dvId).css("display","block");
    prsScDspId = dvId;                      //is this wrong?????
};// end of chgILRVI fct


// this fct is called when one of the unit buttons(eg "1-20") is clicked        
function getUnt(evt){
    var untNmb = evt.target.id.charAt(6); // "evt.target.id"='untBtn'+i+"Id" i = 1 to 7 (eg untId will be 1 to 7)
        //untNmb = the # of the unit eg 1 to 7
//    alert("pUD= "+prsUntDsp+"  pLD= "+prsLsnDsp+"  untBtnId")
//    var pctUrl = "imgs/BurGrUnt"+untNmb+".jpg";
//    if (!untCrtd[untNmb-1]) {
//        $("#cnt0").css({"background-image":"url("+pctUrl+")", "background-position":"right", "background-size":"contain"});}
//        else{
    getUntFrmId(untNmb);
};
function getUntFrmId(untNmb){

    $("#cnt0").css({"background-size":"0%"});
    if (!untCrtd[untNmb-1]) { //if this unit has not been created previously then display the picture
        var pctUrl = "imgs/BurGrUnt"+untNmb+".jpg";
        $("#cnt0").css({"background-image":"url("+pctUrl+")", "background-position":"right", "background-size":"contain"});        
    };// end if (display picture option)

    var oldUntBtn = "#untBtn"+ prsUntDsp+"Id"; // eg prsUntDsp = "unt1Btn"  the unit # 1 is the charAt(3)
    $(oldUntBtn).css({"fontWeight":"normal","backgroundColor":"#ddd"}); // make old unit button normal
    var oldUntDsp = prsUntDsp;// save the # of the presently displayed unit
    $("#untCntr"+oldUntDsp).css({"display":"none"});// undisplay the old unit container
    //now create unit container if not already created
    if (!untCrtd[untNmb-1]) {
        var dv = $("<div></div>");
        $(dv).attr({"id":"untCntr"+untNmb, "class":"untCntr"});
        $("#lsnCntId").append(dv);
    };// end if (create unit container option)
    $("#untCntr"+untNmb).css({"display":"block"});  

//    $("#lsnCntr"+prsLsnDsp[untNmb-1]).css("display","none");// the present lesson displayed is removed
    $(".unt"+prsUntDsp+"Btn").css("display","none");// all lesson #'s for this class("unt"+unit#+"Btn") are removed
    prsUntDsp = untNmb; //the newly clicked unit becomes the present unit displayed
    $(".unt"+prsUntDsp+"Btn").css("display","block");// and it is now displayed
    var newUntBtn = "#untBtn"+ prsUntDsp+"Id";
    $(newUntBtn).css({"fontWeight":"bold","backgroundColor":"#aaa"}); // make new unit button bold
};// end of fct getUnt()
  
          
// this fct is called when a lesson button is clicked
function getLsn(evt){
    var lsnId = evt.target.id;// lsnId = a # between 1 and 125 inclusive
//    if (lsnId.charAt(0)=="i"){ // if true then user clicked in "Index" page
//        pargNm = lsnId.slice(4,lsnId.length); // pick off paragraph # from button id
//        lsnId = pTLN[pargNm];
//        alert("less # = "+lsnId);
//    };
    getLsnFrmId(lsnId);
};
function getLsnFrmId(lsnId){
    anyLsnLdd = true;
    untCrtd[prsUntDsp-1]= true;
    $("#cnt0").css({"background-size":"0%"});
    $("#untCntr"+prsUntDsp).css("background-size","0%"); // get rid of background img(eg make size 0)
    var lsnDivId = "lsnCntr" + lsnId;// the id of the container(div) that contains the corresponding lesson
     $("#"+prsLsnDsp[prsUntDsp-1]).css({"fontWeight":"normal","backgroundColor":"#ddd"});
     $("#"+lsnId).css({"fontWeight":"bold","backgroundColor":"#aaa"});
    $("#lsnCntr"+prsLsnDsp[prsUntDsp-1]).css("display","none");
    // check to see if lsn has been previously loaded (if yes display lsn and hide previous displayed lesson -
    //   otherwise create new div for lesson and load html file into it)
    if (lsnLdd[lsnId-1]) {
        $("#"+lsnDivId).css("display","block");
        } else{
            var lsnFile = "html/lsn"+lsnId+".html";
            //create div element for this lesson with id
            var lsnDiv = $("<div></div>");
            $(lsnDiv).attr({"id":lsnDivId});
            $(lsnDiv).load(lsnFile, function (responseText, statusText, xhr) {
                if (statusText == "error"){
                    alert( "Not able to load file");
                }; //end of if              
            });// end of  load
            $("#untCntr"+prsUntDsp).append(lsnDiv);
            lsnLdd[lsnId-1]=true;
    }; // end of if then else
    prsLsnDsp[prsUntDsp-1] = lsnId;
};// end of fct getLsn()

      
    
