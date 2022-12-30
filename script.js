window.addEventListener("load", () => {
  var ip_address = "";
  $.getJSON("https://api.ipify.org?format=json", function (data) {
    ip_address = data.ip;
    localStorage.setItem("ip", ip_address);
    document.querySelector("#myip").textContent = ip_address;

    //  getIPDetails(ip_address);
    document.querySelector(".btn-getip").addEventListener("click", () => {
        let main = document.querySelector(".content-wrapper")
        main.classList.remove("d-none");
        document.querySelector('.btn-getip').classList.add("d-none")
      ip = localStorage.getItem("ip");

      fetch(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=4f1ee31222cc40b5a494901d7145f4bc&ip_address=${ip}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const location = data.name;
          const lat = data.latitude;
          const long = data.longitude;
          const city = data.city;
          const region = data.region;
          const organization = data.connection.autonomous_system_organization;
          const hostname = data.connection.isp_name;
          const timezone = data.timezone.name;
          const datetime = data.timezone.current_time;
          const pincode = data.postal_code;

          document.querySelector("#lat").textContent = lat;
          document.querySelector("#long").textContent = long;
          document.querySelector("#city").textContent = city;
          document.querySelector("#region").textContent = region;
          document.querySelector("#organization").textContent = organization;
          document.querySelector("#host-name").textContent = hostname;
          document.querySelector("#time-zone").textContent = timezone;
          document.querySelector("#date-time").textContent = datetime;
          document.querySelector("#pincode-no").textContent = pincode;
          const iframeData = document.getElementById("iframeId");
          iframeData.src = `https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`;

          getPincodeData(pincode);
        });
    });

  });



  function getPincodeData(pin) {
    fetch(`https://api.postalpincode.in/pincode/${pin}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const pincode_msg = data[0].Message;
        document.querySelector("#pincode-no-msg").textContent = pincode_msg;
        var rootEle = document.querySelector("#database");
        data[0].PostOffice.map((item) => {
          rootEle.innerHTML += `<div class="col-12 col-md-6 box mb-3" >
                <div class="box-body">
                    <p class="title">Name
                        <span class="subhead" id="name">${item.Name}</span>
                    </p>
                    <p class="title">Branch Type
                        <span class="subhead" id="branch-type">${item.BranchType}</span>
                    </p>
                    <p class="title">Delivery Status
                        <span class="subhead" id="delivery-status">${item.DeliveryStatus}</span>
                    </p>
                    <p class="title">District
                        <span class="subhead" id="district">${item.District}</span>
                    </p>
                    <p class="title">Division
                        <span class="subhead" id="division">${item.Division}</span>
                    </p>
                </div>
            </div>`;
        });
      });
  }
});


document.querySelector(".filter-input").addEventListener("keyup", () => {
    debugger;
    var input, filter, li, i;
    input = document.querySelector(".filter-input");
    filter = input.value.toUpperCase();
    // ul = document.getElementById("myUL");
    li = document.getElementsByClassName("box");
    for (i = 0; i < li.length; i++) {
        let title = li[i].querySelector(".box-body");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            li[i].classList.remove("d-none")
        } else {
            li[i].classList.add("d-none")
        }    
    }

})
