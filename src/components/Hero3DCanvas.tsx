"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Flame, RefreshCw } from "lucide-react";

interface Hero3DCanvasProps {
  className?: string;
}

export default function Hero3DCanvas({ className = "" }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [steamIntensity, setSteamIntensity] = useState<number>(1.2);
  const [flavorBurstCount, setFlavorBurstCount] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const burstCallbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Group for all rotating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffedd5, 0.9);
    scene.add(ambientLight);

    const mainPointLight = new THREE.PointLight(0xf59e0b, 3.5, 12);
    mainPointLight.position.set(0, 2.5, 1.5);
    scene.add(mainPointLight);

    const redAccentLight = new THREE.PointLight(0xef4444, 2.8, 10);
    redAccentLight.position.set(-2.5, -0.5, 2);
    scene.add(redAccentLight);

    const goldenRimLight = new THREE.PointLight(0xfbbf24, 2.2, 10);
    goldenRimLight.position.set(2.5, 1, -2);
    scene.add(goldenRimLight);

    // 1. Artisanal Cauldron / Soup Bowl
    // Custom lathe bowl
    const bowlPoints: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const r = Math.sin(t * Math.PI * 0.5) * 1.5 + 0.15;
      const y = -0.7 + t * 0.95;
      bowlPoints.push(new THREE.Vector2(r, y));
    }
    const bowlGeo = new THREE.LatheGeometry(bowlPoints, 48);
    const bowlMat = new THREE.MeshStandardMaterial({
      color: 0x16161f,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x1a0f05,
      emissiveIntensity: 0.4,
    });
    const bowlMesh = new THREE.Mesh(bowlGeo, bowlMat);
    mainGroup.add(bowlMesh);

    // Glowing Golden Broth Surface inside bowl
    const brothGeo = new THREE.CylinderGeometry(1.58, 1.58, 0.05, 48);
    const brothMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0xb45309,
      emissiveIntensity: 0.9,
      metalness: 0.2,
      roughness: 0.15,
      transparent: true,
      opacity: 0.92,
    });
    const brothMesh = new THREE.Mesh(brothGeo, brothMat);
    brothMesh.position.y = 0.22;
    mainGroup.add(brothMesh);

    // Broth Ripple Ring
    const rippleGeo = new THREE.RingGeometry(0.3, 1.5, 36);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
    rippleMesh.rotation.x = -Math.PI / 2;
    rippleMesh.position.y = 0.26;
    mainGroup.add(rippleMesh);

    // 2. Sculpted 3D Floating Momos
    // Function to create sculpted momo mesh with pleated shape
    const createMomoMesh = (scale = 1) => {
      const momoGroup = new THREE.Group();

      // Base body: deformed sphere with flattened base and tapered top
      const bodyGeo = new THREE.SphereGeometry(0.38 * scale, 32, 24);
      const pos = bodyGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);

        // Flatten bottom
        if (y < 0) {
          y *= 0.55;
        } else {
          // Pinch top towards pleat crest
          const taper = 1.0 - (y / 0.45) * 0.4;
          x *= taper;
          z *= taper;
          // Add subtle pleat grooves along rotation angle
          const angle = Math.atan2(z, x);
          const pleatWave = Math.sin(angle * 12) * 0.035 * (y > 0 ? y : 0);
          x += pleatWave * Math.cos(angle);
          z += pleatWave * Math.sin(angle);
        }
        pos.setXYZ(i, x, y, z);
      }
      bodyGeo.computeVertexNormals();

      const momoMat = new THREE.MeshStandardMaterial({
        color: 0xfff7ed, // Steamed dough ivory
        roughness: 0.38,
        metalness: 0.05,
        emissive: 0xfef08a,
        emissiveIntensity: 0.12,
      });

      const momoBody = new THREE.Mesh(bodyGeo, momoMat);
      momoGroup.add(momoBody);

      // Top pinch knot / crown pleat
      const knotGeo = new THREE.ConeGeometry(0.09 * scale, 0.12 * scale, 12);
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        roughness: 0.5,
      });
      const knot = new THREE.Mesh(knotGeo, knotMat);
      knot.position.y = 0.36 * scale;
      knot.rotation.x = Math.PI;
      momoGroup.add(knot);

      // Chili flake garnish on momo
      const flakeGeo = new THREE.BoxGeometry(0.03 * scale, 0.01 * scale, 0.03 * scale);
      const flakeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      for (let f = 0; f < 4; f++) {
        const flake = new THREE.Mesh(flakeGeo, flakeMat);
        flake.position.set(
          (Math.random() - 0.5) * 0.25 * scale,
          0.3 * scale + Math.random() * 0.05,
          (Math.random() - 0.5) * 0.25 * scale
        );
        flake.rotation.set(Math.random(), Math.random(), Math.random());
        momoGroup.add(flake);
      }

      return momoGroup;
    };

    // Center Hero Momo hovering right above broth
    const centerMomo = createMomoMesh(1.15);
    centerMomo.position.set(0, 0.65, 0);
    mainGroup.add(centerMomo);

    // Surrounding Floating Momos (orbiting subtly)
    const orbitingMomos: { mesh: THREE.Group; orbitRadius: number; angle: number; speed: number; yBase: number }[] = [];
    const momoCount = 4;
    for (let i = 0; i < momoCount; i++) {
      const mesh = createMomoMesh(0.75);
      const angle = (i / momoCount) * Math.PI * 2;
      const orbitRadius = 1.05;
      const yBase = 0.45 + (i % 2) * 0.15;
      mesh.position.set(Math.cos(angle) * orbitRadius, yBase, Math.sin(angle) * orbitRadius);
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = (Math.random() - 0.5) * 0.4;
      mainGroup.add(mesh);
      orbitingMomos.push({
        mesh,
        orbitRadius,
        angle,
        speed: 0.006 + i * 0.002,
        yBase,
      });
    }

    // 3. Steam Ribbons / Particle Cloud
    const steamParticleCount = 280;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamScales = new Float32Array(steamParticleCount);
    const steamSpeeds = new Float32Array(steamParticleCount);
    const steamAngles = new Float32Array(steamParticleCount);

    for (let i = 0; i < steamParticleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.35;
      const y = 0.2 + Math.random() * 3.2;

      steamPositions[i * 3] = Math.cos(angle) * radius;
      steamPositions[i * 3 + 1] = y;
      steamPositions[i * 3 + 2] = Math.sin(angle) * radius;

      steamScales[i] = 12 + Math.random() * 24;
      steamSpeeds[i] = 0.012 + Math.random() * 0.018;
      steamAngles[i] = angle;
    }

    steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));

    // Particle texture canvas
    const createSteamTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255, 240, 215, 0.9)");
        grad.addColorStop(0.35, "rgba(245, 158, 11, 0.35)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(c);
    };

    const steamMat = new THREE.PointsMaterial({
      color: 0xffedd5,
      size: 0.22,
      map: createSteamTexture(),
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    mainGroup.add(steamPoints);

    // 4. Spice & Chili Ember Particles
    const emberCount = 140;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      const r = 0.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const y = -0.2 + Math.random() * 2.8;
      emberPos[i * 3] = Math.cos(theta) * r;
      emberPos[i * 3 + 1] = y;
      emberPos[i * 3 + 2] = Math.sin(theta) * r;

      // Color variation between golden amber and chili red
      if (Math.random() > 0.45) {
        emberColors[i * 3] = 0.98; // R
        emberColors[i * 3 + 1] = 0.62; // G
        emberColors[i * 3 + 2] = 0.08; // B
      } else {
        emberColors[i * 3] = 0.95; // R
        emberColors[i * 3 + 1] = 0.2; // G
        emberColors[i * 3 + 2] = 0.15; // B
      }
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    emberGeo.setAttribute("color", new THREE.BufferAttribute(emberColors, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    mainGroup.add(emberPoints);

    // 5. Flavor Burst Shockwave Ring (Triggers on click)
    const shockwaveGeo = new THREE.RingGeometry(0.1, 0.2, 48);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.rotation.x = -Math.PI / 2;
    shockwaveMesh.position.y = 0.7;
    mainGroup.add(shockwaveMesh);

    let shockwaveProgress = 1;

    // Burst trigger function
    burstCallbackRef.current = () => {
      shockwaveProgress = 0;
      mainPointLight.intensity = 7.0;
      redAccentLight.intensity = 6.0;
    };

    // Mouse Tracking for Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.45;
      targetRotationX = y * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera parallax smooth damping
      mainGroup.rotation.y += (targetRotationY + (isRotating ? elapsed * 0.12 : 0) - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX * 0.4 - mainGroup.rotation.x) * 0.05;

      // Animate center momo floating bob
      centerMomo.position.y = 0.65 + Math.sin(elapsed * 2.2) * 0.08;
      centerMomo.rotation.y += 0.008;
      centerMomo.rotation.z = Math.sin(elapsed * 1.5) * 0.05;

      // Animate orbiting momos
      orbitingMomos.forEach((item, index) => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.orbitRadius;
        item.mesh.position.z = Math.sin(item.angle) * item.orbitRadius;
        item.mesh.position.y = item.yBase + Math.sin(elapsed * 2.5 + index * 1.2) * 0.06;
        item.mesh.rotation.y += 0.012;
      });

      // Animate broth ripple
      const rippleScale = 1.0 + Math.sin(elapsed * 3) * 0.05;
      rippleMesh.scale.set(rippleScale, rippleScale, 1);
      rippleMesh.rotation.z = elapsed * 0.3;

      // Animate steam particles rising
      const steamPosAttr = steamGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < steamParticleCount; i++) {
        let y = steamPosAttr.getY(i);
        y += steamSpeeds[i] * steamIntensity;
        if (y > 3.4) {
          y = 0.25;
        }
        steamPosAttr.setY(i, y);

        // Sinusoidal drift
        const ang = steamAngles[i] + elapsed * 0.4;
        const rad = 0.3 + (y / 3.4) * 1.2;
        steamPosAttr.setX(i, Math.cos(ang) * rad);
        steamPosAttr.setZ(i, Math.sin(ang) * rad);
      }
      steamPosAttr.needsUpdate = true;

      // Animate embers
      const emberPosAttr = emberGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < emberCount; i++) {
        let y = emberPosAttr.getY(i);
        y += 0.007;
        if (y > 2.8) y = -0.2;
        emberPosAttr.setY(i, y);
      }
      emberPosAttr.needsUpdate = true;

      // Animate shockwave if triggered
      if (shockwaveProgress < 1) {
        shockwaveProgress += 0.035;
        const scale = 0.1 + shockwaveProgress * 3.8;
        shockwaveMesh.scale.set(scale, scale, 1);
        shockwaveMat.opacity = Math.max(0, 1 - shockwaveProgress);
      }

      // Smooth light normalization after burst
      if (mainPointLight.intensity > 3.5) {
        mainPointLight.intensity -= 0.08;
      }
      if (redAccentLight.intensity > 2.8) {
        redAccentLight.intensity -= 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [steamIntensity, isRotating]);

  const handleFlavorBurst = () => {
    setFlavorBurstCount((prev) => prev + 1);
    if (burstCallbackRef.current) {
      burstCallbackRef.current();
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[500px] flex items-center justify-center ${className}`}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Interactive 3D HUD / Controls Overlay */}
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 flex flex-wrap items-center gap-3 bg-zinc-950/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl z-20">
        <div className="flex items-center gap-2 px-2 text-xs font-medium text-zinc-300">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="hidden sm:inline">3D Broth Simmering</span>
        </div>

        {/* Flavor Burst Button */}
        <button
          onClick={handleFlavorBurst}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-zinc-950 transition-all transform active:scale-95 shadow-md shadow-amber-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Burst Flavor</span>
          {flavorBurstCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 bg-black/30 rounded-full text-[10px] text-white">
              +{flavorBurstCount}
            </span>
          )}
        </button>

        {/* Steam Intensity Toggle */}
        <button
          onClick={() => setSteamIntensity((prev) => (prev > 1.5 ? 0.6 : prev + 0.6))}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/5 transition-colors"
          title="Toggle Steam Vapor Flow"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Steam: {steamIntensity > 1.5 ? "High 🔥" : "Simmer ♨️"}</span>
        </button>

        {/* Orbit Toggle */}
        <button
          onClick={() => setIsRotating((prev) => !prev)}
          className={`flex items-center gap-1 p-1.5 rounded-xl border transition-colors ${
            isRotating
              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
              : "bg-zinc-900 text-zinc-400 border-white/5"
          }`}
          title="Toggle Auto Orbit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Floating 3D Tooltip Hint */}
      <div className="absolute top-6 left-6 pointer-events-none hidden lg:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-zinc-400">
        <span className="text-amber-400">✦</span> Move cursor to tilt perspective • Drag & interact
      </div>
    </div>
  );
}
