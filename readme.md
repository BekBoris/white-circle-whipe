## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

 
Game/Task Overview

This game harnesses Mediapipe's hand tracking to allow real-time interaction with virtual objects. 
Key features include dynamic collision detection between circles 
and responsive gameplay that adjusts based on hand movement and position.

Key Features:
    Hand Tracking: Powered by Mediapipe for real-time interaction.
    Circle Collision Detection: Manages dynamic interactions within the game.
    Dynamic Mesh Positioning: Ensures all elements are visible within the 3D game space.
    Responsive Gameplay: Auto-adjusts game elements in response to hand movement.

Technologies Used:
    Mediapipe: For real-time hand tracking.
    Three.js: For 3D graphics rendering in the browser.
    Vite.js: Employed to optimize and serve the project efficiently.



