import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.parentElement.offsetWidth * dpr;
      canvas.height = canvas.parentElement.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width / (window.devicePixelRatio || 1);
    const H = () => canvas.height / (window.devicePixelRatio || 1);

    // --- Hexagonal grid (lab / molecular) ---
    function drawHexGrid(time) {
      const w = W(), h = H();
      const size = 45;
      const cols = Math.ceil(w / (size * 1.73)) + 2;
      const rows = Math.ceil(h / (size * 1.5)) + 2;

      ctx.strokeStyle = 'rgba(196, 30, 58, 0.06)';
      ctx.lineWidth = 0.5;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * size * 1.73 + (row % 2) * size * 0.866;
          const y = row * size * 1.5;
          
          // Pulse effect
          const dist = Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2);
          const pulse = Math.sin(time * 0.8 - dist * 0.005) * 0.5 + 0.5;
          
          ctx.strokeStyle = `rgba(196, 30, 58, ${0.03 + pulse * 0.06})`;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = x + size * 0.4 * Math.cos(angle);
            const py = y + size * 0.4 * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();

          // Molecular node dots at vertices
          if (pulse > 0.7 && Math.random() > 0.97) {
            ctx.fillStyle = `rgba(201, 169, 78, ${pulse * 0.3})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // --- DNA Helix strands ---
    function drawDNA(time) {
      const w = W(), h = H();
      const helixX = w * 0.12;
      const amplitude = 30;
      const frequency = 0.025;

      for (let strand = 0; strand < 2; strand++) {
        ctx.beginPath();
        ctx.strokeStyle = strand === 0
          ? 'rgba(196, 30, 58, 0.12)'
          : 'rgba(201, 169, 78, 0.08)';
        ctx.lineWidth = 1.2;

        for (let y = 0; y < h; y += 2) {
          const phase = strand * Math.PI;
          const x = helixX + Math.sin(y * frequency + time * 1.2 + phase) * amplitude;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Cross-links (base pairs)
      ctx.strokeStyle = 'rgba(196, 30, 58, 0.06)';
      ctx.lineWidth = 0.5;
      for (let y = 20; y < h; y += 35) {
        const x1 = helixX + Math.sin(y * frequency + time * 1.2) * amplitude;
        const x2 = helixX + Math.sin(y * frequency + time * 1.2 + Math.PI) * amplitude;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }

      // Second helix on right side
      const helix2X = w * 0.88;
      for (let strand = 0; strand < 2; strand++) {
        ctx.beginPath();
        ctx.strokeStyle = strand === 0
          ? 'rgba(196, 30, 58, 0.1)'
          : 'rgba(201, 169, 78, 0.06)';
        ctx.lineWidth = 1;

        for (let y = 0; y < h; y += 2) {
          const phase = strand * Math.PI;
          const x = helix2X + Math.sin(y * frequency * 0.8 - time * 0.9 + phase) * (amplitude * 0.7);
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // --- Spartan shield / geometric war patterns ---
    function drawSpartanGeometry(time) {
      const w = W(), h = H();

      // Diagonal slash lines (war aesthetic)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 12; i++) {
        const x = (w / 12) * i + Math.sin(time * 0.3 + i) * 15;
        const opacity = 0.02 + Math.sin(time * 0.5 + i * 0.7) * 0.015;
        ctx.strokeStyle = `rgba(201, 169, 78, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 80, h);
        ctx.stroke();
      }

      // Chevron / V-shapes (Spartan inspired)
      const chevronY = h * 0.5;
      const chevronSize = 120;
      for (let i = 0; i < 3; i++) {
        const scale = 1 + i * 0.6;
        const pulse = Math.sin(time * 0.6 - i * 0.4) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(196, 30, 58, ${0.04 + pulse * 0.04})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w * 0.5 - chevronSize * scale, chevronY - 30 * scale);
        ctx.lineTo(w * 0.5, chevronY + 30 * scale);
        ctx.lineTo(w * 0.5 + chevronSize * scale, chevronY - 30 * scale);
        ctx.stroke();
      }

      // Circular shield rings (background, bottom-right area)
      const cx = w * 0.78, cy = h * 0.7;
      for (let i = 0; i < 4; i++) {
        const r = 40 + i * 25;
        const pulse = Math.sin(time * 0.4 + i) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(201, 169, 78, ${0.03 + pulse * 0.03})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Lambda (Λ) inside shield
      const lambdaSize = 18;
      const lambdaPulse = Math.sin(time * 0.5) * 0.5 + 0.5;
      ctx.strokeStyle = `rgba(196, 30, 58, ${0.08 + lambdaPulse * 0.08})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - lambdaSize, cy + lambdaSize * 0.8);
      ctx.lineTo(cx, cy - lambdaSize);
      ctx.lineTo(cx + lambdaSize, cy + lambdaSize * 0.8);
      ctx.stroke();
      // Horizontal bar of Λ
      ctx.beginPath();
      ctx.moveTo(cx - lambdaSize * 0.5, cy + lambdaSize * 0.1);
      ctx.lineTo(cx + lambdaSize * 0.5, cy + lambdaSize * 0.1);
      ctx.stroke();
    }

    // --- Floating particles (embers / lab sparks) ---
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * 2000,
        y: Math.random() * 1200,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.6 ? 'crimson' : 'gold',
        life: Math.random(),
      });
    }

    function drawParticles(time) {
      const w = W(), h = H();
      particles.forEach(p => {
        p.x += p.vx + Math.sin(time + p.life * 10) * 0.15;
        p.y += p.vy;
        p.life += 0.002;

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const alpha = Math.sin(p.life * Math.PI * 2) * 0.3 + 0.3;
        if (p.color === 'crimson') {
          ctx.fillStyle = `rgba(196, 30, 58, ${alpha * 0.5})`;
        } else {
          ctx.fillStyle = `rgba(201, 169, 78, ${alpha * 0.4})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // --- Scanning line (lab scanner effect) ---
    function drawScanLine(time) {
      const w = W(), h = H();
      const y = ((time * 40) % (h + 100)) - 50;
      const gradient = ctx.createLinearGradient(0, y - 30, 0, y + 30);
      gradient.addColorStop(0, 'rgba(196, 30, 58, 0)');
      gradient.addColorStop(0.5, 'rgba(196, 30, 58, 0.04)');
      gradient.addColorStop(1, 'rgba(196, 30, 58, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, y - 30, w, 60);
    }

    // --- Main render loop ---
    function render() {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      t += 0.016;

      drawHexGrid(t);
      drawDNA(t);
      drawSpartanGeometry(t);
      drawParticles(t);

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
