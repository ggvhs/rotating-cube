import * as THREE from 'three';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube mesh creation
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set the initial rotation state
let rotationAmount = 0;

// Flag to track whether the cube is currently rotating or not
let isRotating = false;

// Clock to measure the time passed during rotation
const clock = new THREE.Clock();

function handleKeyDown(e) {
    const keyPressed = e.key;

    if (keyPressed === 'ArrowLeft' && !isRotating) {
        // Reset the rotation amount and the clock
        rotationAmount = 0;
        clock.start();
        // Set isRotating flag to true
        isRotating = true;
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Check if the cube is currently rotating
    if (isRotating) {
        // Get the elapsed time since the rotation started
        const elapsedTime = clock.getElapsedTime();

        // Rotate the cube by 90 degrees (Math.PI / 2 radians) over 1 second
        if (elapsedTime < 1) {
            rotationAmount = (Math.PI / 2) * (elapsedTime / 1);
        } else {
            // Set rotation to exactly 90 degrees after 1 second
            rotationAmount = Math.PI / 2;
            // Stop rotating
            isRotating = false;
        }
    }

    // Apply the rotation to the cube
    cube.rotation.y = rotationAmount;

    // Render the scene
    renderer.render(scene, camera);
}

// Event listener for keydown
document.addEventListener('keydown', handleKeyDown);

// Move the camera position
camera.position.set(0, 0, 5);

// Start the animation
animate();