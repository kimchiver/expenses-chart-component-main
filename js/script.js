//jshint esversion:8

const jsonstr = $.getJSON("https://kimchiver.github.io/fem-expenses-chart-component-main/data.json")
  .done(function(json) {
    const obj = [...json];
    var max = 0;
    obj.forEach((fee) => {
      max = (max < fee.amount) ? fee.amount : max;
    });
    if (obj.length) createChart(obj, max);

  })
  .fail(function(jqxhr, err) {
    console.log("Request Failed: " + err);
  });


function createChart(feesList, maximum) {
  $('.set > div').each(function(i) {
    if (i < feesList.length) {
      const amount = feesList[i].amount;
      const classList = (amount === maximum) ? 'bar lit' : 'bar';
      $(this).append($('<h4>').text(`$ ${amount}`).addClass('popup').css('top', `${150*(1-amount/maximum)}px`))
        .append($('<div>').addClass('bar-wrap')
          .append($('<div>').addClass(classList).css('height', `${amount/(maximum*0.01)}%`)))
        .append($('<div>').text(`${feesList[i].day}`));

    }
  });
}


// $( createChart() );
