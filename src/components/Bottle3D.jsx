import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Bottle3D = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // --- Camera Setup ---
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // --- Lighting ---
    // Ambient light for base visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Key light (soft purple studio light from top right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    // Fill light (teal/blue from bottom left for color depth)
    const fillLight = new THREE.DirectionalLight(0xa58bff, 1.2);
    fillLight.position.set(-6, -2, 2);
    scene.add(fillLight);

    // Back light (for separation/rim lighting)
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(-2, 4, -6);
    scene.add(rimLight);

    // Dynamic point light that follows the mouse slightly for shininess
    const specularLight = new THREE.PointLight(0xffffff, 0.8, 10);
    specularLight.position.set(0, 2, 4);
    scene.add(specularLight);

    // --- Procedural Bottle Group ---
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // 1. Bottle Body (using LatheGeometry for smooth premium contours)
    const bottlePoints = [];
    // Define the profile curve of the bottle
    // bottom center
    bottlePoints.push(new THREE.Vector2(0, -1.8));
    // bottom curve
    bottlePoints.push(new THREE.Vector2(0.9, -1.8));
    bottlePoints.push(new THREE.Vector2(1.1, -1.65));
    // main body height
    bottlePoints.push(new THREE.Vector2(1.18, -1.0));
    bottlePoints.push(new THREE.Vector2(1.18, 0.9));
    // rounded shoulder
    bottlePoints.push(new THREE.Vector2(1.12, 1.2));
    bottlePoints.push(new THREE.Vector2(0.95, 1.4));
    bottlePoints.push(new THREE.Vector2(0.42, 1.55));
    // neck base
    bottlePoints.push(new THREE.Vector2(0.38, 1.58));
    // neck height
    bottlePoints.push(new THREE.Vector2(0.38, 2.0));
    // lip of the neck
    bottlePoints.push(new THREE.Vector2(0.42, 2.02));
    bottlePoints.push(new THREE.Vector2(0.42, 2.08));
    bottlePoints.push(new THREE.Vector2(0, 2.08));

    const bodyGeom = new THREE.LatheGeometry(bottlePoints, 64);
    
    // Rich saturated purple material with high clearcoat for liquid-like reflection
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x5b33f5,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.8,
    });

    const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
    bottleGroup.add(bodyMesh);

    // 2. Dynamic Label Texture
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 512;
    const ctx = labelCanvas.getContext('2d');
    
    // Create text on transparent canvas to overlay on top of the purple body
    ctx.clearRect(0, 0, 1024, 512);
    
    // --- FRONT SIDE (Centered at X = 256) ---
    // "bolly" brand logo text
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 142px "Outfit", "Arial Black", sans-serif';
    ctx.fillText('bolly', 256, 170);

    // "Clarify" text (using neon-green accent color)
    ctx.fillStyle = '#D2F53C';
    ctx.font = '700 48px "Outfit", sans-serif';
    ctx.fillText('Clarify', 256, 275);

    // "Shampoo" text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '300 44px "Inter", sans-serif';
    ctx.fillText('Shampoo', 256, 330);

    // Ingredients / Description
    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.font = '500 21px "Inter", sans-serif';
    ctx.fillText('WITH TEA TREE & PEPPERMINT OIL', 256, 400);
    ctx.font = '400 17px "Inter", sans-serif';
    ctx.fillText('FRESH BODY • CLEAN HAIR', 256, 435);

    // --- BACK SIDE (Centered at X = 768) ---
    // Section: Directions
    ctx.fillStyle = '#D2F53C';
    ctx.font = '700 20px "Outfit", sans-serif';
    ctx.fillText('DIRECTIONS', 768, 60);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '500 14px "Inter", sans-serif';
    ctx.fillText('Apply to wet hair, massage into a rich lather,', 768, 90);
    ctx.fillText('and rinse thoroughly. Repeat if desired.', 768, 110);

    // Section: Ingredients
    ctx.fillStyle = '#D2F53C';
    ctx.font = '700 20px "Outfit", sans-serif';
    ctx.fillText('INGREDIENTS', 768, 160);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.font = '400 12px "Inter", sans-serif';
    ctx.fillText('Aqua, Cocamidopropyl Betaine, Sodium Cocoyl Isethionate, Glycerin,', 768, 190);
    ctx.fillText('Melaleuca Alternifolia (Tea Tree) Leaf Oil, Mentha Piperita (Peppermint) Oil,', 768, 210);
    ctx.fillText('Aloe Barbadensis Leaf Juice, Citric Acid, Tocopheryl Acetate, Limonene,', 768, 230);
    ctx.fillText('Linalool, Potassium Sorbate, Sodium Benzoate, Organic Essential Oils.', 768, 250);

    // Section: Caution
    ctx.fillStyle = '#D2F53C';
    ctx.font = '700 20px "Outfit", sans-serif';
    ctx.fillText('WARNINGS & CAUTION', 768, 300);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '500 13px "Inter", sans-serif';
    ctx.fillText('For external use only. Avoid contact with eyes.', 768, 325);
    ctx.fillText('If contact occurs, rinse thoroughly with water.', 768, 345);

    // Bottle capacity / Details
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 16px "Outfit", sans-serif';
    ctx.fillText('250ml 8.4 fl. oz. e', 768, 395);

    // Draw Barcode Card
    ctx.fillStyle = '#FFFFFF';
    // Center of barcode card is X=768. Width is 140, height is 45.
    ctx.fillRect(768 - 70, 420, 140, 45);
    
    // Draw Barcode Stripes
    ctx.fillStyle = '#000000';
    let barX = 768 - 62;
    const barPattern = [2, 1, 3, 1, 4, 2, 1, 3, 2, 2, 1, 4, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2];
    for (let i = 0; i < barPattern.length; i++) {
      const width = barPattern[i];
      if (i % 2 === 0) {
        ctx.fillRect(barX, 425, width * 2, 35);
      }
      barX += width * 2 + 1;
    }

    const labelTex = new THREE.CanvasTexture(labelCanvas);
    labelTex.colorSpace = THREE.SRGBColorSpace;
    
    // Label mesh (a cylinder wrapper just barely larger than the bottle body to prevent z-fighting)
    // Bottle radius is 1.18, so we set label radius to 1.186
    const labelGeom = new THREE.CylinderGeometry(1.186, 1.186, 2.3, 64, 1, true);
    const labelMat = new THREE.MeshPhysicalMaterial({
      map: labelTex,
      transparent: true,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
    });
    const labelMesh = new THREE.Mesh(labelGeom, labelMat);
    labelMesh.position.y = -0.3; // position on cylindrical section
    // In Three.js, Cylinder map wraps from the back, meaning center of canvas (512, Y) is at front (+Z direction)
    labelMesh.rotation.y = Math.PI / 2; 
    bottleGroup.add(labelMesh);

    // 3. Pump Mechanism
    // A. Pump Collar (base ring below nozzle)
    const collarGeom = new THREE.CylinderGeometry(0.44, 0.44, 0.22, 32);
    const collarMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.8, // Chrome/Metallic finish
      clearcoat: 0.5,
    });
    const collarMesh = new THREE.Mesh(collarGeom, collarMat);
    collarMesh.position.y = 2.18;
    bottleGroup.add(collarMesh);

    // B. Pump Stem (thin post)
    const stemGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.35, 16);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      roughness: 0.2,
    });
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    stemMesh.position.y = 2.45;
    bottleGroup.add(stemMesh);

    // C. Pump Head (actuator)
    const headGroup = new THREE.Group();
    headGroup.position.y = 2.75;
    
    // Actuator top cap
    const capGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.3, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
    });
    const capMesh = new THREE.Mesh(capGeom, capMat);
    headGroup.add(capMesh);

    // Actuator nozzle (spout) extending outwards
    const spoutPoints = [];
    spoutPoints.push(new THREE.Vector3(0, 0, 0));
    spoutPoints.push(new THREE.Vector3(0, 0, 0.6)); // extends forward
    const spoutGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(spoutPoints),
      20,
      0.14,
      16,
      false
    );
    const spoutMesh = new THREE.Mesh(spoutGeom, capMat);
    spoutMesh.position.set(0, 0.05, 0.1);
    headGroup.add(spoutMesh);
    
    bottleGroup.add(headGroup);

    // Adjust bottle orientation so the label faces the camera initially, tilted slightly
    bottleGroup.rotation.set(0.15, 0.5, 0.05);

    // --- Floating Bubbles Decor in 3D Scene ---
    const bubblesGroup = new THREE.Group();
    scene.add(bubblesGroup);
    
    const bubbles = [];
    const bubbleGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      transmission: 0.9, // glass-like bubble
      ior: 1.1,
    });

    for (let i = 0; i < 28; i++) {
      const mesh = new THREE.Mesh(bubbleGeom, bubbleMat);
      
      // Random scale for variety
      const scale = 0.5 + Math.random() * 1.5;
      mesh.scale.set(scale, scale, scale);
      
      // Position around the bottle
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 2.5;
      const x = Math.cos(theta) * radius;
      const y = -2.5 + Math.random() * 5.0;
      const z = -2.0 + Math.random() * 4.0;
      mesh.position.set(x, y, z);
      
      // Custom velocity and float speed properties
      bubbles.push({
        mesh,
        speedY: 0.005 + Math.random() * 0.01,
        angleSpeed: 0.008 + Math.random() * 0.01,
        angle: Math.random() * Math.PI * 2,
        radius: radius,
        centerX: x,
        centerZ: z,
        baseY: y,
      });
      
      bubblesGroup.add(mesh);
    }

    // --- Interactive Rotation Logic (Mouse Drag & Touch Swipe) ---
    let targetRotationX = 0.15;
    let targetRotationY = 0.5;
    
    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let rotStartX = 0;
    let rotStartY = 0;
    
    // Parallax variables (subtle reaction to mouse move across the screen)
    let screenMouseX = 0;
    let screenMouseY = 0;

    const handlePointerDown = (clientX, clientY) => {
      isPointerDown = true;
      setIsDragging(true);
      pointerStartX = clientX;
      pointerStartY = clientY;
      rotStartX = targetRotationY;
      rotStartY = targetRotationX;
    };

    const handlePointerMove = (clientX, clientY) => {
      if (isPointerDown) {
        // Drag calculation
        const deltaX = clientX - pointerStartX;
        const deltaY = clientY - pointerStartY;
        // Sensitivity multipliers
        targetRotationY = rotStartX + deltaX * 0.007;
        targetRotationX = Math.max(-0.6, Math.min(0.6, rotStartY + deltaY * 0.007)); // constrain vertical tilt
      }
      
      // Update screen-wide coordinates for parallax (normalized -1 to 1)
      screenMouseX = (clientX / window.innerWidth) * 2 - 1;
      screenMouseY = -(clientY / window.innerHeight) * 2 + 1;
    };

    const handlePointerUp = () => {
      isPointerDown = false;
      setIsDragging(false);
    };

    // Desktop Mouse Events
    const onMouseDown = (e) => {
      handlePointerDown(e.clientX, e.clientY);
    };

    const onMouseMove = (e) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    // Touch Events
    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Global listeners for mouse up so the grab releases when cursor leaves canvas
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    // Attach local drag triggers to canvas container
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);

    // Track mouse coordinates outside drag for parallax
    const onGlobalMouseMove = (e) => {
      if (!isPointerDown) {
        screenMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        screenMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      }
    };
    window.addEventListener('mousemove', onGlobalMouseMove);

    // --- Animation Loop ---
    let time = 0;
    let reqId;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      time += 0.01;

      // 1. Idle Rotations & Parallax
      if (!isPointerDown) {
        // Slow continuous spin when not interacting
        targetRotationY += 0.003;
        
        // Add subtle parallax offset based on cursor position
        specularLight.position.x = screenMouseX * 4;
        specularLight.position.y = 2 + screenMouseY * 2;
      }

      // Smoothly interpolate rotation (Dampening / Inertia)
      bottleGroup.rotation.y += (targetRotationY - bottleGroup.rotation.y) * 0.08;
      bottleGroup.rotation.x += (targetRotationX - bottleGroup.rotation.x) * 0.08;

      // Gentle floating animation (sine wave)
      const floatOffsetY = Math.sin(time * 1.5) * 0.12;
      bottleGroup.position.y = floatOffsetY;

      // 2. Animate Background Bubbles
      bubbles.forEach((b) => {
        b.angle += b.angleSpeed;
        b.mesh.position.y += b.speedY;
        
        // Circular orbit
        b.mesh.position.x = b.centerX + Math.cos(b.angle) * 0.35;
        b.mesh.position.z = b.centerZ + Math.sin(b.angle) * 0.35;

        // Reset bubble when it floats too high
        if (b.mesh.position.y > 3.0) {
          b.mesh.position.y = -3.0;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('mousemove', onGlobalMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (container) {
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('touchstart', onTouchStart);
        container.removeEventListener('touchmove', onTouchMove);
      }
      
      // Dispose Geometries/Materials/Textures to prevent memory leaks
      bodyGeom.dispose();
      bodyMat.dispose();
      labelTex.dispose();
      labelGeom.dispose();
      labelMat.dispose();
      collarGeom.dispose();
      collarMat.dispose();
      stemGeom.dispose();
      stemMat.dispose();
      capGeom.dispose();
      capMat.dispose();
      spoutGeom.dispose();
      bubbleGeom.dispose();
      bubbleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      
      <div className="interactive-hint" style={{ opacity: isDragging ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        <div className="hint-dot"></div>
        <span>{isHovered ? 'Drag to rotate 3D' : 'Swipe / Drag to Spin'}</span>
      </div>
    </div>
  );
};

export default Bottle3D;
