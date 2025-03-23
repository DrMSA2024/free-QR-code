document.addEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll(".option");
    const inputField = document.getElementById("inputField");
    const qrcodeDiv = document.getElementById("qrcode");
    const downloadBtn = document.getElementById("downloadBtn");
    const resetBtn = document.getElementById("resetBtn");
    let selectedType = "";

    options.forEach(option => {
        option.addEventListener("click", function () {
            selectedType = this.dataset.type;
            inputField.placeholder = "Enter " + selectedType;
            inputField.style.display = "block";
        });
    });

    document.getElementById("generateBtn").addEventListener("click", function () {
        let input = inputField.value.trim();
        qrcodeDiv.innerHTML = "";

        if (!input) {
            alert("Please enter valid data.");
            return;
        }

        let qrData = input;
        switch (selectedType) {
            case "whatsapp": qrData = "https://wa.me/" + input; break;
            case "instagram": qrData = "https://www.instagram.com/" + input; break;
            case "email": qrData = "mailto:" + input; break;
            case "facebook": qrData = "https://www.facebook.com/" + input; break;
            case "telegram": qrData = "https://t.me/" + input; break;
            case "youtube": qrData = "https://www.youtube.com/channel/" + input; break;
            case "tiktok": qrData = "https://www.tiktok.com/@" + input; break;
            case "maps": qrData = "https://www.google.com/maps/search/?q=" + encodeURIComponent(input); break;
            case "linkedin": qrData = "https://www.linkedin.com/in/" + encodeURIComponent(input); break;
            case "phone": qrData = "tel:" + input; break;
            case "lost-found":
            case "custom-url":
            case "customize-option":
                qrData = input;
                break;
            default:
                alert("Invalid type selected.");
                return;
        }

        new QRCode(qrcodeDiv, { text: qrData, width: 200, height: 200 });

        downloadBtn.style.display = "block";
        downloadBtn.onclick = function () {
            let qrCanvas = qrcodeDiv.querySelector("canvas");
            let link = document.createElement("a");
            link.href = qrCanvas.toDataURL("image/png");
            link.download = "QRCode.png";
            link.click();
        };
    });

    resetBtn.addEventListener("click", function () {
        inputField.value = "";
        qrcodeDiv.innerHTML = "";
        downloadBtn.style.display = "none";
    });
});
