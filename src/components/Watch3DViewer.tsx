import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { createWatchDialTexture } from './watchDialTexture.ts';
import { createStudioEnvironmentMap } from './studioEnvironment.ts';
import { Layers, RotateCcw, Play, Pause, ChevronDown, ChevronUp } from 'lucide-react';

export type MetalFinish = 'steel' | 'rose-gold' | 'titanium' | 'stealth';

interface FinishConfig {
  name: string;
  color: number;
  metalness: number;
  roughness: number;
  accentColor: number;
  handsColor: number;
}

const FINISHES: Record<MetalFinish, FinishConfig> = {
  'rose-gold': {
    name: '18K Everose Gold',
    color: 0xc5838c,
    metalness: 0.92,
    roughness: 0.16,
    accentColor: 0xfae0dc,
    handsColor: 0xfceae6,
  },
  'steel': {
    name: '904L Steel',
    color: 0xdedfe3,
    metalness: 0.95,
    roughness: 0.18,
    accentColor: 0xb76e79,
    handsColor: 0x38bdf8, // Blued steel second hand
  },
  'titanium': {
    name: 'Grade 5 Titanium',
    color: 0x828489,
    metalness: 0.88,
    roughness: 0.32,
    accentColor: 0xe5a49b,
    handsColor: 0xe0e7ff,
  },
  'stealth': {
    name: 'Stealth Ceramic',
    color: 0x24252a,
    metalness: 0.65,
    roughness: 0.22,
    accentColor: 0xc5838c,
    handsColor: 0xe5a49b,
  },
};

export default function Watch3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState<MetalFinish>('rose-gold');
  const [exploded, setExploded] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [activeView, setActiveView] = useState<'angle' | 'dial' | 'escapement' | 'profile'>('angle');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);

  // Mutable refs for animation loop
  const animStateRef = useRef({
    finish: 'rose-gold' as MetalFinish,
    targetExploded: 0,
    currentExploded: 0,
    isPlaying: true,
    speedMultiplier: 1,
    targetRotX: 0.28,
    targetRotY: -0.42,
    currentRotX: 0.28,
    currentRotY: -0.42,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    balanceAngle: 0,
    secondAngle: 0,
    minuteAngle: 0,
    hourAngle: 0,
    targetCamZ: 6.8,
    currentCamZ: 6.8,
    targetCamY: 0,
    currentCamY: 0,
  });

  const wakeRenderLoopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    animStateRef.current.finish = finish;
    wakeRenderLoopRef.current?.();
  }, [finish]);

  useEffect(() => {
    animStateRef.current.targetExploded = exploded;
    wakeRenderLoopRef.current?.();
  }, [exploded]);

  useEffect(() => {
    animStateRef.current.isPlaying = isPlaying;
    wakeRenderLoopRef.current?.();
  }, [isPlaying]);

  useEffect(() => {
    animStateRef.current.speedMultiplier = speedMultiplier;
    wakeRenderLoopRef.current?.();
  }, [speedMultiplier]);

  const handleCameraPreset = useCallback((preset: 'angle' | 'dial' | 'escapement' | 'profile') => {
    setActiveView(preset);
    const s = animStateRef.current;
    if (preset === 'angle') {
      s.targetRotX = 0.28;
      s.targetRotY = -0.42;
      s.targetCamZ = 6.8;
      s.targetCamY = 0;
    } else if (preset === 'dial') {
      s.targetRotX = 0;
      s.targetRotY = 0;
      s.targetCamZ = 5.8;
      s.targetCamY = 0;
    } else if (preset === 'escapement') {
      s.targetRotX = 0.12;
      s.targetRotY = 0.12;
      s.targetCamZ = 4.4;
      s.targetCamY = 0.65;
    } else if (preset === 'profile') {
      s.targetRotX = 0.08;
      s.targetRotY = -Math.PI / 2 + 0.15;
      s.targetCamZ = 6.6;
      s.targetCamY = 0;
    }
    wakeRenderLoopRef.current?.();
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.035);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 6.8);

    // Renderer (with preserveDrawingBuffer: true for clean headless screenshot capture)
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Unreal Post-Processing Bloom Setup
    let composer: EffectComposer | null = null;
    if (!isSoftwareGl) {
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.42, // Subtle luxury bloom strength
        0.30, // Radius
        0.85  // Threshold to keep dials sharp
      );
      composer.addPass(bloomPass);
    }

    // Procedural Studio Reflection Environment
    const studioEnvMap = createStudioEnvironmentMap();
    scene.environment = studioEnvMap;

    // Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    // Amber Rim Light (Technical Pillar 6: Highlights 18K Everose Gold & 904L Steel chamfers)
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.5);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Cool Volumetric Studio Light (Soft neutral fill)
    const fillLight = new THREE.HemisphereLight(0xe2e4e9, 0x101015, 1.2);
    scene.add(fillLight);

    const frontLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    frontLight.position.set(0, 2, 6);
    scene.add(frontLight);

    // Dynamic Cursor-Linked PointLight: live moving champagne-gold specular glints
    const watchCursorLight = new THREE.PointLight(0xf5eedb, 2.2, 9, 2);
    watchCursorLight.position.set(0, 0, 3.5);
    scene.add(watchCursorLight);

    // Ground contact shadow disc
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d');
    if (sctx) {
      const g = sctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      g.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
      g.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -2.2, -0.2);
    shadowMesh.rotation.x = -Math.PI / 2;
    scene.add(shadowMesh);

    // BUILD PROCEDURAL LUXURY MECHANICAL WATCH
    const watchRoot = new THREE.Group();
    scene.add(watchRoot);

    // Master Materials based on Finish
    const currentFinish = FINISHES[animStateRef.current.finish];

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: currentFinish.color,
      metalness: currentFinish.metalness,
      roughness: currentFinish.roughness,
      envMapIntensity: 1.8,
    });

    const polishedMetalMaterial = new THREE.MeshStandardMaterial({
      color: currentFinish.color,
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 2.4,
    });

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.92,
      roughness: 0.15,
      envMapIntensity: 2.0,
    });

    const rubyMaterial = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0x881337,
      roughness: 0.08,
      metalness: 0.2,
    });

    // Technical Pillar 3: Realistic sapphire crystal with true optical transmission & IOR 1.77
    const sapphireMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.04,
      metalness: 0.02,
      transmission: 0.95,
      thickness: 1.2,
      ior: 1.77, // Synthetic sapphire crystal
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      depthWrite: false,
    });

    // Layer Groups for Exploded View
    const crystalLayer = new THREE.Group();
    const bezelLayer = new THREE.Group();
    const handsLayer = new THREE.Group();
    const dialLayer = new THREE.Group();
    const escapementLayer = new THREE.Group();
    const caseLayer = new THREE.Group();
    const movementLayer = new THREE.Group();
    const casebackLayer = new THREE.Group();
    const rotorLayer = new THREE.Group();

    watchRoot.add(caseLayer);
    watchRoot.add(dialLayer);
    watchRoot.add(escapementLayer);
    watchRoot.add(handsLayer);
    watchRoot.add(bezelLayer);
    watchRoot.add(crystalLayer);
    watchRoot.add(movementLayer);
    watchRoot.add(casebackLayer);
    watchRoot.add(rotorLayer);

    // Center watch naturally
    watchRoot.position.set(0, -0.15, 0);

    // A. Main Watch Case & Lugs
    // Open barrel prevents solid front cap from concealing dial face
    const caseGeo = new THREE.CylinderGeometry(1.85, 1.85, 0.40, 64, 1, true);
    const caseMesh = new THREE.Mesh(caseGeo, metalMaterial);
    caseMesh.rotation.x = Math.PI / 2;
    caseLayer.add(caseMesh);

    // Front case bevel rim framing the dial
    const frontRimGeo = new THREE.RingGeometry(1.64, 1.85, 64);
    const frontRimMesh = new THREE.Mesh(frontRimGeo, metalMaterial);
    frontRimMesh.position.z = 0.20;
    caseLayer.add(frontRimMesh);

    // Back case bevel rim
    const backRimGeo = new THREE.RingGeometry(1.60, 1.85, 64);
    const backRimMesh = new THREE.Mesh(backRimGeo, metalMaterial);
    backRimMesh.position.z = -0.20;
    backRimMesh.rotation.y = Math.PI;
    caseLayer.add(backRimMesh);

    // Lugs
    const lugGeo = new THREE.BoxGeometry(0.32, 0.95, 0.45);
    const lugPositions = [
      [-1.15, 1.95, 0],
      [1.15, 1.95, 0],
      [-1.15, -1.95, 0],
      [1.15, -1.95, 0],
    ];
    lugPositions.forEach(([lx, ly, lz], i) => {
      const lug = new THREE.Mesh(lugGeo, metalMaterial);
      lug.position.set(lx, ly, lz);
      lug.rotation.z = i < 2 ? (lx > 0 ? -0.18 : 0.18) : lx > 0 ? 0.18 : -0.18;
      caseLayer.add(lug);
    });

    // Crown & Pushers
    const crownGuardGeo = new THREE.BoxGeometry(0.35, 0.55, 0.35);
    const crownGuard = new THREE.Mesh(crownGuardGeo, metalMaterial);
    crownGuard.position.set(1.95, 0, 0);
    caseLayer.add(crownGuard);

    const crownGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.32, 24);
    const crownMesh = new THREE.Mesh(crownGeo, polishedMetalMaterial);
    crownMesh.rotation.z = Math.PI / 2;
    crownMesh.position.set(2.22, 0, 0);
    caseLayer.add(crownMesh);

    const pusherGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.28, 16);
    const pusher1 = new THREE.Mesh(pusherGeo, polishedMetalMaterial);
    pusher1.rotation.z = Math.PI / 2.8;
    pusher1.position.set(2.05, 0.95, 0);
    caseLayer.add(pusher1);

    const pusher2 = new THREE.Mesh(pusherGeo, polishedMetalMaterial);
    pusher2.rotation.z = Math.PI / 1.5;
    pusher2.position.set(2.05, -0.95, 0);
    caseLayer.add(pusher2);

    // B. Bezel
    const bezelGeo = new THREE.TorusGeometry(1.76, 0.12, 16, 64);
    const bezelMesh = new THREE.Mesh(bezelGeo, polishedMetalMaterial);
    bezelLayer.add(bezelMesh);
    bezelLayer.position.z = 0.21;

    // C. Dial (Placed at base z = 0.04, facing camera)
    const dialTex = createWatchDialTexture();
    const dialGeo = new THREE.CircleGeometry(1.64, 64);
    const dialMat = new THREE.MeshStandardMaterial({
      map: dialTex,
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.15,
      envMapIntensity: 1.2,
    });
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialLayer.add(dialMesh);
    dialLayer.position.z = 0.04;

    // Rehaut inner flange
    const rehautGeo = new THREE.CylinderGeometry(1.65, 1.64, 0.16, 64, 1, true);
    const rehautMesh = new THREE.Mesh(rehautGeo, polishedMetalMaterial);
    rehautMesh.rotation.x = Math.PI / 2;
    rehautMesh.position.z = 0.08;
    dialLayer.add(rehautMesh);

    // D. Escapement at 6 o'clock (z = 0.06 base)
    const escapementAperture = new THREE.Mesh(
      new THREE.RingGeometry(0.38, 0.44, 32),
      goldAccentMaterial
    );
    escapementAperture.position.set(0, -0.72, 0.01);
    dialLayer.add(escapementAperture);

    const balanceBridgeGeo = new THREE.BoxGeometry(0.72, 0.14, 0.06);
    const balanceBridge = new THREE.Mesh(balanceBridgeGeo, goldAccentMaterial);
    balanceBridge.position.set(0, -0.72, 0.04);
    escapementLayer.add(balanceBridge);

    const jewelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16);
    const jewelMesh = new THREE.Mesh(jewelGeo, rubyMaterial);
    jewelMesh.rotation.x = Math.PI / 2;
    jewelMesh.position.set(0, -0.72, 0.07);
    escapementLayer.add(jewelMesh);

    const balanceWheelGroup = new THREE.Group();
    balanceWheelGroup.position.set(0, -0.72, 0.03);
    escapementLayer.add(balanceWheelGroup);

    const balanceRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.024, 12, 32),
      goldAccentMaterial
    );
    balanceWheelGroup.add(balanceRim);

    for (let s = 0; s < 4; s++) {
      const spoke = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.62, 0.02),
        goldAccentMaterial
      );
      spoke.rotation.z = (s * Math.PI) / 4;
      balanceWheelGroup.add(spoke);
    }

    const hairspring = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.015, 8, 24),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    balanceWheelGroup.add(hairspring);

    // E. Hands (Stacked forward: Hour at z=0.18, Minute at z=0.22, Second at z=0.26)
    const hourHandGroup = new THREE.Group();
    const minuteHandGroup = new THREE.Group();
    const secondHandGroup = new THREE.Group();

    handsLayer.add(hourHandGroup);
    handsLayer.add(minuteHandGroup);
    handsLayer.add(secondHandGroup);

    // Hour Hand (Faceted Dauphine)
    const hourHandGeo = new THREE.ConeGeometry(0.1, 0.88, 4);
    const hourHandMesh = new THREE.Mesh(hourHandGeo, polishedMetalMaterial);
    hourHandMesh.position.y = 0.44;
    hourHandMesh.rotation.z = Math.PI;
    hourHandGroup.add(hourHandMesh);
    hourHandGroup.position.z = 0.03;

    // Minute Hand (Extended Dauphine)
    const minuteHandGeo = new THREE.ConeGeometry(0.08, 1.3, 4);
    const minuteHandMesh = new THREE.Mesh(minuteHandGeo, polishedMetalMaterial);
    minuteHandMesh.position.y = 0.65;
    minuteHandMesh.rotation.z = Math.PI;
    minuteHandGroup.add(minuteHandMesh);
    minuteHandGroup.position.z = 0.06;

    // Sweeping Second Hand (Fine needle with round counterweight)
    const secondHandMat = new THREE.MeshStandardMaterial({
      color: currentFinish.handsColor,
      metalness: 0.95,
      roughness: 0.1,
    });
    const secondNeedle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 1.52, 8),
      secondHandMat
    );
    secondNeedle.position.y = 0.54;
    secondHandGroup.add(secondNeedle);

    const secondTail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.022, 0.38, 8),
      secondHandMat
    );
    secondTail.position.y = -0.19;
    secondHandGroup.add(secondTail);

    const secondCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 16, 16),
      secondHandMat
    );
    secondHandGroup.add(secondCap);
    secondHandGroup.position.z = 0.09;

    // F. Sapphire Crystal Lens (z = 0.23, in front of all hands and sitting flush on bezel)
    const crystalGeo = new THREE.CircleGeometry(1.70, 64);
    const crystalMesh = new THREE.Mesh(crystalGeo, sapphireMaterial);
    crystalLayer.add(crystalMesh);
    crystalLayer.position.z = 0.23;

    // G. Multi-link Oyster Bracelet
    const createBraceletSegment = (yOffset: number, isTop: boolean) => {
      const group = new THREE.Group();
      for (let row = 0; row < 3; row++) {
        const rowY = isTop ? yOffset + row * 0.42 : yOffset - row * 0.42;
        const rowZ = -row * 0.22;
        const rotX = isTop ? row * 0.28 : -row * 0.28;

        const centerLink = new THREE.Mesh(
          new THREE.BoxGeometry(0.55, 0.38, 0.18),
          polishedMetalMaterial
        );
        centerLink.position.set(0, rowY, rowZ);
        centerLink.rotation.x = rotX;
        group.add(centerLink);

        const leftLink = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 0.38, 0.18),
          metalMaterial
        );
        leftLink.position.set(-0.52, rowY, rowZ);
        leftLink.rotation.x = rotX;
        group.add(leftLink);

        const rightLink = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 0.38, 0.18),
          metalMaterial
        );
        rightLink.position.set(0.52, rowY, rowZ);
        rightLink.rotation.x = rotX;
        group.add(rightLink);
      }
      return group;
    };

    caseLayer.add(createBraceletSegment(2.15, true));
    caseLayer.add(createBraceletSegment(-2.15, false));

    // Movement & Exhibition Caseback
    const movementPlate = new THREE.Mesh(
      new THREE.CylinderGeometry(1.7, 1.7, 0.14, 48),
      new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.9,
        roughness: 0.25,
      })
    );
    movementPlate.rotation.x = Math.PI / 2;
    movementLayer.add(movementPlate);
    movementLayer.position.z = -0.15;

    const rotorMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 0.05, 32, 1, false, 0, Math.PI),
      new THREE.MeshStandardMaterial({
        color: 0xb76e79,
        metalness: 0.94,
        roughness: 0.16,
      })
    );
    rotorMesh.rotation.x = Math.PI / 2;
    rotorLayer.add(rotorMesh);
    rotorLayer.position.z = -0.22;

    const casebackRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.78, 0.15, 16, 64),
      metalMaterial
    );
    casebackLayer.add(casebackRing);
    casebackLayer.position.z = -0.25;

    // Pointer events on canvas container for free orbit & cursor glint tracking
    const handlePointerDown = (e: PointerEvent) => {
      animStateRef.current.isDragging = true;
      animStateRef.current.lastMouseX = e.clientX;
      animStateRef.current.lastMouseY = e.clientY;
      wakeLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Dynamic cursor point light tracking (specular glints on dial & crystal)
      if (container) {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        watchCursorLight.position.x = normX * 3.5;
        watchCursorLight.position.y = normY * 3.5;

        // Subtle 360 hover parallax tilt when not dragging
        if (!animStateRef.current.isDragging) {
          animStateRef.current.targetRotY += normX * 0.0008;
          animStateRef.current.targetRotX -= normY * 0.0006;
          animStateRef.current.targetRotX = Math.max(
            -Math.PI / 3,
            Math.min(Math.PI / 3, animStateRef.current.targetRotX)
          );
        }
      }

      if (!animStateRef.current.isDragging) {
        wakeLoop();
        return;
      }

      const dx = e.clientX - animStateRef.current.lastMouseX;
      const dy = e.clientY - animStateRef.current.lastMouseY;
      animStateRef.current.lastMouseX = e.clientX;
      animStateRef.current.lastMouseY = e.clientY;

      animStateRef.current.targetRotY += dx * 0.007;
      animStateRef.current.targetRotX += dy * 0.007;

      animStateRef.current.targetRotX = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, animStateRef.current.targetRotX)
      );
      wakeLoop();
    };

    const handlePointerUp = () => {
      animStateRef.current.isDragging = false;
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Render loop
    let frameId = 0;
    let lastTime = performance.now();
    let isLoopRunning = false;

    const updateMaterialsForFinish = (fKey: MetalFinish) => {
      const f = FINISHES[fKey];
      metalMaterial.color.setHex(f.color);
      metalMaterial.metalness = f.metalness;
      metalMaterial.roughness = f.roughness;

      polishedMetalMaterial.color.setHex(f.color);
      secondHandMat.color.setHex(f.handsColor);
    };

    let prevFinishKey = animStateRef.current.finish;

    function tick() {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const state = animStateRef.current;

      if (state.finish !== prevFinishKey) {
        prevFinishKey = state.finish;
        updateMaterialsForFinish(state.finish);
      }

      state.currentRotX = THREE.MathUtils.damp(state.currentRotX, state.targetRotX, 8, dt);
      state.currentRotY = THREE.MathUtils.damp(state.currentRotY, state.targetRotY, 8, dt);
      state.currentExploded = THREE.MathUtils.damp(state.currentExploded, state.targetExploded, 6, dt);
      state.currentCamZ = THREE.MathUtils.damp(state.currentCamZ, state.targetCamZ, 5, dt);
      state.currentCamY = THREE.MathUtils.damp(state.currentCamY, state.targetCamY, 5, dt);

      camera.position.z = state.currentCamZ;
      camera.position.y = state.currentCamY;

      if (!state.isDragging && state.isPlaying) {
        state.targetRotY += 0.003 * state.speedMultiplier;
      }

      watchRoot.rotation.x = state.currentRotX;
      watchRoot.rotation.y = state.currentRotY;

      if (state.isPlaying) {
        const spd = state.speedMultiplier;
        state.balanceAngle = Math.sin(now * 0.024 * spd) * 0.85;
        balanceWheelGroup.rotation.z = state.balanceAngle;

        state.secondAngle -= dt * (Math.PI / 30) * spd;
        secondHandGroup.rotation.z = state.secondAngle;

        state.minuteAngle -= dt * (Math.PI / 1800) * spd;
        minuteHandGroup.rotation.z = state.minuteAngle;

        state.hourAngle -= dt * (Math.PI / 21600) * spd;
        hourHandGroup.rotation.z = state.hourAngle;

        rotorMesh.rotation.z = Math.sin(now * 0.002 * spd) * 1.2;
      }

      const exp = state.currentExploded;
      crystalLayer.position.z = 0.23 + exp * 2.2;
      bezelLayer.position.z = 0.21 + exp * 1.6;
      handsLayer.position.z = 0.08 + exp * 1.1;
      escapementLayer.position.z = 0.06 + exp * 0.75;
      dialLayer.position.z = 0.04 + exp * 0.45;
      caseLayer.position.z = 0;
      movementLayer.position.z = -0.06 - exp * 0.5;
      rotorLayer.position.z = -0.12 - exp * 1.0;
      casebackLayer.position.z = -0.18 - exp * 1.6;

      // Render with postprocessing bloom if available, otherwise fallback
      if (composer && !isSoftwareGl) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }

      const isSettling =
        Math.abs(state.currentRotX - state.targetRotX) > 0.0005 ||
        Math.abs(state.currentRotY - state.targetRotY) > 0.0005 ||
        Math.abs(state.currentExploded - state.targetExploded) > 0.0005 ||
        Math.abs(state.currentCamZ - state.targetCamZ) > 0.0005 ||
        Math.abs(state.currentCamY - state.targetCamY) > 0.0005;

      if (state.isPlaying || state.isDragging || isSettling) {
        if (isSoftwareGl) {
          frameId = window.setTimeout(tick, 60);
        } else {
          frameId = requestAnimationFrame(tick);
        }
      } else {
        isLoopRunning = false;
      }
    }

    function wakeLoop() {
      if (!isLoopRunning) {
        isLoopRunning = true;
        lastTime = performance.now();
        tick();
      }
    }
    wakeRenderLoopRef.current = wakeLoop;

    // Render initial frame synchronously, then loop
    isLoopRunning = true;
    tick();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (composer) {
        composer.setSize(w, h);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasDom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      if (composer) {
        composer.dispose();
      }
      renderer.dispose();
      studioEnvMap.dispose();
      if (canvasDom.parentElement) {
        canvasDom.parentElement.removeChild(canvasDom);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-[620px] lg:h-[720px] flex items-center justify-center overflow-hidden select-none bg-radial-vignette rounded-2xl border border-white/10"
      data-testid="watch-3d-viewport"
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D Luxury Mechanical Watch Viewport"
      />

      {/* Top Left Minimal Spec Overlay */}
      <div className="absolute top-6 left-6 pointer-events-none z-10 flex flex-col gap-1">
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#d4af37] uppercase">
          In-House Calibre 3200 · 28,800 VPH · Hand-Finished
        </span>
        <h2 className="text-xl font-serif text-white tracking-wide">
          CHRONOSPECTRE ESCAPEMENT
        </h2>
        <span className="text-xs text-zinc-400 font-sans">
          Click & Drag to Rotate · Scroll to Inspect
        </span>
      </div>

      {/* Top Right Quick Reset */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
        <button
          onClick={() => {
            setExploded(0);
            handleCameraPreset('angle');
          }}
          className="p-2.5 rounded-lg bg-[#101015]/90 hover:bg-[#1a1a22] text-zinc-300 hover:text-[#f5eedb] border border-white/10 transition-colors cursor-pointer"
          title="Reset View"
          aria-label="Reset View"
        >
          <RotateCcw className="w-4 h-4 text-[#d4af37]" />
        </button>
      </div>

      {/* Unified Ergonomic Bottom Control Dock */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl transition-transform duration-300 ${
          isDockCollapsed ? 'translate-y-[calc(100%-2.25rem)]' : 'translate-y-0'
        }`}
      >
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono tracking-wider uppercase text-zinc-300 hover:text-white bg-[#0e0e12]/95 hover:bg-[#181820] rounded-t-lg border-t border-x border-white/10 transition-colors cursor-pointer"
            aria-label={isDockCollapsed ? 'Expand 3D Controls' : 'Collapse 3D Controls'}
          >
            {isDockCollapsed ? (
              <>
                <span>Expand Controls</span>
                <ChevronUp className="w-3.5 h-3.5 text-[#d4af37]" />
              </>
            ) : (
              <>
                <span>Cinema View</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />
              </>
            )}
          </button>
        </div>

        <div className="glass-panel-deep rounded-xl p-3 md:p-4 backdrop-blur-md shadow-2xl flex flex-col gap-3 border border-white/10 border-t-[#d4af37]/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 whitespace-nowrap">
                <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Exploded View:</span>
                <span className="text-[#f5eedb] font-semibold tabular-nums w-8">
                  {Math.round(exploded * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={exploded}
                onChange={(e) => setExploded(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                aria-label="Exploded mechanism view percentage"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                  isPlaying
                    ? 'bg-[#d4af37]/25 text-[#f5eedb] border-[#d4af37]/60'
                    : 'bg-[#121216] text-zinc-400 border-white/10 hover:text-white'
                }`}
                title={isPlaying ? 'Pause Mechanism' : 'Start Mechanism'}
                aria-label={isPlaying ? 'Pause Mechanism' : 'Start Mechanism'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 0.35 : 1)}
                className={`px-2 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                  speedMultiplier < 1
                    ? 'bg-[#d4af37]/30 text-[#f5eedb] border-[#d4af37]/60'
                    : 'bg-[#121216] text-zinc-400 border-white/10 hover:text-white'
                }`}
                aria-label="Toggle slow-motion horological speed"
              >
                {speedMultiplier < 1 ? 'Slow-Mo (0.35x)' : 'Realtime (1.0x)'}
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 w-full md:w-auto">
              <span className="text-zinc-400 font-mono tracking-wider uppercase mr-1">
                Finish:
              </span>
              <div className="flex items-center gap-1 bg-[#101015] p-1 rounded-lg border border-white/10">
                {(Object.keys(FINISHES) as MetalFinish[]).map((fKey) => (
                  <button
                    key={fKey}
                    onClick={() => setFinish(fKey)}
                    className={`px-2.5 py-1 rounded font-medium transition-all cursor-pointer ${
                      finish === fKey
                        ? 'bg-[#d4af37]/25 text-[#f5eedb] border border-[#d4af37]/50 shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-[#181820]'
                    }`}
                    aria-label={`Select ${FINISHES[fKey].name} finish`}
                  >
                    {FINISHES[fKey].name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 w-full md:w-auto justify-end">
              <span className="text-zinc-400 font-mono tracking-wider uppercase mr-1">
                Perspective:
              </span>
              <div className="flex items-center gap-1 bg-[#101015] p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => handleCameraPreset('angle')}
                  className={`px-2 py-1 rounded font-medium transition-all cursor-pointer ${
                    activeView === 'angle'
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                  aria-label="Perspective studio view"
                >
                  Angled
                </button>
                <button
                  onClick={() => handleCameraPreset('dial')}
                  className={`px-2 py-1 rounded font-medium transition-all cursor-pointer ${
                    activeView === 'dial'
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                  aria-label="Direct dial macro view"
                >
                  Dial Face
                </button>
                <button
                  onClick={() => handleCameraPreset('escapement')}
                  className={`px-2 py-1 rounded font-medium transition-all cursor-pointer ${
                    activeView === 'escapement'
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                  aria-label="Escapement close-up view"
                >
                  Escapement
                </button>
                <button
                  onClick={() => handleCameraPreset('profile')}
                  className={`px-2 py-1 rounded font-medium transition-all cursor-pointer ${
                    activeView === 'profile'
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                  aria-label="Profile and crown view"
                >
                  Crown Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
