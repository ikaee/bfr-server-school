$(document).ready(function() {
    populateDashboard();
});

function getUrl(){
    //return "http://epgm-webapp.cloudapp.net:7080/bfr/v1/dashboard/";
    return "http://localhost:8080/bfr/v1/dashboard";
}

function populateDashboard(){
    callDashboardService(getUrl())
}

function loadDashboard(data){
    $('.count').text(data.grade_data.present).css("color", "black");
    $('.count3').text(data.grade_data.total).css("color", "black");
    $('.count4').text(data.grade_data.percentage).css("color", "black");

    new Chart(document.getElementById("doughnut").getContext("2d")).Doughnut(data.gender_data);
    new Chart(document.getElementById("polarArea").getContext("2d")).PolarArea(data.age_data);
    new Chart(document.getElementById("bar").getContext("2d")).Bar(data.month_data);
}

function callDashboardService(url){
    $.ajax({
    url: url
    }).then(function(data) {
        loadDashboard(data)
    });
}