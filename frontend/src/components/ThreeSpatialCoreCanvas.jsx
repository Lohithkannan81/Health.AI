import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeSpatialCoreCanvas({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 650;
    const height = container.clientHeight || 650;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    // 2. WebGL Renderer with ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Main 3D DNA Helix Master Group
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // --- MATERIALS (Matching exact 3D DNA reference image) ---
    
    // Main Glass Transmission Helix Strand Material (Metallic Royal Blue + Magenta Sheen)
    const strandMat = new THREE.MeshPhysicalMaterial({
      color: 0x0066ff,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.35,
      transmission: 0.85,
      opacity: 0.95,
      transparent: true,
      roughness: 0.1,
      metalness: 0.4,
      ior: 1.52,
      thickness: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xd946ef) // Magenta rim sheen
    });

    // Base Pair Rung Materials (Cyan, Magenta, White, Purple)
    const cyanRungMat = new THREE.MeshPhysicalMaterial({
      color: 0x0066ff,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.4,
      metalness: 0.3,
      roughness: 0.2,
      clearcoat: 0.8
    });

    const magentaRungMat = new THREE.MeshPhysicalMaterial({
      color: 0xd946ef,
      emissive: 0xa855f7,
      emissiveIntensity: 0.4,
      metalness: 0.3,
      roughness: 0.2,
      clearcoat: 0.8
    });

    const whiteRungMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xe2e8f0,
      emissiveIntensity: 0.3,
      metalness: 0.5,
      roughness: 0.1,
      clearcoat: 1.0
    });

    const purpleRungMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x6366f1,
      emissiveIntensity: 0.4,
      metalness: 0.3,
      roughness: 0.2,
      clearcoat: 0.8
    });

    // Chrome Sphere Material for Atomic Nodes & Joints
    const chromeNodeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.05,
      clearcoat: 1.0,
      reflectivity: 0.98
    });

    // Molecular Spheres Material (Metallic Iridescent Sapphire & Magenta)
    const moleculeMat = new THREE.MeshPhysicalMaterial({
      color: 0x0066ff,
      emissive: 0x6366f1,
      emissiveIntensity: 0.3,
      metalness: 0.85,
      roughness: 0.12,
      clearcoat: 1.0,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xd946ef)
    });

    // --- 4. GENERATE 3D DOUBLE HELIX GEOMETRY ---

    const helixRadius = 2.4;
    const helixHeight = 13.0;
    const turns = 2.2;
    const totalPoints = 120;

    const pointsStrand1 = [];
    const pointsStrand2 = [];
    const rungData = [];

    const numRungs = 22;

    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * turns * Math.PI * 2;
      const y = (t - 0.5) * helixHeight;

      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;

      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;

      pointsStrand1.push(new THREE.Vector3(x1, y, z1));
      pointsStrand2.push(new THREE.Vector3(x2, y, z2));
    }

    // Create 3D Tube Geometries for the 2 Helix Backbones
    const curveStrand1 = new THREE.CatmullRomCurve3(pointsStrand1);
    const curveStrand2 = new THREE.CatmullRomCurve3(pointsStrand2);

    const tubeGeo1 = new THREE.TubeGeometry(curveStrand1, 100, 0.38, 24, false);
    const tubeGeo2 = new THREE.TubeGeometry(curveStrand2, 100, 0.38, 24, false);

    const tubeMesh1 = new THREE.Mesh(tubeGeo1, strandMat);
    const tubeMesh2 = new THREE.Mesh(tubeGeo2, strandMat);

    dnaGroup.add(tubeMesh1);
    dnaGroup.add(tubeMesh2);

    // --- 5. GENERATE BASE PAIR RUNGS (HORIZONTAL CONNECTORS) ---
    const rungsGroup = new THREE.Group();

    for (let i = 0; i < numRungs; i++) {
      const t = (i + 0.5) / numRungs;
      const p1 = curveStrand1.getPointAt(t);
      const p2 = curveStrand2.getPointAt(t);

      // Distance and midpoint between strand 1 and strand 2
      const dist = p1.distanceTo(p2);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

      // Create a 2-segment capsule rung (Half A and Half B)
      const halfLength = (dist - 0.7) / 2;
      const rungGeo = new THREE.CylinderGeometry(0.18, 0.18, halfLength, 16);
      rungGeo.rotateX(Math.PI / 2); // Orient cylinder along Z

      // Alternating base-pair colors
      const pairType = i % 3;
      let matA, matB;
      if (pairType === 0) {
        matA = cyanRungMat;
        matB = whiteRungMat;
      } else if (pairType === 1) {
        matA = magentaRungMat;
        matB = purpleRungMat;
      } else {
        matA = cyanRungMat;
        matB = magentaRungMat;
      }

      // Rung Segment A
      const meshA = new THREE.Mesh(rungGeo, matA);
      // Rung Segment B
      const meshB = new THREE.Mesh(rungGeo, matB);

      // Position & orient rungs toward p2
      const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
      const orientation = new THREE.Matrix4();
      orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));

      const posA = new THREE.Vector3().addVectors(p1, direction.clone().multiplyScalar(halfLength / 2 + 0.35));
      const posB = new THREE.Vector3().addVectors(p2, direction.clone().multiplyScalar(-(halfLength / 2 + 0.35)));

      meshA.position.copy(posA);
      meshA.quaternion.setFromRotationMatrix(orientation);

      meshB.position.copy(posB);
      meshB.quaternion.setFromRotationMatrix(orientation);

      rungsGroup.add(meshA);
      rungsGroup.add(meshB);

      // Connecting Chrome Joint Spheres at ends of rungs
      const jointGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const joint1 = new THREE.Mesh(jointGeo, chromeNodeMat);
      const joint2 = new THREE.Mesh(jointGeo, chromeNodeMat);
      joint1.position.copy(p1);
      joint2.position.copy(p2);
      rungsGroup.add(joint1);
      rungsGroup.add(joint2);
    }

    dnaGroup.add(rungsGroup);

    // --- 6. FLOATING MOLECULAR CLUSTERS & ATOMIC SPHERES (Matching Reference Image 2) ---
    const moleculesGroup = new THREE.Group();

    // Helper to create a 3-node connected atomic molecule cluster
    const createMoleculeCluster = (centerPos, scale = 1.0) => {
      const cluster = new THREE.Group();
      cluster.position.copy(centerPos);
      cluster.scale.set(scale, scale, scale);

      const r = 0.55;
      const positions = [
        new THREE.Vector3(0, r, 0),
        new THREE.Vector3(-r * 0.86, -r * 0.5, 0),
        new THREE.Vector3(r * 0.86, -r * 0.5, 0)
      ];

      const sGeo = new THREE.SphereGeometry(0.38, 32, 32);
      const bGeo = new THREE.CylinderGeometry(0.08, 0.08, r * 1.5, 16);

      positions.forEach((pos, idx) => {
        const sMesh = new THREE.Mesh(sGeo, moleculeMat);
        sMesh.position.copy(pos);
        cluster.add(sMesh);

        // Bond to next node
        const nextPos = positions[(idx + 1) % 3];
        const bondMid = new THREE.Vector3().addVectors(pos, nextPos).multiplyScalar(0.5);
        const bondMesh = new THREE.Mesh(bGeo, chromeNodeMat);
        bondMesh.position.copy(bondMid);
        bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(nextPos, pos).normalize());
        cluster.add(bondMesh);
      });

      return cluster;
    };

    // Add 4 Molecular Clusters floating around DNA
    moleculesGroup.add(createMoleculeCluster(new THREE.Vector3(-3.8, 2.5, 1.2), 0.95));
    moleculesGroup.add(createMoleculeCluster(new THREE.Vector3(3.6, -2.8, -1.0), 0.85));
    moleculesGroup.add(createMoleculeCluster(new THREE.Vector3(-3.2, -4.2, 1.5), 0.75));
    moleculesGroup.add(createMoleculeCluster(new THREE.Vector3(3.8, 3.8, -1.2), 0.9));

    // Independent Orbiting Metallic Atoms / Spheres
    const atomGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const atomPositions = [
      new THREE.Vector3(-2.8, 4.8, -1.5),
      new THREE.Vector3(3.2, 1.2, 2.2),
      new THREE.Vector3(-3.9, -0.8, -2.0),
      new THREE.Vector3(2.5, -5.2, 1.8),
      new THREE.Vector3(-1.8, -5.8, -1.2),
      new THREE.Vector3(1.9, 5.5, 1.4),
      new THREE.Vector3(-4.2, 0.5, 2.0),
      new THREE.Vector3(4.0, -1.2, -2.2)
    ];

    atomPositions.forEach((p) => {
      const atomMesh = new THREE.Mesh(atomGeo, moleculeMat);
      atomMesh.position.copy(p);
      moleculesGroup.add(atomMesh);
    });

    dnaGroup.add(moleculesGroup);

    // --- 7. ORBITING METALLIC ELECTRON RINGS ENCIRCLING THE DNA HELIX ---
    const ringGeo1 = new THREE.TorusGeometry(4.8, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x0066ff,
      transmission: 0.85,
      opacity: 0.8,
      transparent: true,
      roughness: 0.1,
      metalness: 0.4
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    dnaGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(5.8, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xd946ef,
      transmission: 0.85,
      opacity: 0.7,
      transparent: true,
      roughness: 0.1
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 3.5;
    ringMesh2.rotation.y = -Math.PI / 4;
    dnaGroup.add(ringMesh2);

    // --- 8. FLOATING MOLECULAR DUST PARTICLES ---
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array(particleCount * 3);
    const colArr = new Float32Array(particleCount * 3);

    const blueColor = new THREE.Color(0x0066ff);
    const cyanColor = new THREE.Color(0x0ea5e9);
    const magentaColor = new THREE.Color(0xd946ef);

    for (let i = 0; i < particleCount; i++) {
      const radius = 4.2 + Math.random() * 5.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArr[i * 3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      const pColor = r < 0.45 ? blueColor : r < 0.75 ? magentaColor : cyanColor;
      colArr[i * 3] = pColor.r;
      colArr[i * 3 + 1] = pColor.b;
      colArr[i * 3 + 2] = pColor.g;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 9. STUDIO LIGHTING SETUP ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    // Key Light (Royal Blue Spotlight)
    const keyLight = new THREE.PointLight(0x0066ff, 12, 50);
    keyLight.position.set(8, 8, 14);
    scene.add(keyLight);

    // Magenta Specular Rim Light
    const magentaRimLight = new THREE.PointLight(0xd946ef, 10, 45);
    magentaRimLight.position.set(-10, 6, -8);
    scene.add(magentaRimLight);

    // Cyan Fill Light
    const cyanFillLight = new THREE.PointLight(0x0ea5e9, 8, 45);
    cyanFillLight.position.set(6, -8, 8);
    scene.add(cyanFillLight);

    const mainDirectionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainDirectionalLight.position.set(0, 10, 14);
    scene.add(mainDirectionalLight);

    // Slight initial tilt for double helix presentation
    dnaGroup.rotation.z = -0.18;
    dnaGroup.scale.set(0.92, 0.92, 0.92);

    // --- 10. INTERACTIVE MOUSE PARALLAX & ROTATION ANIMATION LOOP ---
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 0.65;
      targetY = (y / rect.height) * 0.65;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse easing
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Continuous smooth 3D rotation of the DNA Double Helix around vertical Y-axis
      dnaGroup.rotation.y = elapsedTime * 0.45 + mouseX;
      dnaGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.12 + mouseY;

      // Rotate thin orbital rings
      ringMesh1.rotation.z = elapsedTime * 0.35;
      ringMesh2.rotation.z = -elapsedTime * 0.25;

      // Rotate particle cloud slowly
      particles.rotation.y = -elapsedTime * 0.08;

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
      tubeGeo1.dispose();
      tubeGeo2.dispose();
      strandMat.dispose();
      cyanRungMat.dispose();
      magentaRungMat.dispose();
      whiteRungMat.dispose();
      purpleRungMat.dispose();
      chromeNodeMat.dispose();
      moleculeMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[520px] lg:min-h-[640px] flex items-center justify-center ${className}`}>
      {/* Soft Ambient Light Glow Spheres behind 3D DNA Double Helix */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-[#0066FF]/10 blur-[130px] pointer-events-none" />
      <div className="absolute w-[360px] h-[360px] rounded-full bg-[#D946EF]/12 blur-[140px] pointer-events-none translate-x-12 translate-y-12" />

      {/* WebGL Canvas Mounting Node */}
      <div ref={mountRef} className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
