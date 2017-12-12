$(document).ready(function(){

    //Init chart
    $("#successGauge").easyPieChart({
        lineWidth: 6,
        size: 160,
        scaleColor: false,
        trackColor: 'rgba(255,255,255,.25)',
        barColor: '#FFFFFF',
        animate: ({duration: 2500, enabled: true})
    });

    // Suppression du message d'info
    setTimeout(function() {
        $("#info-fiches").fadeOut(500,function(){
            $(this).css({"visibility":"hidden",display:'block'}).slideUp();
        });
    }, 5000);
    $("#close-info-fiches").click(function () {
        $("#info-fiches").fadeOut(500,function(){
            $(this).css({"visibility":"hidden",display:'block'}).slideUp();
        });
    });

    // Correction du quizz
    $("#run-quizz").click(function () {

        // Remplacement des mots importants par des inputs ayant un id correspondant au mot précédement écrit
        $("#theorie-apprentissage i").each(function () {
            $(this).replaceWith('<input type="text" class="form-control quizz-input" id="' + $(this).text() + '" style="width:' + $(this).width() + 'px;"/>');
        });

        // Changement du boutton de validation
        $(this).replaceWith('<button type="button" class="btn btn-wd btn-info btn-fill btn-move-right" id="check-quizz">Vérifier les réponses <span class="btn-label"><i class="ti-check"></i></span></button>');

        //Vérification des réponses
        $("#check-quizz").click(function () {
            var totalWords = 0;
            var goodResponses = 0;

            //Coloration des inputs
            $("p input").each(function () {
                totalWords += 1;
                if ($(this).val() == "") {
                    alertBox("Attention !", "Vous n'avez pas rempli tous les champs.", "warning");
                    $(this).removeClass("error");
                    $(this).removeClass("quizz-form-valid");
                    $(this).addClass("quizz-form-warning");
                } else if($(this).attr('id') == $(this).val()) {
                    goodResponses += 1;
                    $(this).removeClass("error");
                    $(this).removeClass("quizz-form-warning");
                    $(this).addClass("quizz-form-valid");
                } else if ($(this).attr('id') != $(this).val()) {
                    $(this).removeClass("quizz-form-valid");
                    $(this).removeClass("quizz-form-warning");
                    $(this).addClass("error");
                }
            });

            //Update de la jauge de success avec le pourcentage de bonnes réponses (+vérification de la division par 0)
            if (totalWords <= 0) {
                updateSuccessGauge(0);
            } else {
                updateSuccessGauge(goodResponses / totalWords * 100);
                if ((goodResponses / totalWords * 100) == 100) {
                    alertBox("Excellent travail !", "Vous êtes vraiment au point sur ce sujet.", "success");
                }
            }
        });
    });

    function alertBox(title, message, type) {
        swal({
            title: title,
            text: message,
            timer: 2000,
            type: type,
            showConfirmButton: false,
        });
    }

    function updateSuccessGauge(percentage) {
        $("#successGaugeCard").removeAttr("style");
        if (percentage <= 25) {
            $("#successGaugeCard").attr("data-background-color", "orange");
            $("#successGaugeAdvice").text("Essayez de vous concentrer lors de vos révisions.");
        } else if (percentage <= 50) {
            $("#successGaugeCard").attr("data-background-color", "blue");
            $("#successGaugeAdvice").text("Pas mal, poursuivez vos efforts.");
        } else if (percentage <= 75) {
            $("#successGaugeCard").attr("data-background-color", "green");
            $("#successGaugeAdvice").text("Encore un peu d'entrainement et vous serez au top !");
            console.log("ici");
        } else if (percentage == 100) {
            $("#successGaugeCard").attr("data-background-color", "green");
            $("#successGaugeAdvice").text("Bravo, vous êtes incollable !");
        }
        $("#successGauge").attr("data-percent", percentage).data('easyPieChart').update(percentage);
        $("#successGauge span").text(percentage);
    }
});