function crtDict(id,lng){
    var prstLtr = "A";
    var srcUrl = "xmlFiles/"+lng+"/";
    var lngTo = ((lng=="Kirundi") ? "English" : "Kirundi");
//    var cap = lng + " to " + lngTo + " Dictionary";
    var dctAlph = ((lng=="Kirundi") ? "ABCDEFGHIJKMNOPRSTUVWYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    var xmlPrefix = ((lng=="Kirundi") ? "Kir" : "Eng");
    var hdDat = ["",lng,"past/pl",lngTo];
    var colClass = ["pre","frWrd","past","toWrd"];
    var tblCrtd = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];    
    var dctEle = document.getElementById(id);
                         
                
    // create Dictionary
        // create tabs
            crtTabStr();
        // load data for the letter "A"        
            nowGetXML("A");
            
            function crtTabStr(){
                // create ul w/class='nav' and li's and corresponding links(<a>'s) (<li> <a onclick="getXML(ltr)" href="lng+ltr+'cntr' ">ltr</a> </li>)
                var ulEle = document.createElement("ul");
                ulEle.setAttribute("class","nav");
                for (var i=0; i < dctAlph.length; i++) {
                    var ltr= dctAlph.charAt(i);
                    var liEle = document.createElement("li");
                    var aEle = document.createElement("a");
                    var aTxt= document.createTextNode(ltr);
                    aEle.appendChild(aTxt);
                    var hrefVal = lng+ltr+"cntr";
                    aEle.onclick= function(event){getXML(event);};
                    aEle.href=hrefVal;
                    liEle.appendChild(aEle);
                    ulEle.appendChild(liEle);
                };// end for (iterating through ltrs of alph)
                dctEle.appendChild(ulEle);
                        
                // create div containers w/id =lng + ltr + 'cntr' for each ltr of the alph
                for (var i=0; i < dctAlph.length; i++) {
                    var ltr= dctAlph.charAt(i);
                    var divEle = document.createElement("div");
                    var divId = lng+ltr+"cntr";
                    divEle.id= divId;
                    dctEle.appendChild(divEle);
                };// end for (iterating through ltrs of alph)
                
            }; // end fct crtTabStr()


            function getXML(evt){
                var ltr = evt.target.innerHTML;
                nowGetXML(ltr);
            }; // end fct getXML(evt)
            
            function nowGetXML(ltr){
                var divId = lng+ltr+"cntr";
                var sldDv = document.getElementById(divId);
                document.getElementById(lng+prstLtr+"cntr").style.display="none";
                sldDv.style.display = "block";
                prstLtr = ltr;
                    
                var indx = dctAlph.indexOf(ltr);
                if (tblCrtd[indx]) {return;};// if table has already been created return
                tblCrtd[indx] = true;       
                                
                //now creat a table 
                var tbl = document.createElement("table");
                var tblHd = document.createElement("thead");// create table head with 4 cols
                var tblBdy = document.createElement("tbody");// now create table body
                // create table head
                var hdRw = document.createElement("tr");
                for (var i=0; i < 4; i++) {
                    var hdClm = document.createElement("th");
                    hdClm.setAttribute("class",colClass[i]);
                    var txt = document.createTextNode(hdDat[i]);
                    hdClm.appendChild(txt);
                    hdRw.appendChild(hdClm);
                }; //end of for
                tblHd.appendChild(hdRw);
                
                var bdyRw = document.createElement("tr");
                
                $.ajax({
                    type : "GET",
                    url : "xmlFiles/"+lng+"/"+xmlPrefix + ltr + "Words.xml",
                    dataType : "xml",
                    success : function(xmlData){
//                      var numWrds = 0;// keep track of the number of words for this ltr
                        // for each word get the specific data 'p', 'b', 'c', 't'
                        $(xmlData).find('w').each(function(){
//                          numwrds = numWrds + 1;
                            var dat = new Array(); // data for 'p', 'b', and 'c' will be stored in the Array(): "dat"
                            var tDat = new Array(); // data for 't' will be stored in the Array(): tDat (Note: there may be multiple translations for any given word)
                            dat[0]= $(this).find('p').text();
                            dat[1] = $(this).find('b').text();
                            dat[2] = $(this).find('c').text();
                            var ti = 0;

                            $(this).find('t').each(function(){
                                tDat[ti]= $(this).text();
//                              alert("i = "+tDat[ti]);
                                ti = ti+1;
                            }); //end of find('t').each
//                          alert("tdat0 "+tDat[0]);
                            // now create a new table row
                            var nwRow = document.createElement("tr");
                            // create first 3 first cols, add above data, and then append to the new row
                            for (var i=0; i < 3; i++) {
                                var clm = document.createElement("td");
                                clm.setAttribute("class", colClass[i]);
                                var txt = document.createTextNode(dat[i]);
                                clm.appendChild(txt);
                                nwRow.appendChild(clm);
                            }; //end of for
                            var tclm = document.createElement("td");
                            tclm.setAttribute("class",colClass[3]);
                            
                            var ulEle = document.createElement("ul");
                            for (var i=0; i < tDat.length; i++) {
                              var liEle = document.createElement("li");
                              var txtNd = document.createTextNode(tDat[i]);
                              liEle.appendChild(txtNd);
                              ulEle.appendChild(liEle);
                            };
                            
                            tclm.appendChild(ulEle);
                            nwRow.appendChild(tclm);
                            // append new row to table body
                            tblBdy.appendChild(nwRow);
                            
                        });//end of $(xmlData)..each
                        
                        
                    },//end of success
                    
                    error : function(){
                        alert("Could not retrieve XML file.");
                    }
                }); // end of ajax
                
                tbl.appendChild(tblHd); // add table head to table
                tbl.appendChild(tblBdy); // append table body to table
                sldDv.appendChild(tbl);// append table to selected Div
                    
            };// end fct nowGetXML()
                
            $(function() {
                $("#"+id).tabs();
            }); 

        };// end of crtDict()   