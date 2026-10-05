import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeInteractiveShowcaseCanvas({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 650;
    const height = container.clientHeight || 500;

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

    // Main Showcase 3D Platform Group
    const showcaseGroup = new THREE.Group();
    scene.add(showcaseGroup);

    // Center 3D Spatial Dashboard Panel (3D Box Object)
    const panelGeo = new THREE.BoxGeometry(6.5, 4.0, 0.25);
    const panelMat = new THREE.MeshPhysicalMaterial({
      color: 0x111112,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
      transmission: 0.3,
      transparent: true,
      opacity: 0.92
    });
    const panelMesh = new THREE.Mesh(panelGeo, panelMat);
    showcaseGroup.add(panelMesh);

    // Glowing Specular Amber Edge Frame
    const frameGeo = new THREE.BoxGeometry(6.54, 4.04, 0.26);
    const frameMat = new THREE.MeshBasicMaterial({
      color: 0xf6a80d,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    showcaseGroup.add(frameMesh);

    // Floating 3D Data Bars on top of panel
    const barCount = 7;
    const barsGroup = new THREE.Group();
    const barGeo = new THREE.BoxGeometry(0.35, 1.8, 0.35);
    const barMat = new THREE.MeshStandardMaterial({
      color: 0x171718,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xf6a80d,
      emissiveIntensity: 0.3
    });

    for (let i = 0; i < barCount; i++) {
      const bar = new THREE.Mesh(barGeo, barMat);
      const x = -2.2 + i * 0.75;
      const h = 0.8 + Math.sin(i * 0.8) * 0.8;
      bar.scale.set(1, h, 1);
      bar.position.set(x, -0.6 + h * 0.4, 0.4);
      barsGroup.add(bar);
    }
    showcaseGroup.add(barsGroup);

    // Floating Interactive 3D Node Crystal
    const nodeGeo = new THREE.OctahedronGeometry(0.8, 0);
    const nodeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      roughness: 0.1,
      ior: 1.5,
      clearcoat: 1.0,
      emissive: 0xae3a13,
      emissiveIntensity: 0.4
    });
    const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
    nodeMesh.position.set(2.0, 0.8, 0.8);
    showcaseGroup.add(nodeMesh);

    // Orbiting Vector Ring
    const ringGeo = new THREE.TorusGeometry(3.6, 0.04, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf6a80d,
      transparent: true,
      opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.5;
    showcaseGroup.add(ringMesh);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0x050505, 2.2);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xf6a80d, 8, 30);
    amberLight.position.set(6, 6, 8);
    scene.add(amberLight);

    const copperLight = new THREE.PointLight(0xae3a13, 6, 30);
    copperLight.position.set(-6, -6, -6);
    scene.add(copperLight);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      showcaseGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.2;
      showcaseGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.1;

      nodeMesh.rotation.x += 0.015;
      nodeMesh.rotation.y += 0.02;

      ringMesh.rotation.z = elapsedTime * 0.3;

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
      panelGeo.dispose();
      panelMat.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      barGeo.dispose();
      barMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[440px] flex items-center justify-center ${className}`}>
      <div className="absolute w-[320px] h-[320px] rounded-full bg-[#F6A80D]/10 blur-[100px] pointer-events-none" />
      <div ref={mountRef} className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
