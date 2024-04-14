//jshint esversion:9
const week = { 0: "sun", 1: "mon", 2: "tue", 3: "wed", 4: "thu", 5: "fri", 6: "sat" };

$(document).ready( function() {
  $.getJSON('data.json')
  .done(function(json) {
    const obj = [...json];
    var max = 0;
    obj.forEach( fee => { max = (max < fee.amount) ? fee.amount : max; });
    if (obj.length) createChart(obj, max);

  })
  .fail(function(jqxhr, err) {
    console.log("Request Failed: " + err);
  });
});

function createChart(fees, maximum) {
  const today = week[new Date().getDay()];
  fees.forEach( fee => {
    $('.set').append(
                `<div class="col ${fee.day}">` +
                `<h4 class="amount" style="top:${150*(1-fee.amount/maximum)}px">$ ${fee.amount}</h4>` +
                `<div class="bar-wrap">` +
                `<div class="bar ${(fee.day === today) ? 'lit' : ''}"></div>` +
                `</div>` +
                `<div>${fee.day}</div>` +
                `</div>`
              );
    $(`.${fee.day} .bar`).css('height', `${fee.amount/(maximum*0.01)}%`);
  });
}


//*----                           2023 © kmichiver                              -----*
