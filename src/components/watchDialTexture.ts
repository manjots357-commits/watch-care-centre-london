import * as THREE from 'three';

/**
 * Generates an ultra-sharp, high-contrast mechanical dial texture
 * with sunburst guilloché patterns, chapter rings, sub-dials, and Swiss-style typography.
 */
export function createWatchDialTexture(): THREE.CanvasTexture {
  const size = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.47;

  // 1. Fill entire dial canvas with dark rose gold charcoal sunburst gradient
  const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, radius);
  bgGrad.addColorStop(0, '#27161e');
  bgGrad.addColorStop(0.35, '#1b0d15');
  bgGrad.addColorStop(0.75, '#12070e');
  bgGrad.addColorStop(1, '#090406');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // 2. Sunburst Radial Rays (Guilloché sunray finish)
  ctx.save();
  for (let i = 0; i < 180; i++) {
    const angle = (i / 180) * Math.PI * 2;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(245, 206, 199, 0.045)' : 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Concentric Guilloché rings
  ctx.save();
  ctx.strokeStyle = 'rgba(229, 164, 155, 0.12)';
  ctx.lineWidth = 1.5;
  for (let r = 120; r < radius - 40; r += 24) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Outer Track / Chapter Ring (Rose Gold dual rails)
  ctx.save();
  ctx.strokeStyle = 'rgba(229, 164, 155, 0.9)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 25, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 80, 0, Math.PI * 2);
  ctx.stroke();

  // Minute & Second Ticks (300 ticks)
  for (let i = 0; i < 300; i++) {
    const angle = (i / 300) * Math.PI * 2 - Math.PI / 2;
    const isFiveMin = i % 25 === 0;
    const isMinute = i % 5 === 0;

    const inR = isFiveMin ? radius - 75 : isMinute ? radius - 60 : radius - 45;
    const outR = radius - 25;

    ctx.strokeStyle = isFiveMin
      ? '#e5a49b' // Rose gold 5-min major tick
      : isMinute
      ? '#ffffff'
      : 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = isFiveMin ? 5 : isMinute ? 3 : 1.5;

    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * inR, cy + Math.sin(angle) * inR);
    ctx.lineTo(cx + Math.cos(angle) * outR, cy + Math.sin(angle) * outR);
    ctx.stroke();

    // Arabic numbers on 5-min intervals (05, 10, 15, ..., 60)
    if (isFiveMin && i > 0) {
      const numR = radius - 110;
      const secNum = String((i / 5) % 60 || 60).padStart(2, '0');
      ctx.fillStyle = '#fae0dc';
      ctx.font = '600 24px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(secNum, cx + Math.cos(angle) * numR, cy + Math.sin(angle) * numR);
    }
  }
  ctx.restore();

  // 5. 12 Faceted 3D Metallic Baton Hour Appliqués
  for (let h = 0; h < 12; h++) {
    if (h === 6) continue; // Open heart escapement at 6 o'clock

    const angle = (h / 12) * Math.PI * 2 - Math.PI / 2;
    const markerR = radius - 165;
    const mx = cx + Math.cos(angle) * markerR;
    const my = cy + Math.sin(angle) * markerR;

    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(angle + Math.PI / 2);

    if (h === 0) {
      // 12 o'clock double faceted baton
      drawBaton(ctx, -22, -50, 16, 100);
      drawBaton(ctx, 6, -50, 16, 100);
    } else {
      drawBaton(ctx, -8, -45, 16, 90);
    }
    ctx.restore();
  }

  // 6. Brand Inscription & Atelier Certification
  ctx.save();
  ctx.textAlign = 'center';

  // Rose Gold Coronet / Atelier Insignia
  ctx.fillStyle = '#fae0dc';
  ctx.font = 'bold 36px serif';
  ctx.fillText('♛', cx, cy - 320);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 46px "Times New Roman", Times, Georgia, serif';
  ctx.fillText('WATCH CARE CENTRE', cx, cy - 250);

  ctx.fillStyle = '#e5a49b';
  ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('L O N D O N', cx, cy - 200);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = '600 22px "Courier New", Courier, monospace';
  ctx.fillText('CHURCH STREET ATELIER', cx, cy - 155);

  ctx.fillStyle = 'rgba(229, 164, 155, 0.95)';
  ctx.font = '500 18px "Courier New", Courier, monospace';
  ctx.fillText('SUPERLATIVE CHRONOMETER · 28,800 VPH', cx, cy - 118);

  ctx.restore();

  // 7. Sub-Dial 1: 3 o'clock (30-Minute Chronograph)
  drawSubDial(ctx, cx + 330, cy + 20, 160, '30 MIN', 30);

  // 8. Sub-Dial 2: 9 o'clock (Continuous Seconds)
  drawSubDial(ctx, cx - 330, cy + 20, 160, '60 SEC', 60);

  // 9. Open-Heart Inscription at 6 o'clock
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fae0dc';
  ctx.font = 'bold 22px "Courier New", Courier, monospace';
  ctx.fillText('ESCAPEMENT TOURBILLON', cx, cy + 420);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('SWISS CALIBRE REGULATION', cx, cy + 452);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function drawBaton(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  // Bevel outer shadow
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(x - 2, y - 2, width + 4, height + 4);

  // Polished rose gold gradient
  const grad = ctx.createLinearGradient(x, y, x + width, y);
  grad.addColorStop(0, '#fae0dc');
  grad.addColorStop(0.3, '#e5a49b');
  grad.addColorStop(0.7, '#87434e');
  grad.addColorStop(1, '#fae0dc');
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, width, height);

  // Luminous core stripe (Swiss Super-LumiNova)
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(x + 3, y + 6, width - 6, height - 12);
}

function drawSubDial(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  label: string,
  divisions: number
) {
  ctx.save();

  // Recessed disc with concentric azurage snailing in dark rose gold
  const grad = ctx.createRadialGradient(x, y, 5, x, y, radius);
  grad.addColorStop(0, '#221118');
  grad.addColorStop(0.8, '#140a0f');
  grad.addColorStop(1, '#0a0407');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Azurage micro-grooves
  ctx.strokeStyle = 'rgba(229, 164, 155, 0.08)';
  ctx.lineWidth = 1;
  for (let r = 15; r < radius; r += 10) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Polished rose gold rim
  ctx.strokeStyle = '#e5a49b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Subdial ticks
  for (let i = 0; i < divisions; i += (divisions === 60 ? 5 : 2.5)) {
    const angle = (i / divisions) * Math.PI * 2 - Math.PI / 2;
    const isMajor = i % (divisions === 60 ? 15 : 10) === 0;
    const inR = isMajor ? radius - 24 : radius - 14;
    ctx.strokeStyle = isMajor ? '#fae0dc' : 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = isMajor ? 3 : 1.5;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(angle) * inR, y + Math.sin(angle) * inR);
    ctx.lineTo(x + Math.cos(angle) * (radius - 4), y + Math.sin(angle) * (radius - 4));
    ctx.stroke();

    if (isMajor) {
      const numR = radius - 40;
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 20px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i), x + Math.cos(angle) * numR, y + Math.sin(angle) * numR);
    }
  }

  // Subdial Label
  ctx.fillStyle = '#e5a49b';
  ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.textAlign = 'center';
  ctx.fillText(label, x, y + 54);

  // Blued Steel Sub-Hand
  const handAngle = divisions === 60 ? 0.65 : 1.4;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + radius * 0.6 * Math.cos(handAngle), y + radius * 0.6 * Math.sin(handAngle));
  ctx.stroke();

  // Center pivot
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
