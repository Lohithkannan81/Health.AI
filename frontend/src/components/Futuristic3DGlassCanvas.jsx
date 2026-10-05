import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Futuristic3DGlassCanvas({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    // 2. WebGL Renderer with High Precision & Shadow Map
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Create Complex 3D Glass Object (Icosahedron / Liquid Glass Prism)
    const glassGroup = new THREE.Group();
    scene.add(glassGroup);

    // Main Glass Geometry: Smooth icosahedron with bevel details
    const mainGeometry = new THREE.IcosahedronGeometry(3.2, 3);
    
    // Hyper-realistic Glass Material (MeshPhysicalMaterial with high transmission & clearcoat)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,       // High transparency for glass refraction
      opacity: 1.0,
      transparent: true,
      roughness: 0.08,          // Smooth shiny surface
      metalness: 0.1,
      ior: 1.52,                 // Glass index of refraction
      thickness: 2.5,            // Refraction depth
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
      sheen: 1.0,
      sheenColor: new THREE.Color(0x818cf8), // Soft violet sheen
      attenuationColor: new THREE.Color(0x06b6d4), // Cyan light absorption inside glass
      attenuationDistance: 4.0
    });

    const mainGlassMesh = new THREE.Mesh(mainGeometry, glassMaterial);
    glassGroup.add(mainGlassMesh);

    // Wireframe Specular Edge Mesh (Gives crisp floating 3D glass geometry lines)
    const wireframeGeo = new THREE.IcosahedronGeometry(3.22, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    glassGroup.add(wireframeMesh);

    // Inner Glowing Core (Volumetric Light Orb inside glass object)
    const coreGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    glassGroup.add(coreMesh);

    // 4. Orbiting Translucent Glass Rings & Floating Crystals
    const ringGeo1 = new THREE.TorusGeometry(5.2, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.9,
      opacity: 0.8,
      transparent: true,
      roughness: 0.1,
      metalness: 0.2,
      ior: 1.4,
      clearcoat: 0.8
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    glassGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(6.4, 0.05, 16, 100);
    const ringMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      transmission: 0.9,
      opacity: 0.6,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = -Math.PI / 4;
    glassGroup.add(ringMesh2);

    // Small floating glass crystals around main orb
    const crystalGroup = new THREE.Group();
    const crystalGeo = new THREE.OctahedronGeometry(0.4, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      roughness: 0.1,
      ior: 1.5,
      thickness: 1.0,
      clearcoat: 0.9
    });

    const crystalPositions = [
      { x: -4.5, y: 3.2, z: 1.2 },
      { x: 4.8, y: -2.5, z: 1.8 },
      { x: 3.5, y: 3.8, z: -2.0 },
      { x: -3.8, y: -3.5, z: 2.2 },
      { x: 0.0, y: 5.2, z: -1.5 },
    ];

    crystalPositions.forEach(pos => {
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.set(pos.x, pos.y, pos.z);
      crystal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      crystalGroup.add(crystal);
    });
    scene.add(crystalGroup);

    // 5. Orbital Ambient Light Particles
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);
    const indigoColor = new THREE.Color(0x818cf8);
    const violetColor = new THREE.Color(0xc084fc);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5.0 + Math.random() * 6.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const rand = Math.random();
      const pColor = rand < 0.4 ? cyanColor : rand < 0.7 ? indigoColor : violetColor;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. High-End Studio Lighting (Cinematic light sources)
    const ambientLight = new THREE.AmbientLight(0x0a0e1a, 2.0);
    scene.add(ambientLight);

    // Key Light (Electric Cyan)
    const keyLight = new THREE.PointLight(0x06b6d4, 8, 40);
    keyLight.position.set(8, 8, 10);
    scene.add(keyLight);

    // Rim Light (Violet / Indigo back light)
    const rimLight = new THREE.PointLight(0xa855f7, 9, 40);
    rimLight.position.set(-10, -6, -8);
    scene.add(rimLight);

    // Accent Light (Soft White Refraction Highlight)
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fillLight.position.set(0, 10, 12);
    scene.add(fillLight);

    // 7. Interactive Parallax & Animation Loop
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 0.8;
      targetY = (y / rect.height) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse movement interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Slow 3D rotations for main glass object
      glassGroup.rotation.y = elapsedTime * 0.35 + mouseX;
      glassGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2 + mouseY;
      glassGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.15;

      // Rotate glass rings in opposing axes
      ringMesh1.rotation.z = elapsedTime * 0.4;
      ringMesh2.rotation.z = -elapsedTime * 0.3;

      // Floating crystal movement
      crystalGroup.children.forEach((crystal, idx) => {
        crystal.rotation.x += 0.01 * (idx + 1);
        crystal.rotation.y += 0.015 * (idx + 1);
        crystal.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.003;
      });

      // Core pulse (breathing volumetric light effect)
      const pulse = 1.0 + Math.sin(elapsedTime * 2.0) * 0.06;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Rotate particle field
      particles.rotation.y = -elapsedTime * 0.1;
      particles.rotation.x = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      mainGeometry.dispose();
      glassMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[480px] lg:min-h-[580px] flex items-center justify-center ${className}`}>
      {/* Background Volumetric Atmospheric Glows behind 3D Glass Object */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-cyan-500/20 blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute w-[320px] h-[320px] rounded-full bg-indigo-500/20 blur-[110px] pointer-events-none translate-x-10 translate-y-10" />
      <div className="absolute w-[280px] h-[280px] rounded-full bg-purple-500/20 blur-[100px] pointer-events-none -translate-x-12 -translate-y-12" />

      {/* WebGL Canvas Mounting Node */}
      <div ref={mountRef} className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
