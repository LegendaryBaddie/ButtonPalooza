
        let button = {
        fillColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        textColor: "#000000",
          text: "Click Me!",
      }
      let colorSlider = {
       red: 0,
       green: 0,
       blue: 0,
      };
       const setColor = () =>
     {
       //set color based on current checked selector
        let tempColor = `rgb(${colorSlider.red},${colorSlider.green},${colorSlider.blue})`;
                    
       switch($("input[type='radio'][name='target']:checked").val())
       {
           case 'fill':
                    $("#oneTrueButton").css("background-color", tempColor);
                    break;
           case 'border':
                    $("#oneTrueButton").css("border-color", tempColor);
                    break;
           case 'text':
                    $("#oneTrueButton").css("color", tempColor);
                    break;
       }
     }
     const init = () => {
       
      
         $("#red").change(() =>{
          colorSlider.red = $("#red").val();
          setColor();
         });
         $("#blue").change(() =>{
         colorSlider.blue = $("#blue").val();
         setColor();
          });
          $("#green").change(() =>{
           colorSlider.green = $("#green").val();
           setColor();
         });
     };

      window.onload = init;