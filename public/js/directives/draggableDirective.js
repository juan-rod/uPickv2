app.directive("draggable", function($document) {
    return {
        restrict: 'EA',
        scope: {},
       
        link: function(scope,element,attrs){
        	var start = 0, mouseX = 0, x = 0;
        	var mouseUpX;
        	var onplayhead = false;
            var container = document.getElementById("#sidePanel");
        	
            //  setTimeout(function(){
            //     element.addClass('show');
            // });

            //bind
        	element.on("mousedown", function(e){
        		e.preventDefault();
        		onplayhead = true;
                mouseUpX = e.screenX;
        		if (mouseUpX === null){
                    start = e.screenX - x;
                 
        		} else if (mouseUpX >= 0){
                    start = e.screenX - mouseX;
               
        		}
        		$document.on('mousemove', mousemove);
        		$document.on('mouseup', mouseup);
        		//return false;
        	});

            //drag event
        	function mousemove(e){
        		mouseX = e.screenX - start;
        		element.css({
         			left:  mouseX + 'px'
        		});
              if(mouseX >= 50){
                element.addClass("colorChange");
              }
              if(mouseX >= 210){
                
            // setTimeout(function(){
            //     scope.$apply(function(){
            //         scope.$eval(attrs.remove);
            //     });
            // }, 200);

              }
        	}
       


        		function getDelete(){
                    element = elem.find(".placeList")
                    element.remove();
                }
        
                //unbind
        	function mouseup(e){
        		mouseUpX = e.screenX;
        		if (onplayhead === true){
        			$document.off('mousemove', mousemove);
        			$document.off('mouseup', mouseup);

        		}else {
        			$document.on('mousemove',mousemove);
        		}
        		onplayhead = false;
        		console.log('mouseUpX', mouseUpX);
        		
        	}
        		

        }
        
       
    };
});