/*global $, console, alert*/
$(document).ready(function () {
    

    "use strict";
    var contents,
        url,
        nm,
        em,
        sb,
        ms,
        dt,
        errors,
        i,
        Pages;
 
    
    
    
    
    Pages = {};
    
    
    contents = {};
    dt = {};
    
    $(".container").load("./partials/home.html", function (response) {
        Pages["./partials/home.html"] = response;
    });
    
    
    
    
     function handleResponce(rsp) {
        
        
        $(".feedback").html(rsp)
                       .hide()
                       .fadeIn(500);
            $('#myform')[0].reset();
         
    }
    function handleErrors(jqXHR, textStatus, errorThrown) {
        console.log("textStatus: " + textStatus + "\n" +
                    "errorThrown: " + errorThrown);
    }
   
     function validateForm(ev)  {
          errors = [];
          
        
         ev.preventDefault();
         
        nm = $("#name").val();
        em = $("#email").val();
        sb = $("#subject").val();
        ms = $("#comments").val();
         
         if (nm !== "") {
            
         
            dt.Name = nm;
            
        } else {
            
            errors.push("Name?");
        }
        
         if (em !== "") {
                  
             var pattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z0-9]/; 
           
             if (pattern.test(em)) {
                
                 dt.Email = em;
                
            } else {
               
                errors.push("Invalid Email!");
            }
            
        } else {
            
             
            errors.push("Email?");
        }
        
         if (sb !== "") {
           
            dt.Subject = sb;
            
        } else {
            
            
            errors.push("Subject?");
        }
        
          if (ms !== "") {
            
        
            dt.Message = ms;
            
        } else {
            

            errors.push("Comments?");
        }
        
          if (errors.length === 0) {
           
           
            $.ajax({
                type: "post",
                url: "./partials/web-service.php",
                data: dt,
                dataType: "text"
            }).done(handleResponce).fail(handleErrors);
              
            
                
        } else {
          var fb = document.querySelector(".feedback");
              fb.innerHTML = "";
            for(i=0;i<errors.length;i++)
                {
                    fb.innerHTML += "<br/><br/>"+errors[i];
                    
                }
           
           
        }
         

    }
    
    
    function loadContents(urlParam) {
        
       
        if (Pages[urlParam]) {
            
      
            $(".container").html(Pages[urlParam]);
            
            console.log("Loaded from array!");
            
        } else {
         
            $(".container").load(urlParam, function (response) {
                
                Pages[urlParam] = response;
                
                console.log("Loaded by ajax request!");
            });
        }   
    }
   
    

    $("header ul li a").on("click", function (ev) {
        
        ev.preventDefault();
        
        url = $(this).attr("href");
        
      
        
        loadContents(url);
           
   
        $(document).on('submit', 'form', validateForm);
   
   
             
        
    });
    
    
}); 
   
      

$(document).ready(function(){

      $('header ul li a').click(function(){
        $('header ul li a').removeClass("active");
        $(this).addClass("active");
          });
        });



