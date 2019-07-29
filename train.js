$(document).ready(function(){

   
    var config = {
        apiKey: "f08c885326bae3822028e59e5a235424c8906833",
        authDomain: "train7-1a48c.firebaseio.com",
        databaseURL: "https://train7-1a48c.firebaseio.com",
        projectId: "train7-1a48c",
        storageBucket: "gs://train7-1a48c.appspot.com",
        messagingSenderId: "6322897586484"
    };
    firebase.initializeApp(config);

    
    var database = firebase.database();

    var trainName = "";
    var trainDestination = "";
    var trainFrequency = 0;
    var trainTime = "";
    var clickCounter = 1;

    $("#add-train").on("click", function(event){
        event.preventDefault();
        if ($("#train-input").val(),$("#destination-input").val(),$("#time-input").val(), $("#frequency-input").val() === "") {
            alert("All input fields are mandotary and click the submit button.");

        } else if ($("#time-input").val() > 24) {

            alert("Pls enter the 24 hr time format and time.");
        } else {
                 

            trainName = $("#train-input").val().trim();
            trainDestination = $("#destination-input").val().trim();
            trainTime = $("#time-input").val().trim();
            trainFrequency = $("#frequency-input").val().trim(); 



            console.log("Input Values");
            console.log(trainName);
            console.log(trainDestination);
            console.log(trainTime);
            console.log(trainFrequency);


            var trainDetail = {
                name : trainName,
                destination : trainDestination,
                frequency : trainFrequency,
                time : trainTime
            };


            database.ref().push(trainDetail);
        

            console.log("Temporary object train values");
            console.log(trainDetail.name);
            console.log(trainDetail.destination);
            console.log(trainDetail.frequency);
            console.log(trainDetail.time);      
        

            alert("train details added..");        


            $("#train-input").val("");
            $("#destination-input").val("");
            $("#time-input").val("");
            $("#frequency-input").val("");
        }
    });
        

    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        console.log("Hello2");
        console.log(childSnapshot.val());
        

        var trainNumber = clickCounter++;
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;


        console.log("database train value");
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFrequency);


        var trainTimeConvert = moment(trainTime, "HH:mm").subtract(1, "years");
        console.log("trainTimeConvert", + trainTimeConvert);


        var currentTime = moment();


        var diffTime  = moment().diff(trainTimeConvert, "minutes");
        console.log(diffTime);

        var remainder = diffTime % trainFrequency;
        console.log("Remainder: " + remainder);


        var timeRemain = trainFrequency - remainder;
        console.log("Time Remain: " + timeRemain);


        var newTrainTime = moment().add(timeRemain, "minutes");
        var newTrainTimeFormat = moment(newTrainTime).format("HH:mm");


        var row = $(("<tr class = 'tableRow'><td>" + trainNumber + "</td><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainTime + "</td><td>" + trainFrequency  + "</td><td>" + newTrainTimeFormat  + "</td><td>" + timeRemain + "</td></tr>"));


        $(".tableBody").append(row);
    });        
});