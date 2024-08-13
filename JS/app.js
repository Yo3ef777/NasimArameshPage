let $ = document;

const ContElem = $.querySelector(".container");
const ContFluidElem = $.querySelector(".container-fuild");
const downloadElm = $.querySelector(".rect5");
const liElem = $.querySelectorAll(".li");
let formElem = $.querySelector("form");
let InputElem = $.querySelector("#input");
let email = $.querySelector("#input1");
let DesElem = $.querySelector("#textarea");
let btnElem = $.querySelector("#btn");
let DownloadElem = $.querySelector("#a12");

let names = ["درباره", "پیشنهادات", "دانلود"];

liElem.forEach((event) => {
  event.addEventListener("click", ChangeItem);
});
function ChangeItem(events) {
  if (window.innerWidth > 1041) {
    PositionItem(events);
  } else {
    scrollBtn(events, 500, 1200, 2000);
  }
  if (window.innerWidth < 400) {
    scrollBtn(events, 570, 1350, 3000);
  }
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 38) {
    ChangeItem(event);
  }
});

function scrollBtn(events, a, b, c) {
  if (events.target.innerHTML == names[0]) {
    window.scrollBy(0, a);
  } else if (events.target.innerHTML == names[1]) {
    window.scrollBy(0, b);
  } else if (events.target.innerHTML == names[2]) {
    window.scrollBy(0, c);
  }
}

function PositionItem(events) {
  if (events.target.innerHTML == names[0]) {
    ContElem.style.cssText =
      "transition: all ease 0.7s; opacity:1;   position: absolute; top:0px";

    formElem.style.cssText =
      "transition: all ease 0.7s; opacity:0;   position: absolute; top:800px";
    downloadElm.style.cssText =
      "transition: all ease 0.7s; opacity:0;   position: absolute; top:1000px";
  } else if (events.target.innerHTML == names[1]) {
    ContElem.style.cssText =
      "transition: all ease 0.7s; opacity:0;   position: absolute; top:-700px";

    formElem.style.cssText =
      "transition: all ease 0.7s; opacity:1;   position: absolute; top:100px";
    downloadElm.style.cssText =
      "transition: all ease 0.7s; opacity:0;   position: absolute; top:-1000px";
  } else if (events.target.innerHTML == names[2]) {
    downloadElm.style.cssText =
      "transition: all ease 0.7s; opacity:1;   position: absolute; top:0px";
    formElem.style.cssText =
      "transition: all ease 0.7s; opacity:0;   position: absolute; top:800px";

    ContElem.style.cssText =
      "transition: all ease 0.7s; opacity:1;   position: absolute; top:-700px";
  }
}

btnElem.addEventListener("click", (event) => {
  event.preventDefault();
  let tampelete = {
    from_name: InputElem.value,
    from_email: email.value,
    message: DesElem.value,
  };

  let count = 0;

  emailjs.send("service_v63k9fl", "template_e4uaegl", tampelete).then(
    function (respond) {
      console.log("SUCCESS!!", respond.status, respond.text);
      setInterval(() => {
        count++;
        if (count <= 3) {
          btnElem.innerHTML = "ارسال شد :-)";
          btnElem.style.cssText = "background-color: rgb(75, 181, 67);";
        } else {
          btnElem.innerHTML = "ارسال";
          btnElem.style.cssText = "  background-color: #00473e;";
        }
      }, 1000);
    },
    function (error) {
      console.log("FAILED!!", error);
      setInterval(() => {
        count++;
        if (count <= 3) {
          btnElem.innerHTML = "ارسال نشد :/";

          btnElem.style.cssText = "background-color: rgb(250,17,61);";
        } else {
          btnElem.innerHTML = "ارسال";
          btnElem.style.cssText = "  background-color: #00473e;";
        }
      }, 1000);
    }
  );
  InputElem.value = "";
  email.value = "";
  DesElem.value = "";
});

DownloadElem.addEventListener("click", (event) => {
  event.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک
  fetch("download/nasimAramesh.apk")
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "nasimAramesh.apk";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(() => alert("دانلود فایل با مشکل مواجه شد."));
});

// service_v63k9fl sevice ID
// template_e4uaegl tampel ID
//
