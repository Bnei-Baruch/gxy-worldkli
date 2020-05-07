/* RESIZE OPTIMIZE IMAGES */
const Jimp = require('jimp');

const resizeImage = async ({imgPath, sufix, width, height = Jimp.AUTO, quality=90}) => {
    const image = await Jimp.read(imgPath);
    await image.resize(width, height);
    await image.quality(quality);
    await image.writeAsync(imgPath.replace('.jpg', `${sufix}.jpg`));
}; 

module.exports = {
    resizeImage
}