// Importiere die Funktion zum Öffnen des Croppers aus der separaten Datei
import { openCropper } from './cropperFunctions.js';

// Funktion zum Aktivieren der Kamera
export async function openCamera() {
    const camera = document.getElementById('camera');
    const video = document.getElementById('video');
    camera.style.display = 'block';

    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        if (videoDevices.length === 0) {
            alert('Keine Kamera gefunden.');
            return;
        }

        // Optional: Wähle die erste Kamera aus oder lasse den Benutzer eine auswählen
        const selectedDeviceId = videoDevices[0].deviceId;

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined }
        });

        video.srcObject = stream;
    } catch (err) {
        if (err.name === 'NotAllowedError') {
            console.warn('Kamerazugriff wurde verweigert.');
        } else {
            console.error('Fehler beim Zugriff auf die Kamera:', err);
        }
        alert('Fehler beim Zugriff auf die Kamera: ' + err.message);
    }
}

// Funktion global verfügbar machen
window.openCamera = openCamera;

// Event-Listener für den Button zum Öffnen der Kamera hinzufügen
document.getElementById('openCameraButton').addEventListener('click', openCamera);

// Funktion zum Aufnehmen eines Bildes
export function takePicture() {
    // Dein Code
}

// Funktion global verfügbar machen
window.takePicture = takePicture;
