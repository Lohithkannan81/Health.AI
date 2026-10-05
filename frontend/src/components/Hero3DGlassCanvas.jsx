import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Hero3DGlassCanvas({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 650;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    // 2. WebGL Renderer with High Precision Physical Lighting
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Main 3D Floating Glass Structure Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Primary Geometry: Smooth Refractive Polyhedron Glass Orb
    const glassGeo = new THREE.IcosahedronGeometry(3.3, 3);
    
    // Hyper-realistic MeshPhysicalMaterial (Glass Refraction + Dispersion Sheen)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,       // Glass optical clarity
      opacity: 1.0,
      transparent: true,
      roughness: 0.06,
      metalness: 0.05,
      ior: 1.52,                 // Glass index of refraction
      thickness: 2.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
      sheen: 1.0,
      sheenColor: new THREE.Color(0x818cf8), // Soft violet sheen
      attenuationColor: new THREE.Color(0x38bdf8), // Cyan light tint inside glass
      attenuationDistance: 3.5
    });

    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    mainGroup.add(glassMesh);

    // Outer Crisp Glass Specular Wireframe Matrix
    const wireGeo = new THREE.IcosahedronGeometry(3.32, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // Inner Volumetric Glowing Neural Core
    const coreGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 2.0,
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Orbiting Translucent Glass Torus Rings
    const ringGeo1 = new THREE.TorusGeometry(5.4, 0.09, 16, 100);
    const ringMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.92,
      opacity: 0.85,
      transparent: true,
      roughness: 0.08,
      metalness: 0.1,
      ior: 1.45,
      clearcoat: 0.9
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    mainGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(6.6, 0.06, 16, 100);
    const ringMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xc084fc,
      transmission: 0.9,
      opacity: 0.7,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 3.5;
    ringMesh2.rotation.y = -Math.PI / 4;
    mainGroup.add(ringMesh2);

    // Floating Crystal Octahedrons around Main Core
    const crystalsGroup = new THREE.Group();
    const crystalGeo = new THREE.OctahedronGeometry(0.42, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      roughness: 0.08,
      ior: 1.5,
      thickness: 1.2,
      clearcoat: 1.0
    });

    const crystalPositions = [
      { x: -4.8, y: 3.5, z: 1.5 },
      { x: 5.2, y: -2.8, z: 2.0 },
      { x: 3.8, y: 4.2, z: -2.2 },
      { x: -4.2, y: -3.8, z: 2.5 },
      { x: 0.0, y: 5.6, z: -1.8 },
      { x: 4.5, y: -4.5, z: -1.0 },
    ];

    crystalPositions.forEach((pos) => {
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.position.set(pos.x, pos.y, pos.z);
      crystal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      crystalsGroup.add(crystal);
    });
    scene.add(crystalsGroup);

    // 4. Ambient Orbital Particle Field
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);
    const indigoColor = new THREE.Color(0x818cf8);
    const violetColor = new THREE.Color(0xc084fc);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5.2 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      const pColor = r < 0.4 ? cyanColor : r < 0.75 ? indigoColor : violetColor;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x070a14, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x06b6d4, 9, 45);
    keyLight.position.set(9, 9, 12);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xa855f7, 10, 45);
    rimLight.position.set(-11, -7, -9);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.6);
    fillLight.position.set(0, 12, 14);
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
      targetX = (x / rect.width) * 0.75;
      targetY = (y / rect.height) * 0.75;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth cursor position interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate glass object
      mainGroup.rotation.y = elapsedTime * 0.35 + mouseX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2 + mouseY;
      mainGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.12;

      // Rotate glass rings
      ringMesh1.rotation.z = elapsedTime * 0.45;
      ringMesh2.rotation.z = -elapsedTime * 0.35;

      // Float crystals
      crystalsGroup.children.forEach((crystal, idx) => {
        crystal.rotation.x += 0.012 * (idx + 1);
        crystal.rotation.y += 0.018 * (idx + 1);
        crystal.position.y += Math.sin(elapsedTime * 1.6 + idx) * 0.0035;
      });

      // Core pulse
      const pulse = 1.0 + Math.sin(elapsedTime * 2.2) * 0.07;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Rotate particle cloud
      particles.rotation.y = -elapsedTime * 0.12;
      particles.rotation.x = elapsedTime * 0.06;

      renderer.render(scene, camera);
    };

    animate();

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
      glassGeo.dispose();
      glassMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
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
    <div className={`relative w-full h-full min-h-[500px] lg:min-h-[620px] flex items-center justify-center ${className}`}>
      {/* Soft Ambient Radial Lights behind 3D Object */}
      <div className="absolute w-[380px] h-[380px] rounded-full bg-cyan-500/20 blur-[110px] animate-pulse pointer-events-none" />
      <div className="absolute w-[340px] h-[340px] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none translate-x-12 translate-y-12" />

      {/* WebGL Canvas Mounting Node */}
      <div ref={mountRef} className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
