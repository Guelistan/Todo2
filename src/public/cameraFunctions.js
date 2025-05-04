import { openCropper } from './cropperFunctions.js';

export function openCamera() {
    const camera = document.getElementById('camera');
    const video = document.getElementById('video');
    camera.style.display = 'block';
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error('Fehler beim Zugriff auf die Kamera:', err));
}

export function takePicture() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    openCropper(dataUrl);
}
