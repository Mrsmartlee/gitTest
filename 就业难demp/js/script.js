window.onload=function(){
	var music =document.getElementById("music");
	var bg_audio=document.getElementById("bg_audio");
	var time_audio=document.getElementById("time_audio");
	var airplane_audio=document.getElementById("airplane_audio");
	var img_airplane=document.getElementById("img_airplane");
	var people=document.getElementById("people");
	var people_img=document.getElementById("people_play");
	var dia_playone=document.getElementById("p1_dialogue1");
	var page1=document.getElementById("page1");
	var btn=document.getElementById("page2_btn");
	var page3=document.getElementById("page3");
	page1.addEventListener('onload',function(){
		time_audio.play();
	});
	setTimeout(function(){
		page1.style.display='none';
		page2.style.display='block';
		page3.style.display='none';
	},6000);
	btn.addEventListener('touchstart',function(){
		airplane_audio.play();
		btn.style.display='none';
		img_airplane.setAttribute('class','airplay');
		setTimeout(function(){
			airplane_audio.pause();
			page1.style.display='none';
			page2.style.display='none';
			page3.style.display='block';	
		},5000);
	},false);
	page3.addEventListener('touchstart', function(){
    	people.setAttribute('class','add');
    	people_img.setAttribute('class','play');
    	dia_playone.setAttribute('class','p1_dialogue1');
	},false);
	music.addEventListener("touchstart", function(){
	    if(bg_audio.paused){
	    	 bg_audio.play();
	    	 this.setAttribute('class','music_disc');
	    	}else{
	    		bg_audio.pause();
	    	 	this.setAttribute('class','');
	    	}
	   
	},false);
};
