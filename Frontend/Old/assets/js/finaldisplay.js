    async function display_tweets(){
    value = {
        "value" : "hello"
    }
    
    const response = await fetch('http://127.0.0.1:8000/sentimentanalysis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    });

    const data = await response.json();
    const result_ele = document.querySelector('display_tweets');
    const resultval = document.querySelector('result');
    const val2 = data["tweets"]
    resultval.innerText = data['results']

    for (i = 0; i < val2.length; i++) {
        
          document.getElementById("result").innerHTML = cities[i] += "<br>"; 
      }
    }

    window.onload = display_tweets();