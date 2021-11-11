const fs = require('fs');
const imagesDir = 'images';

function checkIfImagesDirExistsAndMakeIt() {
    if (!fs.existsSync(imagesDir))
        fs.mkdirSync(imagesDir);
}

function saveImage(name, image) {
    fs.writeFileSync(imagesDir + '/' + name + '.png', image, 'base64', (err) => {      
        console.log(err);
    });
}

module.exports = {
    checkIfImagesDirExistsAndMakeIt,
    saveImage
};