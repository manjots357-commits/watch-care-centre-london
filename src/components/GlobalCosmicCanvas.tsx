import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * GlobalLuxuryCanvas:
 * Ultra-subtle, GPU-accelerated atmospheric Three.js layer running across the entire viewport.
 * Provides:
 * - 100% transparent alpha WebGL canvas so the Rolex Daytona video is the pristine hero
 * - Smooth cursor-linked 3D parallax tracking and subtle orbital camera movement
 * - Warm 3200K champagne gold and brushed silver micro horological bench dust particles
 * - Zero disconnected/floating sci-fi debris or purple neon glow
 */
export default function GlobalCosmicCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software rendering fallback
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene with pure alpha transparency
    const scene = new THREE.Scene();

    // 2. Camera with 3D Parallax support
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    camera.position.set(0, 0, 18);

    // 3. WebGL Renderer with High-DPI Cap and explicit alpha transparency
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setClearColor(0x000000, 0); // 100% transparent
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 4. Subtle Studio Horology Lighting Rig (Warm 3200K & Silver, No Purple)
    const ambientLight = new THREE.AmbientLight(0x16161c, 0.6);
    scene.add(ambientLight);

    // Warm Champagne Gold Rim Light
    const goldRimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    goldRimLight.position.set(16, 18, 12);
    scene.add(goldRimLight);

    // Neutral Brushed Steel Fill Light
    const steelFillLight = new THREE.DirectionalLight(0xe2e4e9, 1.2);
    steelFillLight.position.set(-16, -10, 8);
    scene.add(steelFillLight);

    // Dynamic Cursor-Linked PointLight (Champagne Gold Specular Glint)
    const cursorPointLight = new THREE.PointLight(0xf5eedb, 2.0, 20, 1.8);
    cursorPointLight.position.set(0, 0, 5);
    scene.add(cursorPointLight);

    // 5. Dynamic Micro Bench Particles (Champagne Gold & Platinum Dust)
    const particleCount = 280;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xd4af37);
    const colorSilver = new THREE.Color(0xe2e4e9);
    const colorWarmIvory = new THREE.Color(0xf5eedb);

    for (let i = 0; i < particleCount; i++) {
      const px = (Math.random() - 0.5) * 40;
      const py = (Math.random() - 0.5) * 32;
      const pz = (Math.random() - 0.5) * 24 - 3;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      velocities[i * 3] = (Math.random() - 0.5) * 0.012;
      velocities[i * 3 + 1] = 0.008 + Math.random() * 0.02; // Gentle warm thermal upward drift
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      const r = Math.random();
      const c = r > 0.6 ? colorGold : r > 0.25 ? colorWarmIvory : colorSilver;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular particle texture generator
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pCtx = particleCanvas.getContext('2d')!;
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(245, 238, 219, 0.85)');
    grad.addColorStop(0.7, 'rgba(212, 175, 55, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.28,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 6. Interactive Mouse Tracking & Parallax State
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      worldX: 0,
      worldY: 0,
    };

    let scrollTargetY = 0;
    let scrollCurrentY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.worldX = mouse.targetX * 12;
      mouse.worldY = mouse.targetY * 8;
    };

    const handleScroll = () => {
      scrollTargetY = window.scrollY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with 60FPS Optimization
    let animationFrameId: number;
    let isTabVisible = true;
    let lastTime = performance.now();

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const now = performance.now();
      lastTime = now;

      // Damped Cursor Tracking for camera parallax
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.04;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.04;

      scrollCurrentY += (scrollTargetY - scrollCurrentY) * 0.05;
      const scrollRatio = Math.min(scrollCurrentY / 3000, 1);

      // Subtle orbital tilt following mouse
      camera.position.x = mouse.currentX * 1.2;
      camera.position.y = mouse.currentY * 0.9 - scrollRatio * 3.0;
      camera.rotation.x = -mouse.currentY * 0.04 - scrollRatio * 0.08;
      camera.rotation.y = mouse.currentX * 0.05;

      // Move specular light with cursor
      cursorPointLight.position.x = mouse.currentX * 12;
      cursorPointLight.position.y = mouse.currentY * 8 - scrollRatio * 3.0;

      // Update Micro Particles
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const pArray = posAttr.array as Float32Array;

      const cursorX = mouse.worldX;
      const cursorY = mouse.worldY - scrollRatio * 3.0;
      const repulsionRadiusSq = 4.5 * 4.5;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;

        pArray[idx] += velocities[idx];
        pArray[idx + 1] += velocities[idx + 1];
        pArray[idx + 2] += velocities[idx + 2];

        // Gentle cursor breeze
        const dx = pArray[idx] - cursorX;
        const dy = pArray[idx + 1] - cursorY;
        const distSq = dx * dx + dy * dy;

        if (distSq < repulsionRadiusSq && distSq > 0.01) {
          const force = (1 - Math.sqrt(distSq) / 4.5) * 0.08;
          pArray[idx] += dx * force;
          pArray[idx + 1] += dy * force;
        }

        // Top wrap-around
        if (pArray[idx + 1] > 16) {
          pArray[idx + 1] = -16;
          pArray[idx] = (Math.random() - 0.5) * 40;
        }
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    />
  );
}
