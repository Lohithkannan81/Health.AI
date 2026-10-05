import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Heart3DCanvas({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear container and append canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Create 3D Heart Geometry (Using THREE.ExtrudeGeometry on a Heart Shape Path)
    const heartShape = new THREE.Shape();
    
    // Precise anatomical-like smooth heart curve
    const x = 0, y = 0;
    heartShape.moveTo(x + 0, y + 0.9);
    heartShape.bezierCurveTo(x + 0, y + 0.9, x - 0.7, y + 2.5, x - 2.0, y + 2.5);
    heartShape.bezierCurveTo(x - 3.8, y + 2.5, x - 3.8, y + 0.2, x - 3.8, y + 0.2);
    heartShape.bezierCurveTo(x - 3.8, y - 1.4, x - 2.4, y - 2.8, x + 0, y - 4.2);
    heartShape.bezierCurveTo(x + 2.4, y - 2.8, x + 3.8, y - 1.4, x + 3.8, y + 0.2);
    heartShape.bezierCurveTo(x + 3.8, y + 0.2, x + 3.8, y + 2.5, x + 2.0, y + 2.5);
    heartShape.bezierCurveTo(x + 0.7, y + 2.5, x + 0, y + 0.9, x + 0, y + 0.9);

    const extrudeSettings = {
      depth: 1.2,
      bevelEnabled: true,
      bevelSegments: 16,
      steps: 4,
      bevelSize: 0.6,
      bevelThickness: 0.8
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    // Center geometry around origin
    geometry.center();

    // 3. Materials & Lighting Setup
    // Outer Metallic Crimson Physical Material with Sheen & Clearcoat
    const heartMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xef4444,            // Ruby Red
      emissive: 0x991b1b,         // Deep Heart Glow
      emissiveIntensity: 0.35,
      metalness: 0.3,
      roughness: 0.2,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      sheen: 0.8,
      sheenColor: 0xff8888,
      transparent: true,
      opacity: 0.95
    });

    const heartMesh = new THREE.Mesh(geometry, heartMaterial);
    // Flip Y so heart is right-side up
    heartMesh.rotation.z = Math.PI;
    heartMesh.scale.set(0.95, 0.95, 0.95);

    // Inner Glowing Core Mesh (Gives realistic volumetric depth)
    const coreGeometry = new THREE.ExtrudeGeometry(heartShape, {
      ...extrudeSettings,
      depth: 0.8,
      bevelSize: 0.4,
      bevelThickness: 0.5
    });
    coreGeometry.center();

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0055,
      transparent: true,
      opacity: 0.45,
      wireframe: false
    });

    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMesh.rotation.z = Math.PI;
    coreMesh.scale.set(0.85, 0.85, 0.85);

    // Grouping
    const heartGroup = new THREE.Group();
    heartGroup.add(heartMesh);
    heartGroup.add(coreMesh);
    scene.add(heartGroup);

    // 4. Orbital Particle Field (Cardiac energy grid)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f2fe);
    const blueColor = new THREE.Color(0x0066ff);
    const redColor = new THREE.Color(0xff4d6d);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const choice = Math.random();
      const pColor = choice < 0.4 ? cyanColor : choice < 0.7 ? blueColor : redColor;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Studio Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambientLight);

    // Warm Key Light
    const keyLight = new THREE.PointLight(0xff3366, 4, 30);
    keyLight.position.set(5, 5, 8);
    scene.add(keyLight);

    // Cyan Medical Rim Light
    const rimLightCyan = new THREE.PointLight(0x00f2fe, 4.5, 30);
    rimLightCyan.position.set(-6, 6, -4);
    scene.add(rimLightCyan);

    // Blue Medical Accent Light
    const rimLightBlue = new THREE.PointLight(0x0066ff, 4, 30);
    rimLightBlue.position.set(6, -6, 5);
    scene.add(rimLightBlue);

    // Soft Front Fill Light
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(0, 0, 10);
    scene.add(fillLight);

    // 6. Interactive Parallax & Animation Loop
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 0.6;
      targetY = (y / rect.height) * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse easing
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Slow continuous 3D rotation
      heartGroup.rotation.y = elapsedTime * 0.45 + mouseX;
      heartGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + mouseY;
      heartGroup.rotation.z = Math.cos(elapsedTime * 0.25) * 0.08;

      // Realistic Heartbeat Pulse (~65 BPM = period ~0.92s)
      const pulseCycle = (elapsedTime % 0.92) / 0.92;
      let pulseScale = 1.0;
      if (pulseCycle < 0.15) {
        // Systole contraction 1
        pulseScale = 1.0 + Math.sin((pulseCycle / 0.15) * Math.PI) * 0.08;
      } else if (pulseCycle > 0.2 && pulseCycle < 0.35) {
        // Systole contraction 2 (lub-dub)
        pulseScale = 1.0 + Math.sin(((pulseCycle - 0.2) / 0.15) * Math.PI) * 0.05;
      }

      heartMesh.scale.set(pulseScale, pulseScale, pulseScale);
      coreMesh.scale.set(pulseScale * 0.88, pulseScale * 0.88, pulseScale * 0.88);

      // Rotate particle cloud slowly in opposite direction
      particles.rotation.y = -elapsedTime * 0.15;
      particles.rotation.x = elapsedTime * 0.08;

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      heartMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[420px] flex items-center justify-center ${className}`}>
      {/* Subtle Background Glow Spheres behind 3D Heart */}
      <div className="absolute w-72 h-72 rounded-full bg-red-600/15 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full bg-[#0066ff]/15 blur-3xl pointer-events-none translate-x-12 translate-y-12" />
      
      {/* 3D WebGL Canvas Mounting Node */}
      <div ref={mountRef} className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
