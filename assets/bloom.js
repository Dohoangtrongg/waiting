(function () {
  const rand = (a, b) => a + Math.random() * (b - a);

  // Bầu trời sao lấp lánh
  const sky = document.createElement("div");
  sky.className = "sky";
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("div");
    s.className = "star";
    s.style.left = rand(0, 100) + "%";
    s.style.top = rand(0, 85) + "%";
    s.style.setProperty("--s", rand(1, 3) + "px");
    s.style.setProperty("--t", rand(1.5, 4) + "s");
    s.style.setProperty("--d", rand(0, 3) + "s");
    sky.appendChild(s);
  }
  document.body.appendChild(sky);

  // Hạt lấp lánh + sóng lan ra tại tâm bông hoa
  const colors = ["#ff9ecb", "#ffd1e6", "#fff2a8", "#ffffff", "#ff6fae"];
  function burst(el) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height * 0.3;

    const ring = document.createElement("div");
    ring.className = "ring";
    ring.style.left = cx + "px";
    ring.style.top = cy + "px";
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 1500);

    for (let i = 0; i < 26; i++) {
      const g = document.createElement("div");
      g.className = "glint";
      const a = rand(0, Math.PI * 2);
      const d = rand(8, 24);
      g.style.left = cx + "px";
      g.style.top = cy + "px";
      g.style.setProperty("--sz", rand(0.6, 1.5) + "vmin");
      g.style.setProperty("--c", colors[Math.floor(Math.random() * colors.length)]);
      g.style.setProperty("--dx", Math.cos(a) * d + "vmin");
      g.style.setProperty("--dy", Math.sin(a) * d - 4 + "vmin");
      g.style.setProperty("--dur", rand(1.1, 2) + "s");
      document.body.appendChild(g);
      setTimeout(() => g.remove(), 2200);
    }
  }

  // Cánh hoa rơi nhẹ nhàng
  function fallPetal() {
    const p = document.createElement("div");
    p.className = "fall-petal";
    const dur = rand(7, 12);
    p.style.left = rand(0, 100) + "vw";
    p.style.setProperty("--sz", rand(1, 2.2) + "vmin");
    p.style.setProperty("--sway", rand(-12, 12) + "vw");
    p.style.setProperty("--dur", dur + "s");
    document.body.appendChild(p);
    setTimeout(() => p.remove(), dur * 1000 + 100);
  }

  window.addEventListener("load", () => {
    // Thời điểm mỗi bông nở rộ: delay của .flower__leafs--N + ~1.4s
    [1.1, 1.4, 1.7].forEach((delay, i) => {
      const el = document.querySelector(".flower__leafs--" + (i + 1));
      setTimeout(() => el && burst(el), (delay + 1.4) * 1000);
    });

    setTimeout(() => {
      const t = document.querySelector(".title");
      if (t) t.classList.add("show");
      setInterval(fallPetal, 500);
    }, 4200);
  });
})();
