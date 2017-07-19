// general variables
var lngPgCrtd = false; // once lang windows are created, becomes "true" to prevent additional 
                                        // lang windows being created in the future
var gramCrtd = false;
var kirDctCrtd = false;
var engDctCrtd = false;
var testCrtd = false;
var mainCntsCrtd = false;        
// gen data for all 4 windows(grammar,kirEngDict,engKirDict,test)
var dvCntrId = ["grammrDv","kirDctDv","engDctDv","tstngDv"];
var nm = ["Kirundi Grammar","Kirundi to English Dictionary","English to Kirundi Dictionary","Testing"];
var zIndx = [13,12,11,10]; //initial z-Indexes for the above named windows
var prsFocs = 0; // the window that has present focus. Default "Kirundi Grammar" with z-Index of 130
var wndX = new Array(); // These four variables will be undated when a window is moved,maximized or resized.
var wndY = new Array();       //  When the wnd restore button is clicked they will be used to place the window back 
var wndWdth = new Array();    // in its last position after being maximiszed
var wndHgth = new Array();

// when user selects "Learn Kirundi"            
function dsp(evt){
    $("#lrnKirPg").css({"display":"block"});
    $("#hmPg").css({"display":"none"});
    $(".mnImg").css({"display":"block"});
    // if it is the first time(ie lngPgCrtd=false) then windows must be created
    if (!lngPgCrtd) {
        crtWnds();
        lngPgCrtd = true; // set to true so that windows will not be recreated if user leaves then re-enters "learn Kirundi"
    };
}; // end fct dsp()


// fct crtWnds() will create 4 new windows
function crtWnds(){
    var lrn = document.getElementById(lrnKirPg);
    for (var i=0; i < 4; i++) {
        // create new div element for each window
        var wnd = $("<div></div>");
        var wndId = "wnd" + i;//wndId=0 for Grammar, wndId=1 for KirDct, wndId=2 for EngDct, wndId=3 for Testing
        $(wnd).attr({"id":wndId, "class":"wnd", "onmousedown":"setZindx(event)"});
        $(wnd).css({"position":"absolute","class":"wnd"});
        // create the header container
        var wndHdr = $("<div></div>");
        $(wndHdr).attr({"class":"hdr"});
        // create label and append to header
        var wndLbl = $("<label></label>").text(nm[i]);
        $(wndHdr).append(wndLbl);
        //create container for min button
        var wndSzCntr = $("<div></div>");
        $(wndSzCntr).attr({"id":"cntr"+i, "class":"cntr"});
        // create min button and append to window size container (wndSzCntr)
        var wndMn = $("<div></div>");
        $(wndMn).attr({"id":"cntrMn"+i, "class":"cntrEle cntrMn", "onclick":"minWnd(event)"});
        $(wndSzCntr).append(wndMn);
        // create restore button and append to (wndSzCntr)
        var wndRst = $("<div></div>");
        var wndRstPls = $("<div></div>"); // these 2 divs will be combined to form restore button
        $(wndRst).attr({"id":"wnd"+i+"Rst", "class":"cntrEle cntrRst", "onclick":"rstWnd(event)"});
        $(wndRstPls).attr({"id":"wnd"+ i +"RstPls", "class":"cntrEle cntrRstPls", "onclick":"rstWnd(event)"});
        $(wndSzCntr).append(wndRst);
        $(wndSzCntr).append(wndRstPls);
        // create max button and append to (wndSzCntr)
        var wndMx = $("<div></div>"); 
        $(wndMx).attr({"id":"wndMx"+i, "class":"cntrEle cntrMx", "onclick":"mxWnd(event)"});
        $(wndSzCntr).append(wndMx);
        // append window size container to header then append header to window
        $(wndHdr).append(wndSzCntr);
        $(wnd).append(wndHdr);
        // crt contents pg then append to wnd
        var cnt = $("<div></div>");
        $(cnt).attr({"id":"cnt"+i});
        $(wnd).append(cnt);
        // now append window to the learning Kirundi page
        $("#lrnPgNv").append(wnd);
        // make this window draggable and resizable
        $("#"+wndId).draggable({"handle":wndLbl, "containment":"window"}) 
                    .resizable({"handles":"s,e,w,se,sw", "containment":lrn});
    };// end of for
    var nv = document.getElementById("lrnPgNv");
    $("#lrnKirPg").remove(nv);
    $("#lrnKirPg").append(nv);
//    $("#lrnPgNv").css({"z-index":"150"});
}; // end of fct crtWnds


// this fct is called whenever a window is clicked and will make the clicked window have focus by swapping z-Indici with
// the window that presently has focus(ie prsFcs)            
function setZindx(evt){
    // first get the id and number of the window which was clicked
    var cntId = evt.currentTarget.id;
    var cntNmb = cntId.charAt(3); // number of the window clicked
    // temp store the z-Index of that window
    var oldZindx = zIndx[prsFocs]; // temp store the z-Index of that window
    var oldPrsFocs = prsFocs; // temp store the window number, which presently has focus(ie prsFocs) 
    if(!cntId){// I want to make sure it's a window that was clicked. If it wasn't(ie cntId=false) just return.
        return;
    } else { // the newly clicked window is "wnd0" (e.g. "Kirundi Grammar")
        prsFocs = cntNmb; // the new window number(cntNmb) now has present focus(prsFocs)
        zIndx[oldPrsFocs]= zIndx[cntNmb];// the z-index for  newwindow 0 is now placed in the z-index
                                              // for the old window(e.g. "oldPrsFocs")
        $("#wnd"+oldPrsFocs).css({"z-index":zIndx[cntNmb]});// now make the actual chg to the old window (ie using css)
        zIndx[cntNmb] = oldZindx; // the z-index for the old window must now be placed in zIndx[new window]
        $("#wnd"+cntNmb).css({"z-index":zIndx[cntNmb]}); // make that chg to wnd0 using css
    }; // end of if-then-else
}; // end of fct setZindx()

            
// when the max button is clicked this fct will store the present position of the window and then maximize it
function mxWnd(evt){
    var cntrMxId = evt.target.id;
    var wndNumb = cntrMxId.charAt(cntrMxId.length-1);
    wndWdth[wndNumb] = Math.round($("#wnd"+wndNumb).width());
    wndHgth[wndNumb] = Math.round($("#wnd"+wndNumb).height());
    wndX[wndNumb] = Math.round($("#wnd"+wndNumb).position().left);
    wndY[wndNumb] = Math.round($("#wnd"+wndNumb).position().top);
    $(".cntrRst").css({"display":"block"});
    $(".cntrRstPls").css({"display":"block"});
    $(".cntrMx").css({"display":"none"});
    $("#wnd"+wndNumb).css({"top":"0px","left":"0px", "width":"100%", "height":"100%"});
};

            
// when the restore button is clicked this fct will reset the window to it's previous position and size.
// (eg. top, left and width, height)
function rstWnd(evt){
    var cntrRstId = evt.target.id;
    var wndNumb = cntrRstId.charAt(3);
    $("#wnd"+wndNumb).css({"left":wndX[wndNumb]+"px"});
    $("#wnd"+wndNumb).css({"top":wndY[wndNumb]+"px"});
    $("#wnd"+wndNumb).css({"width":wndWdth[wndNumb]+"px"});
    $("#wnd"+wndNumb).css({"height":wndHgth[wndNumb]+"px"});
    $(".cntrRst").css({"display":"none"});
    $(".cntrRstPls").css({"display":"none"});
    $(".cntrMx").css({"display":"block"});
};

            
// when the min button is clicked on a window this fct will undisplay the window and display its icon
function minWnd(evt){
    var cntrMnId = evt.target.id;
    var wndNumb = cntrMnId.charAt(cntrMnId.length-1);
    $("#wnd"+wndNumb).css({"display":"none"});
    $("#wnd" + wndNumb + "Icn").css({"display":"block"});
};// end of fct minWnd()

            
// when a window icon is clicked this fct will undisplay the icon and display the window
function dspWnd(evt){
    var wndId = evt.target.id;
    var wndNumb = wndId.charAt(3);
    $("#wnd"+wndNumb).css({"display":"block"});
    $("#wnd" + wndNumb + "Icn").css({"display":"none"});
    if (wndNumb==0 && !gramCrtd) {
        gramCnts();
        gramCrtd = true;
    }; // end of if
    if (wndNumb==1 && !kirDctCrtd) {
        crtDict("cnt1","Kirundi");
        kirDctCrtd = true;
    }; // end of if
    if (wndNumb==2 && !engDctCrtd) {
        crtDict("cnt2","English");
        engDctCrtd = true;
    }; // end of if
    setZindx(evt);
};// end of fct dspWnd()


// when user clicks home button while in "Learn Kirundi" page            
function rtnHm(evt){
    $(".mnImg").css({"display":"none"});
    $("#hmPg").css({"display":"block"});
    $("#lrnKirPg").css({"display":""});
}; // end fct rtnHm()

 
 