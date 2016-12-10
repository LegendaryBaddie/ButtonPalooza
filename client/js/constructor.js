$(document).ready(() => {



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
    const setColor = () => {
        //set color based on current checked selector
        let tempColor = `rgb(${colorSlider.red},${colorSlider.green},${colorSlider.blue})`;

        switch ($("input[type='radio'][name='target']:checked").val()) {
            case 'fill':
                $("#sampleButton").css("background-color", tempColor);
                $("#fillColor").val(tempColor);
                break;
            case 'border':
                $("#sampleButton").css("border-color", tempColor);
                $("#borderColor").val(tempColor);
                break;
            case 'text':
                $("#sampleButton").css("color", tempColor);
                $("#textColor").val(tempColor);
                break;
        }
    }
    const handleError = (message) => {
        $("#errorMessage").text(message);
    };

    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
                window.location = result.redirect;
            },
            error: (xhr, status, error) => {
                const messageObj = JSON.parse(xhr.responseText);

                handleError(messageObj.error);
            }
        });
    };

    $("#buttonSubmit").on("click", (e) => {
        e.preventDefault();

        if ($("#name").val() == '' || $("#buttonText").val() == '') {
            handleError("All fields are required");
            return false;
        }
        if($('#name').val().indexOf(' ')>=0)
        {
            handleError("Name must contain no spaces");
            return false;
        }
        sendAjax($("#buttonForm").attr("action"), $('#buttonForm').serialize());

        return false;
    });
    $("#madeButton").on("click", (e) => {
        sendAjax($("#buttonPress").attr("action"), $('#buttonPress').serialize());
    });

    $("#bText").change(() => {
        $("#sampleButton").html($("#bText").val());

    });
    $("#red").change(() => {
        colorSlider.red = $("#red").val();
        setColor();
    });
    $("#blue").change(() => {
        colorSlider.blue = $("#blue").val();
        setColor();
    });
    $("#green").change(() => {
        colorSlider.green = $("#green").val();
        setColor();
    });

});