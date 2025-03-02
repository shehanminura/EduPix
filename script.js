const step1 = document.querySelector(".step1");
const step2 = document.querySelector(".step2");
const step3 = document.querySelector(".step3");
const emailAddress = document.getElementById("emailAddress");
const verifyEmail = document.getElementById("verifyEmail");
const inputs = document.querySelectorAll(".otp-group input");
const nextButton = document.querySelector(".nextButton");
const verifyButton = document.querySelector(".verifyButton");
let otp = "";

window.addEventListener("load", () => {
    emailjs.init("Tga5_-cKaIGmEttCI");
    step2.style.display = "none";
    nextButton.classList.add("disable");
    verifyButton.classList.add("disable");
})

const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        nextButton.classList.remove("disable")
    } else {
        nextButton.classList.add("disable")
    }
}

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
}
console.log(generateOTP());

inputs.forEach((input) => {
    input.addEventListener("keyup", function (e) {
        if (this.value.length >= 1) {
            e.target.value = e.target.value.substr(0, 1);
        }

        if (inputs[0].value != "" && inputs[1].value != "" && inputs[2].value != "" && inputs[3].value != "") {
            verifyButton.classList.remove("disable");
        } else {
            verifyButton.classList.add("disable")
        }
    })
})


nextButton.addEventListener("click", () => {
    const serviceID = "service_rd0rofc";
    const templateID = "template_4dfht3x";
    otp = generateOTP()
    nextButton.innerHTML = "&#9889; Sending...";
    let templateParameter = {
        from_name: "EduPix EDU",
        otp: otp,
        message: "Please find the attached file.",
        reply_to: emailAddress.value,
    };



    emailjs.send(serviceID, templateID, templateParameter).then(
        (res) => {
            console.log("Email sent successfully:", res.status, res.text);
            nextButton.innerHTML = "Next &rarr;";
            step1.style.display = "none";
            step2.style.display = "block";

        },
        (err) => {
            console.error("Failed to send email:", err);
        }
    );
});

verifyButton.addEventListener("click", () => {
    let values = "";
    inputs.forEach((input) => {
        console.log(input.value);

        values += input.value;
    })
    if (otp == values) {
        step1.style.display = "none";
        step2.style.display = "none";
        alert("Login Successfull!");
        window.location.href = "imageScan.html";

    } else {
        setTimeout(() => {
            verifyButton.classList.add("error-shake");
        }, 1000);
        alert("Login Faild");
    }
})


function changeMyEmail() {
    step1.style.display = "block";
    step2.style.display = "none";

}



