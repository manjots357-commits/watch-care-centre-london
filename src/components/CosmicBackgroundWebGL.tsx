import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motionBridge } from '../engine/motionBridge';

function createSoftParticleTexture(innerStop: string, midStop: string): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const half = size / 2;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, innerStop);
    grad.addColorStop(0.38, midStop);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createDropletTexture(): THREE.CanvasTexture {
  const w = 32;
  const h = 64;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(w / 2, h * 0.58, 1, w / 2, h * 0.5, h * 0.46);
    grad.addColorStop(0, 'rgba(226, 242, 255, 0.95)');
    grad.addColorStop(0.35, 'rgba(167, 139, 250, 0.52)');
    grad.addColorStop(1, 'rgba(12, 8, 28, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(w / 2, h / 2, w * 0.24, h * 0.44, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildLowPolyMicroGear(
  radius: number,
  teeth: number,
  thickness: number,
  material: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  const rimBand = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.77, thickness * 1.15, 6, 24),
    material
  );
  group.add(rimBand);

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.2, radius * 0.2, thickness * 2.2, 12).rotateX(
      Math.PI / 2
    ),
    material
  );
  group.add(hub);

  const spokeGeo = new THREE.BoxGeometry(radius * 1.32, radius * 0.065, thickness * 1.1);
  for (let s = 0; s < 3; s++) {
    const spoke = new THREE.Mesh(spokeGeo, material);
    spoke.rotation.z = (s / 3) * Math.PI;
    group.add(spoke);
  }

  const toothGeo = new THREE.BoxGeometry(
    radius * 0.17,
    ((Math.PI * 2 * radius) / teeth) * 0.42,
    thickness * 1.4
  );
  const instancedTeeth = new THREE.InstancedMesh(toothGeo, material, teeth);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const r = radius * 0.93;
    dummy.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
    dummy.rotation.set(0, 0, a);
    dummy.updateMatrix();
    instancedTeeth.setMatrixAt(i, dummy.matrix);
  }
  group.add(instancedTeeth);

  return group;
}

export const CosmicBackgroundWebGL: React.FC = () => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      });
    } catch {
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reducedMotionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionMql.matches;

    const getWidth = () => window.innerWidth || 1280;
    const getHeight = () => window.innerHeight || 800;

    // Cap pixel ratio at 1.0 on the background canvas to cut fragment shader load by up to 4x
    renderer.setPixelRatio(1);
    renderer.setSize(getWidth(), getHeight());
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    host.innerHTML = '';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07040e);
    scene.fog = new THREE.FogExp2(0x080412, 0.052);

    const camera = new THREE.PerspectiveCamera(44, getWidth() / getHeight(), 0.5, 45);
    camera.position.set(0, 0, 10.5);

    const ambient = new THREE.AmbientLight(0x241442, 1.25);
    scene.add(ambient);

    const goldenRimLight = new THREE.DirectionalLight(0xf5b864, 2.2);
    goldenRimLight.position.set(7.5, 5.5, 4.0);
    scene.add(goldenRimLight);

    const violetLight = new THREE.DirectionalLight(0x8b5cf6, 1.8);
    violetLight.position.set(-7.2, 6.8, 6.2);
    scene.add(violetLight);

    const everoseMat = new THREE.MeshStandardMaterial({
      color: 0xd8967c,
      emissive: 0x261108,
      emissiveIntensity: 0.4,
      metalness: 0.88,
      roughness: 0.24,
    });

    const chromeVioletMat = new THREE.MeshStandardMaterial({
      color: 0xb9add8,
      emissive: 0x241046,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2,
    });

    const neonAccentMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7c3aed,
      emissiveIntensity: 1.2,
      metalness: 0.6,
      roughness: 0.3,
    });

    const silhouetteGroup = new THREE.Group();
    silhouetteGroup.position.set(0, 0.2, -13.5);
    scene.add(silhouetteGroup);

    const outerCalibreHalo = new THREE.Mesh(
      new THREE.TorusGeometry(6.4, 0.032, 8, 64),
      chromeVioletMat
    );
    const innerCalibreHalo = new THREE.Mesh(
      new THREE.TorusGeometry(4.85, 0.022, 8, 56),
      everoseMat
    );
    innerCalibreHalo.rotation.x = 0.28;
    const glowingEscapementArc = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.025, 8, 48, Math.PI * 1.35),
      neonAccentMat
    );
    glowingEscapementArc.rotation.z = 0.6;
    silhouetteGroup.add(outerCalibreHalo, innerCalibreHalo, glowingEscapementArc);

    interface FloatingGearEntry {
      mesh: THREE.Group;
      baseX: number;
      baseY: number;
      baseZ: number;
      spinSpeed: number;
      parallaxDepth: number;
      tiltPhase: number;
    }

    const gearSpecs: [number, number, number, number, number, number, THREE.Material][] = isMobile
      ? [
          [-3.8, 2.6, -3.5, 0.85, 0.14, 1.1, everoseMat],
          [4.1, -2.3, -4.8, 1.05, -0.11, 0.85, chromeVioletMat],
          [-4.9, -3.1, -7.8, 1.45, 0.08, 0.55, chromeVioletMat],
        ]
      : [
          [-5.6, 2.9, -2.8, 0.92, 0.15, 1.25, everoseMat],
          [5.9, -2.4, -3.4, 1.08, -0.12, 1.1, chromeVioletMat],
          [-6.8, -3.0, -6.2, 1.48, 0.09, 0.72, chromeVioletMat],
          [6.9, 3.4, -7.0, 1.62, -0.08, 0.65, everoseMat],
          [0.0, 0.0, -15.2, 3.6, 0.03, 0.22, chromeVioletMat],
        ];

    const floatingGears: FloatingGearEntry[] = gearSpecs.map(
      ([bx, by, bz, radius, speed, pDepth, mat], idx) => {
        const gear = buildLowPolyMicroGear(radius, 14 + (idx % 3) * 4, 0.045, mat);
        gear.position.set(bx, by, bz);
        gear.rotation.set(0.42 + idx * 0.25, -0.35 + idx * 0.18, idx * 0.5);
        scene.add(gear);
        return {
          mesh: gear,
          baseX: bx,
          baseY: by,
          baseZ: bz,
          spinSpeed: speed,
          parallaxDepth: pDepth,
          tiltPhase: idx * 1.17,
        };
      }
    );

    const dropletCount = isMobile ? 70 : 130;
    const dropletPositions = new Float32Array(dropletCount * 3);
    const dropletSpeeds = new Float32Array(dropletCount);

    for (let i = 0; i < dropletCount; i++) {
      dropletPositions[i * 3] = (Math.random() - 0.5) * 24;
      dropletPositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      dropletPositions[i * 3 + 2] = -1.5 - Math.random() * 14;
      dropletSpeeds[i] = 0.45 + Math.random() * 0.75;
    }

    const dropletGeo = new THREE.BufferGeometry();
    const dropletPosAttr = new THREE.BufferAttribute(dropletPositions, 3);
    dropletPosAttr.setUsage(THREE.DynamicDrawUsage);
    dropletGeo.setAttribute('position', dropletPosAttr);

    const dropletTex = createDropletTexture();
    const dropletMat = new THREE.PointsMaterial({
      size: 0.2,
      map: dropletTex,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dropletPoints = new THREE.Points(dropletGeo, dropletMat);
    scene.add(dropletPoints);

    const emberCount = isMobile ? 60 : 110;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberHome = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);
    const emberPhase = new Float32Array(emberCount);

    const goldColor = new THREE.Color(0xf6c468);
    const violetColor = new THREE.Color(0xa855f7);
    const lavenderColor = new THREE.Color(0xe9d5ff);

    for (let i = 0; i < emberCount; i++) {
      const hx = (Math.random() - 0.5) * 20;
      const hy = (Math.random() - 0.5) * 14;
      const hz = 1.2 - Math.random() * 13;
      emberPositions[i * 3] = hx;
      emberPositions[i * 3 + 1] = hy;
      emberPositions[i * 3 + 2] = hz;
      emberHome[i * 3] = hx;
      emberHome[i * 3 + 1] = hy;
      emberHome[i * 3 + 2] = hz;
      emberPhase[i] = Math.random() * Math.PI * 2;

      const pick = Math.random();
      const c = pick < 0.46 ? goldColor : pick < 0.86 ? violetColor : lavenderColor;
      emberColors[i * 3] = c.r;
      emberColors[i * 3 + 1] = c.g;
      emberColors[i * 3 + 2] = c.b;
    }

    const emberGeo = new THREE.BufferGeometry();
    const emberPosAttr = new THREE.BufferAttribute(emberPositions, 3);
    emberPosAttr.setUsage(THREE.DynamicDrawUsage);
    emberGeo.setAttribute('position', emberPosAttr);
    emberGeo.setAttribute('color', new THREE.BufferAttribute(emberColors, 3));

    const emberTex = createSoftParticleTexture(
      'rgba(255, 250, 240, 1)',
      'rgba(196, 148, 255, 0.58)'
    );
    const emberMat = new THREE.PointsMaterial({
      size: 0.25,
      map: emberTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(emberPoints);

    let rafId = 0;
    let isTabVisible = document.visibilityState !== 'hidden';
    let lastTime = performance.now();

    const renderSingleFrame = (elapsedSec: number, dt: number) => {
      const damp = 1 - Math.exp(-5.0 * dt);
      motionBridge.pointerX += (motionBridge.pointerTargetX - motionBridge.pointerX) * damp;
      motionBridge.pointerY += (motionBridge.pointerTargetY - motionBridge.pointerY) * damp;

      const px = motionBridge.pointerX;
      const py = motionBridge.pointerY;
      const scrollP = motionBridge.pageScrollProgress;

      camera.position.x = px * 0.85;
      camera.position.y = py * 0.55 - scrollP * 1.05;
      camera.position.z = 10.5 - Math.sin(scrollP * Math.PI) * 1.25;
      camera.lookAt(px * 0.22, py * 0.14 - scrollP * 0.45, -4.0);

      silhouetteGroup.rotation.z = elapsedSec * 0.025 + scrollP * Math.PI * 0.7;
      innerCalibreHalo.rotation.z = -elapsedSec * 0.04 - scrollP * 1.2;

      for (let i = 0; i < floatingGears.length; i++) {
        const g = floatingGears[i];
        g.mesh.rotation.z += g.spinSpeed * dt;
        g.mesh.position.x = g.baseX + px * g.parallaxDepth * 0.85;
        g.mesh.position.y =
          g.baseY + py * g.parallaxDepth * 0.65 + scrollP * g.parallaxDepth * 1.4;
      }

      if (!prefersReducedMotion) {
        for (let i = 0; i < dropletCount; i++) {
          const idx = i * 3;
          let y = dropletPositions[idx + 1] - dropletSpeeds[i] * dt;
          if (y < -9.2) y = 9.2;
          dropletPositions[idx + 1] = y;
        }
        dropletPosAttr.needsUpdate = true;

        for (let i = 0; i < emberCount; i++) {
          const i3 = i * 3;
          const phase = emberPhase[i];
          let hy = emberHome[i3 + 1] + 0.18 * dt;
          if (hy > 7.5) hy = -7.5;
          emberHome[i3 + 1] = hy;
          emberPositions[i3] = emberHome[i3] + Math.sin(elapsedSec * 0.5 + phase) * 0.28;
          emberPositions[i3 + 1] = hy;
        }
        emberPosAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    const startTime = performance.now();
    // 30fps frame pacing on background canvas leaves abundant GPU/CPU headroom for 60fps UI & video
    const FRAME_INTERVAL_MS = 33;
    const tick = (now: number) => {
      if (!isTabVisible) return;
      rafId = window.requestAnimationFrame(tick);
      const elapsedMs = now - lastTime;
      if (elapsedMs < FRAME_INTERVAL_MS) return;
      const dt = Math.min(elapsedMs / 1000, 0.06);
      lastTime = now;
      renderSingleFrame((now - startTime) / 1000, dt);
    };

    const startLoop = () => {
      window.cancelAnimationFrame(rafId);
      lastTime = performance.now();
      renderSingleFrame((lastTime - startTime) / 1000, 0.033);
      if (!prefersReducedMotion && isTabVisible) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handleResize = () => {
      const w = getWidth();
      const h = getHeight();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (prefersReducedMotion) {
        renderSingleFrame(0, 0.033);
      }
    };

    const handleVisibility = () => {
      isTabVisible = document.visibilityState !== 'hidden';
      if (isTabVisible) {
        startLoop();
      } else {
        window.cancelAnimationFrame(rafId);
      }
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      startLoop();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotionMql.addEventListener('change', handleReducedMotionChange);

    startLoop();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotionMql.removeEventListener('change', handleReducedMotionChange);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

      dropletTex.dispose();
      emberTex.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={hostRef} className="cosmic-webgl-backdrop" aria-hidden="true" />;
};
