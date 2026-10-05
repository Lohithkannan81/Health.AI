import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Statement3DCanvas({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group for complex interconnected glass geometry sculpture
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // TorusKnot Glass Sculpture
    const knotGeo = new THREE.TorusKnotGeometry(2.6, 0.7, 120, 16);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 1.0,
      transparent: true,
      roughness: 0.08,
      metalness: 0.1,
      ior: 1.55,
      thickness: 2.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xc084fc),
      attenuationColor: new THREE.Color(0x38bdf8),
      attenuationDistance: 3.0
    });

    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    sculptureGroup.add(knotMesh);

    // Inner Glowing Core Wireframe
    const wireGeo = new THREE.TorusKnotGeometry(2.62, 0.71, 60, 8);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sculptureGroup.add(wireMesh);

    // Orbiting Floating Glass Orbs
    const orbCount = 6;
    const orbGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.9,
      roughness: 0.1,
      clearcoat: 1.0
    });

    const orbGroup = new THREE.Group();
    for (let i = 0; i < orbCount; i++) {
      const orb = new THREE.Mesh(orbGeo, orbMat);
      const angle = (i / orbCount) * Math.PI * 2;
      orb.position.set(Math.cos(angle) * 4.5, Math.sin(angle) * 2.2, Math.sin(angle) * 3.0);
      orbGroup.add(orb);
    }
    sculptureGroup.add(orbGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 2.0);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 8, 35);
    pointLight1.position.set(6, 8, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xc084fc, 8, 35);
    pointLight2.position.set(-8, -6, -8);
    scene.add(pointLight2);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      sculptureGroup.rotation.y = elapsedTime * 0.3;
      sculptureGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.25;

      orbGroup.rotation.y = -elapsedTime * 0.5;
      orbGroup.rotation.z = elapsedTime * 0.3;

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
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      knotGeo.dispose();
      knotMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[450px] flex items-center justify-center ${className}`}>
      <div className="absolute w-[320px] h-[320px] rounded-full bg-violet-600/15 blur-[100px] pointer-events-none" />
      <div ref={mountRef} className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
