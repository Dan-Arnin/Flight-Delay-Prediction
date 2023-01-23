const done = document.getElementById("submit");
const dropdown1 = document.getElementById("selectSumm");
var summType="";
const buttonClick = (req)=>{
  console.log("button clicked")
}
function onChange(){
  console.log(summType);
}
params = {
  "type": dropdown1.value,
  "context" : "Python",
  "no_of_tweets": 100
}

dropdown1.addEventListener("change", function() {
  chosenOption = dropdown1.value;
  params["type"] = chosenOption;
  
});

done.addEventListener("click", async function () {
  var tweetno = document.getElementById("notweets").value;
  var topic = document.getElementById("topic").value;
  params["context"] = topic;
  params["no_of_tweets"] = tweetno;
  console.log(params["context"]);
  console.log(params["no_of_tweets"]);
  console.log(params["type"])

  const response = await fetch('http://127.0.0.1:8000/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
});