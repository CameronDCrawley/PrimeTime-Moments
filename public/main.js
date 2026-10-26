let bid = document.querySelectorAll('.bidBtn')
let sold = document.querySelectorAll('.purchaseBtn')

Array.from(bid).forEach(function (element) {
  element.addEventListener("click", function (btn) {
    const card = btn.target.closest('.card')
  const momentName = element.getAttribute('data-moment')

    const input = card.querySelector('.bidInput')
    const bid = input.value
    console.log(momentName);
    console.log(bid)

    fetch("/addBid", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        "bid":bid,
       "momentName":momentName,
      //   "date": date,
      //   "moment":moment,
      //   "description":description,
      //   "image":image,
      //   "sport":sport,
      //   "buyNow":buyNow
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(sold).forEach(function (element) {
  element.addEventListener("click", function () {
    const momentName = element.getAttribute('data-moment')
    // const date = this.parentNode.parentNode.childNodes[3].innerText;
    // const moment = this.parentNode.parentNode.childNodes[5].innerText;
    // const description = this.parentNode.parentNode.childNodes[7].innerText;
    // const image = this.parentNode.parentNode.childNodes[9].innerText;
    // const sport = this.parentNode.parentNode.childNodes[11].innerText;
    // const buyNow = this.parentNode.parentNode.childNodes[13].innerText;

    fetch("/sold", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "momentName":momentName,
        // "date": date,
        // "moment":moment,
        // "description":description,
        // "image":image,
        // "sport":sport,
        // "buyNow":buyNow
        
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
