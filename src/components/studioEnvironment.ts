import * as THREE from 'three';

/**
 * Creates an ultra-reliable, high-dynamic studio reflection environment map
 * with dual overhead softboxes, warm key light strip, and cool rim reflections.
 * Uses EquirectangularReflectionMapping so it renders instantly on all WebGL
 * implementations without expensive multi-pass PMREM cubemap generation.
 */
export function createStudioEnvironmentMap(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const dummy = new THREE.CanvasTexture(canvas);
    return dummy;
  }

  // Base dark studio gradient with subtle ambient
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#1a1c23');
  bg.addColorStop(0.45, '#0d0e12');
  bg.addColorStop(0.55, '#08080a');
  bg.addColorStop(1, '#050507');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Softbox 1: Large Warm Overhead Studio Softbox (creates long metallic specular highlight)
  const sb1 = ctx.createRadialGradient(width * 0.45, height * 0.22, 10, width * 0.45, height * 0.22, 220);
  sb1.addColorStop(0, 'rgba(255, 250, 240, 1.0)');
  sb1.addColorStop(0.3, 'rgba(255, 235, 200, 0.85)');
  sb1.addColorStop(0.7, 'rgba(212, 175, 55, 0.25)');
  sb1.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sb1;
  ctx.fillRect(0, 0, width, height * 0.55);

  // Softbox 2: Sharp Cool Secondary Rim Softbox (left side)
  const sb2 = ctx.createRadialGradient(width * 0.15, height * 0.4, 5, width * 0.15, height * 0.4, 160);
  sb2.addColorStop(0, 'rgba(224, 242, 254, 0.95)');
  sb2.addColorStop(0.4, 'rgba(125, 211, 252, 0.5)');
  sb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sb2;
  ctx.fillRect(0, 0, width * 0.35, height);

  // Softbox 3: Razor Sharp Specular Strip (right side)
  const sb3 = ctx.createLinearGradient(width * 0.75, 0, width * 0.88, 0);
  sb3.addColorStop(0, 'rgba(0, 0, 0, 0)');
  sb3.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
  sb3.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sb3;
  ctx.fillRect(width * 0.75, height * 0.1, width * 0.15, height * 0.8);

  // Horizontal horizon highlight
  const horizon = ctx.createLinearGradient(0, height * 0.48, 0, height * 0.52);
  horizon.addColorStop(0, 'rgba(255, 255, 255, 0)');
  horizon.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)');
  horizon.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = horizon;
  ctx.fillRect(0, height * 0.45, width, height * 0.1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
