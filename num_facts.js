"use strict"

const BASE_URL = "http://numbersapi.com";
let rad_num = Math.floor(100 * Math.random());

// #1 Make a request to the Numbers API and get back JSON
async function getOneFact (){
  let rad_num = Math.floor(100 * Math.random());
  let resp = await axios.get(`${BASE_URL}/${rad_num}/trivia?json`);
  displayFacts(resp.data.text);

}


// #2 Make multiple numbers facts in a single request
async function getMultiFactsWithSingleRequest(){

  let resp = axios({ url: `${BASE_URL}/${rad_num}/trivia?json`})
                  .then(function fact1(r1){
                    displayFacts(r1.data.text)
                    return axios({ url: `${BASE_URL}/${rad_num+1}/trivia?json`})
                  })
                  .then(function fact2(r2){
                    displayFacts(r2.data.text)
                    return axios({ url: `${BASE_URL}/${rad_num+2}/trivia?json`})
                  })
                  .then(function fact3(r3){
                    displayFacts(r3.data.text)
                    return axios({ url: `${BASE_URL}/${rad_num+3}/trivia?json`})
                  })
                  .catch(function (err) {
                    console.error(err);
                  });
}


// #3 Get multiple numbers in multiple requests
async function getMultiFacts (){

  let rad_num = Math.floor(100 * Math.random());

  let resp1 = axios.get(`${BASE_URL}/${rad_num}/trivia?json`);
  let resp2 = axios.get(`${BASE_URL}/${rad_num+1}/trivia?json`);
  let resp3 = axios.get(`${BASE_URL}/${rad_num+2}/trivia?json`);

  let results = [await resp1, await resp2, await resp3]
  for (let result of results){
    displayFacts(result.data.text);
  }
}

function displayFacts(result){
  $(".facts").append(`<p>${result}</p>`)
}

