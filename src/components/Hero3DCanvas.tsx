"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  className?: string;
}

export default function Hero3DCanvas({ className = "" }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

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
    const ambientLight = new THREE.AmbientLight(0xffedd5, 1.0);
    scene.add(ambientLight);

    const mainPointLight = new THREE.PointLight(0xf59e0b, 3.2, 12);
    mainPointLight.position.set(0, 2.5, 1.5);
    scene.add(mainPointLight);

    const redAccentLight = new THREE.PointLight(0xef4444, 2.2, 10);
    redAccentLight.position.set(-2.5, -0.5, 2);
    scene.add(redAccentLight);

    const goldenRimLight = new THREE.PointLight(0xfbbf24, 2.0, 10);
    goldenRimLight.position.set(2.5, 1, -2);
    scene.add(goldenRimLight);

    // 1. Artisanal Soup Bowl
    const bowlPoints: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const r = Math.sin(t * Math.PI * 0.5) * 1.5 + 0.15;
      const y = -0.7 + t * 0.95;
      bowlPoints.push(new THREE.Vector2(r, y));
    }
    const bowlGeo = new THREE.LatheGeometry(bowlPoints, 48);
    const bowlMat = new THREE.MeshStandardMaterial({
      color: 0x14141d,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x1a0f05,
      emissiveIntensity: 0.35,
    });
    const bowlMesh = new THREE.Mesh(bowlGeo, bowlMat);
    mainGroup.add(bowlMesh);

    // Glowing Golden Broth Surface
    const brothGeo = new THREE.CylinderGeometry(1.58, 1.58, 0.05, 48);
    const brothMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0xb45309,
      emissiveIntensity: 0.85,
      metalness: 0.2,
      roughness: 0.15,
      transparent: true,
      opacity: 0.9,
    });
    const brothMesh = new THREE.Mesh(brothGeo, brothMat);
    brothMesh.position.y = 0.22;
    mainGroup.add(brothMesh);

    // Broth Ripple Ring
    const rippleGeo = new THREE.RingGeometry(0.3, 1.5, 36);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
    rippleMesh.rotation.x = -Math.PI / 2;
    rippleMesh.position.y = 0.26;
    mainGroup.add(rippleMesh);

    // 2. Sculpted 3D Floating Momos
    const createMomoMesh = (scale = 1) => {
      const momoGroup = new THREE.Group();

      const bodyGeo = new THREE.SphereGeometry(0.38 * scale, 32, 24);
      const pos = bodyGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);

        if (y < 0) {
          y *= 0.55;
        } else {
          const taper = 1.0 - (y / 0.45) * 0.4;
          x *= taper;
          z *= taper;
          const angle = Math.atan2(z, x);
          const pleatWave = Math.sin(angle * 12) * 0.035 * (y > 0 ? y : 0);
          x += pleatWave * Math.cos(angle);
          z += pleatWave * Math.sin(angle);
        }
        pos.setXYZ(i, x, y, z);
      }
      bodyGeo.computeVertexNormals();

      const momoMat = new THREE.MeshStandardMaterial({
        color: 0xfff7ed,
        roughness: 0.38,
        metalness: 0.05,
        emissive: 0xfef08a,
        emissiveIntensity: 0.12,
      });

      const momoBody = new THREE.Mesh(bodyGeo, momoMat);
      momoGroup.add(momoBody);

      // Top knot
      const knotGeo = new THREE.ConeGeometry(0.09 * scale, 0.12 * scale, 12);
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        roughness: 0.5,
      });
      const knot = new THREE.Mesh(knotGeo, knotMat);
      knot.position.y = 0.36 * scale;
      knot.rotation.x = Math.PI;
      momoGroup.add(knot);

      return momoGroup;
    };

    const centerMomo = createMomoMesh(1.15);
    centerMomo.position.set(0, 0.65, 0);
    mainGroup.add(centerMomo);

    // Surrounding Floating Momos
    const orbitingMomos: { mesh: THREE.Group; orbitRadius: number; angle: number; speed: number; yBase: number }[] = [];
    const momoCount = 4;
    for (let i = 0; i < momoCount; i++) {
      const mesh = createMomoMesh(0.72);
      const angle = (i / momoCount) * Math.PI * 2;
      const orbitRadius = 1.05;
      const yBase = 0.45 + (i % 2) * 0.15;
      mesh.position.set(Math.cos(angle) * orbitRadius, yBase, Math.sin(angle) * orbitRadius);
      mesh.rotation.y = Math.random() * Math.PI;
      mainGroup.add(mesh);
      orbitingMomos.push({
        mesh,
        orbitRadius,
        angle,
        speed: 0.007 + i * 0.002,
        yBase,
      });
    }

    // 3. Delicate Steam Vapor
    const steamParticleCount = 180;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamSpeeds = new Float32Array(steamParticleCount);
    const steamAngles = new Float32Array(steamParticleCount);

    for (let i = 0; i < steamParticleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.3;
      const y = 0.2 + Math.random() * 3.0;

      steamPositions[i * 3] = Math.cos(angle) * radius;
      steamPositions[i * 3 + 1] = y;
      steamPositions[i * 3 + 2] = Math.sin(angle) * radius;

      steamSpeeds[i] = 0.01 + Math.random() * 0.015;
      steamAngles[i] = angle;
    }

    steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));

    const createSteamTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255, 245, 225, 0.85)");
        grad.addColorStop(0.4, "rgba(245, 158, 11, 0.25)");
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
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    mainGroup.add(steamPoints);

    // 4. Subtle Ember particles
    const emberCount = 80;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      const r = 0.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      emberPos[i * 3] = Math.cos(theta) * r;
      emberPos[i * 3 + 1] = -0.1 + Math.random() * 2.5;
      emberPos[i * 3 + 2] = Math.sin(theta) * r;
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    mainGroup.add(emberPoints);

    // Mouse Tracking for Gentle Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.35;
      targetRotationX = y * 0.2;
    };

    window.addEventListener("mousemove", handleMouseMove);

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

      // Smooth camera parallax + gentle continuous rotation
      mainGroup.rotation.y += (targetRotationY + elapsed * 0.08 - mainGroup.rotation.y) * 0.04;
      mainGroup.rotation.x += (targetRotationX * 0.3 - mainGroup.rotation.x) * 0.04;

      // Bobbing center momo
      centerMomo.position.y = 0.65 + Math.sin(elapsed * 2.0) * 0.07;
      centerMomo.rotation.y += 0.006;

      // Orbiting momos
      orbitingMomos.forEach((item, index) => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.orbitRadius;
        item.mesh.position.z = Math.sin(item.angle) * item.orbitRadius;
        item.mesh.position.y = item.yBase + Math.sin(elapsed * 2.2 + index) * 0.05;
        item.mesh.rotation.y += 0.01;
      });

      // Broth ripple
      const rippleScale = 1.0 + Math.sin(elapsed * 2.5) * 0.04;
      rippleMesh.scale.set(rippleScale, rippleScale, 1);

      // Steam rise
      const steamPosAttr = steamGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < steamParticleCount; i++) {
        let y = steamPosAttr.getY(i);
        y += steamSpeeds[i];
        if (y > 3.2) y = 0.25;
        steamPosAttr.setY(i, y);

        const ang = steamAngles[i] + elapsed * 0.3;
        const rad = 0.3 + (y / 3.2) * 1.1;
        steamPosAttr.setX(i, Math.cos(ang) * rad);
        steamPosAttr.setZ(i, Math.sin(ang) * rad);
      }
      steamPosAttr.needsUpdate = true;

      // Embers
      const emberPosAttr = emberGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < emberCount; i++) {
        let y = emberPosAttr.getY(i);
        y += 0.005;
        if (y > 2.5) y = -0.1;
        emberPosAttr.setY(i, y);
      }
      emberPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[500px] flex items-center justify-center pointer-events-none ${className}`}>
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  );
}
