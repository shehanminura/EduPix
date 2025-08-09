const URL = "https://teachablemachine.withgoogle.com/models/yNwpWtamZ/";
let Type="";
let model, webcam, labelContainer, maxPredictions;

async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
       
        document.getElementById("myButton").style.display = "none";
    

        document.getElementById("loader").style.display = "block";

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
    },4800 );

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    
        const flip = true;
        webcam = new tmImage.Webcam(350, 350, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);
    
        document.getElementById("webcam-container").appendChild(webcam.canvas);
    
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            const div = document.createElement("div");
            div.className = "label";
            labelContainer.appendChild(div);
        }   
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
    
}

async function predict() {
    const predictions = await model.predict(webcam.canvas);
    const bestPrediction = predictions.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
    );

    const resultImage = document.querySelector(".result");
    const resultParagraph = document.querySelector(".description");

    switch (bestPrediction.className) {
        case "Home":
            resultImage.src = "https://i.pinimg.com/736x/d3/65/de/d365de448d6f061773346280338e3786.jpg";
            resultParagraph.textContent = "This is a house, representing shelter and comfortThis is a house.";
            break;
        case "Plants":
            resultImage.src = "https://i.pinimg.com/originals/18/42/81/184281f0fe87517a950beb8112c308dd.gif";
            resultParagraph.textContent = "These are plants, symbolizing growth and nature.";
            break;
        case "Car":
            resultImage.src = "https://i.pinimg.com/736x/fb/ac/15/fbac1539d1bf5b8e620000d6649aef7b.jpg";
            resultParagraph.textContent = "This is a car, showcasing transportation and mobility.";
            break;
        case "Bulbs":
            resultImage.src = "https://i.pinimg.com/736x/3e/d5/e2/3ed5e20d024db33bd63887498e4c7b46.jpg";
            resultParagraph.textContent = "These are bulbs, representing light and innovation.";
            break;
        case "A":
            resultImage.src = "https://i.pinimg.com/736x/0d/be/81/0dbe8152e52d9b16488a596474b7d86b.jpg";
            resultParagraph.textContent = "This is category A.";
            break;
        case "B":
            resultImage.src = "https://i.pinimg.com/736x/87/2a/a1/872aa13811d2743ffc56a888e47fb103.jpg";
            resultParagraph.textContent = "This is category B.";
            break;
        case "C":
            resultImage.src = "https://i.pinimg.com/736x/7a/5b/97/7a5b974139d827db7f70678a1e4d6c73.jpg";
            resultParagraph.textContent = "This is category C.";
            break;
        case "D":
            resultImage.src = "https://i.pinimg.com/736x/84/3d/78/843d784ad077a58d5b59905a4e5287e1.jpg";
            resultParagraph.textContent = "This is category D.";
            break;
        case "E":
            resultImage.src = "https://i.pinimg.com/736x/e1/d9/18/e1d9185b98964da1681cc4773c58402c.jpg";
            resultParagraph.textContent = "This is category E.";
            break;
        default:
            resultImage.src = "https://i.pinimg.com/736x/8b/77/a9/8b77a91eb913e5a38b8a00748802baf9.jpg";
            resultParagraph.textContent = "No confident match found.";
    }

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = predictions[i].className + ": ";
        const confidence = predictions[i].probability.toFixed(2) * 100;
        labelContainer.childNodes[i].innerHTML = `${classPrediction} <span>${confidence.toFixed(1)}%</span>`;
    }
    
    
}
