export let croppedImage;
let cropper;

export function openCropper(imageSrc) {
    const cropperContainer = document.getElementById('cropper-container');
    const cropperImage = document.getElementById('cropper-image');
    cropperImage.src = imageSrc;
    cropperContainer.style.display = 'block';
    cropper = new Cropper(cropperImage, {
        aspectRatio: 1,
        viewMode: 1
    });
}

export function cropImage() {
    const imageFormat = document.getElementById('imageFormat').value;
    croppedImage = cropper.getCroppedCanvas().toDataURL(imageFormat);
    cropper.destroy();
    document.getElementById('cropper-container').style.display = 'none';
    document.getElementById('camera').style.display = 'none';
}

export function adjustImage(property, value) {
    const cropperImage = document.getElementById('cropper-image');
    const ctx = cropper.getCroppedCanvas().getContext('2d');
    const canvas = cropper.getCroppedCanvas();

    // Apply adjustments
    if (property === 'brightness' || property === 'contrast') {
        ctx.filter = `${property}(${value}%)`;
    } else if (property === 'resize') {
        canvas.width = canvas.width * value;
        canvas.height = canvas.height * value;
    }

    // Redraw the image with adjustments
    ctx.drawImage(cropperImage, 0, 0, canvas.width, canvas.height);
}

export function resetAdjustments() {
    const cropperImage = document.getElementById('cropper-image');
    cropperImage.style.filter = 'none';
}