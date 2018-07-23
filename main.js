"use strict"

// Immediatley Resolved
//var myPromise = Promise.resolve('Foo');

//myPromise.then((res) => console.log(res));

/*
var myPromise = new Promise(function(resolve, reject){
  setTimeout(() => resolve(4), 2000);
});
myPromise.then((res) => {
  res +=3;
  console.log(res);
});
*/

function getData(method, url){
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function(){
      if(this.status >= 200 && this.status < 300){
        resolve(xhr.response);
      }else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function(){
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

getData('GET', 'https://raw.githubusercontent.com/therezacuet/Project-Report/master/jsndata.json').then(function(data){
  let users = JSON.parse(data);
  let output = '';
  for(let user of users){
    output += `
      <li>
        
        <h3>Email: ${user.email}</h3>
        <p>Phone: ${user.phone}</p>
      </li>
    `;
  }

  document.getElementById('template').innerHTML = output;
}).catch(function(err){
  console.log(err);
});