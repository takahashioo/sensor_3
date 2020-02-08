function removeConfig(){
	localStorage.clear();
}


function startstop(){
if (document.getElementById("startstop").innerHTML=="開始"){

sensor_on(); 
document.getElementById("startstop").innerHTML="停止";

} else {

sensor_off(); 
document.getElementById("startstop").innerHTML="開始";

	}
}


	function sensor_off(){
		window.removeEventListener("devicemotion", sensor, false);
		}
		
    	
	function sensor_on(){
		localStorage.clear(); 
	        window.addEventListener("devicemotion", sensor,false);
      		};

        function sensor(e){
　　　　　
	  
	  var date = new Date() ;
	  var time_unix = date.getTime() ;
	  printValue("unixtime", time_unix);
			
	  
	  var acc = e.acceleration;
	  var x = Numlimit5(acc.x);
	  var y = Numlimit5(acc.y);
	  var z = Numlimit5(acc.z);

	  
	  var acc_g = e.accelerationIncludingGravity;
	  var gx = Numlimit5(acc_g.x);
	  var gy = Numlimit5(acc_g.y);
	  var gz = Numlimit5(acc_g.z);

	  
	  var rota_r = e.rotationRate;
	  var ra = Numlimit5(rota_r.alpha);
	  var rb = Numlimit5(rota_r.beta); 
	  var rg = Numlimit5(rota_r.gamma);

          
		
	  
	 

	  printValue('acc-gx', gx); //gx
	  printValue('acc-gy', gy); //gy
	  printValue('acc-gz', gz); //gz 

	  printValue('rr-a', ra); //ra
	  printValue('rr-b', rb); //rb
	  printValue('rr-g', rg); //rg 

	  
	  var datalist = {acc_x:x,acc_y:y,acc_z:z,acc_gx:gx,acc_gy:gy,acc_gz:gz,rr_a:ra,rr_b:rb,rr_g:rg}

	  
	  localStorage.setItem(time_unix, JSON.stringify(datalist));

	  function printValue(id, value){
	  var id_obj = document.getElementById(id);
	  id_obj.innerHTML = value;
		}
	  function Numlimit5(obj){
	  return Number(obj).toFixed(5);
	  	}
	}


function list(){
  alert("> キーの一覧を列挙する");
  for(var i = 0; i < localStorage.length ; i++) {

	var localstragekey = localStorage.key(i)
	
	var d_acc_gx="";
	var d_rr_a="";

	if(localStorage.getItem(localstragekey)){

		var d = JSON.parse(localStorage.getItem(localstragekey));
		
		d_acc_gx = d.acc_gx;
		d_rr_a = d.rr_a;
	}
	display_row = localstragekey +","+ d_acc_x+","+ d_acc_gx+","+d_rr_a;

    alert(display_row);   
  }

}



function exportcsv(){

  var finalVal = '';

  for(var i = 0; i < localStorage.length ; i++) {

	var localstragekey = localStorage.key(i)
	
	
	var d_acc_gx="";
	var d_acc_gy="";
	var d_acc_gz="";
	
	var d_rr_a="";
	var d_rr_b="";
	var d_rr_g="";

	if(localStorage.getItem(localstragekey)){

	var d = JSON.parse(localStorage.getItem(localstragekey));

		
		
		d_acc_gx = d.acc_gx;
		d_acc_gy = d.acc_gy;
		d_acc_gz = d.acc_gz;
		
		d_rr_a = d.rr_a;
		d_rr_b = d.rr_b;
		d_rr_g = d.rr_g;	
		
		
	}

	
	finalVal += localstragekey +","+ d_acc_gx +","+ d_acc_gy +","+ d_acc_gz +","+ d_rr_a +","+ d_rr_b +","+ d_rr_g +'\n';
  }




var date = new Date();
var year = date.getFullYear();
var month = ("0"+(date.getMonth() + 1)).slice(-2);
var day = ("0"+date.getDate()).slice(-2); 


  var download = document.getElementById('download');
  download.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(finalVal));

  download.setAttribute('download','sensor'+ year + month + day +'.csv');


}
