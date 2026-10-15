"use client";

import { useRef, useEffect } from "react";

const SCOPED_CSS = `
/* === Base / Phone Frame === */
.hero-anim {
  --ha-bg:#ffffff; --ha-ink:#0f1b2a; --ha-muted:#5b6675; --ha-line:#e3e8ef;
  --ha-brand:#1c72b8; --ha-brand-soft:#e8f1fa;
}
.hero-anim .stage{display:flex;justify-content:center;max-width:100%}
.hero-anim .phone{position:relative;background:transparent;box-shadow:0 0 0 3px #333;overflow:hidden}
.hero-anim .screen{position:relative;overflow:hidden;background:#f8f7fa}
.hero-anim .ui{position:absolute;left:0;top:0;width:402px;height:874px;transform-origin:0 0;overflow:hidden;
  font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Inter",system-ui,sans-serif;color:#111318;letter-spacing:-.01em;-webkit-font-smoothing:antialiased}
.hero-anim .ui *{box-sizing:border-box}
.hero-anim .a{position:absolute}
.hero-anim .status{position:absolute;left:0;top:0;width:402px;height:54px;z-index:50;pointer-events:none}
.hero-anim .status .time{position:absolute;left:30px;top:21px;width:46px;text-align:center;font-size:17px;font-weight:600;letter-spacing:-.02em}
.hero-anim .island{position:absolute;left:138px;top:14px;width:125px;height:37px;border-radius:19px;background:#000}

/* === Scene transitions === */
.hero-anim .scene{position:absolute;inset:0;background:#f8f7fa;visibility:hidden;transform:translateX(100%);transition:transform .5s cubic-bezier(.3,.8,.25,1),visibility 0s .5s;z-index:1}
.hero-anim .scene.on{visibility:visible;transform:none;z-index:2;transition:transform .5s cubic-bezier(.3,.8,.25,1)}
.hero-anim .scene.off{visibility:visible;transform:translateX(-30%);z-index:1;transition:transform .5s cubic-bezier(.3,.8,.25,1)}
.hero-anim .scene.off::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,.08)}
.hero-anim .scene.instant,.hero-anim .scene.instant.on,.hero-anim .scene.instant.off{transition:none}
.hero-anim .scene.instant.off::after{display:none}

/* === Navigation === */
.hero-anim .backc{left:12px;top:69px;width:36px;height:36px;border-radius:50%;background:#e3ecf6;display:grid;place-items:center}
.hero-anim .ntitle{left:0;width:402px;top:76px;text-align:center;font-size:17px;font-weight:600;line-height:22px}

/* === Common UI === */
.hero-anim .lbl{font-size:11px;font-weight:500;letter-spacing:.07em;text-transform:uppercase;color:#6e7278;line-height:13px}
.hero-anim .card{background:#fff;border-radius:14px;border:1px solid #eceef2;box-shadow:0 1px 2px rgba(16,24,40,.04)}
.hero-anim .fill{background:#f0f4f8;border-radius:10px}
.hero-anim .btn{border-radius:12px;background:#1c72b8;color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:600;transition:transform .15s,background .2s,opacity .25s}
.hero-anim .btn.dim{opacity:.5}
.hero-anim .btn.press{transform:scale(.97);background:#3d86c1}
.hero-anim .micc{width:30px;height:30px;border-radius:50%;background:#f0f4f8;border:1px solid #e3e7ee;display:grid;place-items:center}
.hero-anim .caret{display:inline-block;width:2px;height:18px;background:#1c72b8;vertical-align:-4px;margin-left:1px;animation:ha-blink 1s steps(1) infinite}
@keyframes ha-blink{50%{opacity:0}}
.hero-anim .ph{color:#9ca3af}
.hero-anim .pop{opacity:0;transform:translateY(8px);transition:opacity .35s,transform .35s}
.hero-anim .pop.in{opacity:1;transform:none}
.hero-anim .ico{object-fit:contain}
.hero-anim .scard{left:20px;width:360px;background:#fff;border:1px solid #eceef2;border-radius:12px;box-shadow:0 1px 3px rgba(16,24,40,.05)}
.hero-anim .pill2{height:28px;border-radius:14px;background:#e3ecf6;display:flex;align-items:center;gap:5px;padding:0 10px;font-size:13px;font-weight:500;color:#1c72b8}
.hero-anim .dim{position:absolute;inset:0;background:rgba(0,0,0,.28);opacity:0;transition:opacity .4s;z-index:20;pointer-events:none}
.hero-anim .dim.on{opacity:1}
.hero-anim .sheet{position:absolute;left:0;width:402px;transform:translateY(105%);transition:transform .55s cubic-bezier(.2,.85,.25,1);z-index:30;overflow:hidden}
.hero-anim .sheet.up{transform:none}
.hero-anim .tap{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(120,130,145,.32);pointer-events:none;opacity:0;z-index:60}
.hero-anim .tap.go{animation:ha-tap .5s ease-out}
@keyframes ha-tap{0%{opacity:0;transform:scale(.4)}30%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.35)}}

/* === Tabs (insights segments) === */
.hero-anim .tabs{left:0;width:402px;height:44px;display:flex;background:#fff;border-bottom:1px solid #e9ebef}
.hero-anim .tabs span{flex:1;display:flex;align-items:center;justify-content:center;font-size:14px;color:#6b7280}
.hero-anim .tabs span.act{color:#1c72b8;font-weight:600;border-bottom:2.5px solid #1c72b8}

/* === Evidence dots === */
.hero-anim .edots{display:inline-flex;gap:1px;vertical-align:-1px;width:90px}
.hero-anim .edots i{flex:1;height:3.5px;border-radius:1.5px}
.hero-anim .edots i.eh{background:#db2425}
.hero-anim .edots i.eo{background:#e9962e}
.hero-anim .edots i.ey{background:#eab308}
.hero-anim .edots i.eg{background:#9ca3af}
.hero-anim .edots i.em{background:#e3e7ee}
.hero-anim .edots.wide{width:100%}
.hero-anim .edots.wide i{height:8px;border-radius:3px}

/* === Symptom chips === */
.hero-anim .chip{height:24px;border-radius:12px;padding:0 8px;display:flex;align-items:center;gap:4px;font-size:11px;font-weight:500;border:1.5px solid #d32e30;background:#fdeaea;color:#bc211c}
.hero-anim .chip.am{border-color:#e9962e;background:#fef1e0;color:#d06c00}
.hero-anim .chip-ico{width:14px;height:14px;border-radius:50%;object-fit:cover;flex-shrink:0}

/* === Score ring animation === */
.hero-anim .ring-arc{transition:stroke-dashoffset .8s ease-out}

/* === Bottom CTA bar === */
.hero-anim .ctabar{left:20px;width:362px;background:#e8f1fa;border:1px solid #d0dfef;border-radius:12px;display:flex;align-items:center;padding:14px 16px;gap:10px}

/* === Score bar (evidence) === */
.hero-anim .sbar{height:8px;border-radius:4px;background:#f0f4f8;overflow:hidden}
.hero-anim .sbar i{display:block;height:100%;width:0;background:#db2425;border-radius:4px;transition:width 1s ease}

/* === Success banner === */
.hero-anim .succb{background:#ecfdf5;border:1px solid #bbf7d0;border-radius:10px;display:flex;align-items:center;gap:8px;padding:10px 14px;font-size:13px;color:#16a34a;font-weight:500}

/* === Alert banner === */
.hero-anim .alertb{background:#fef2f2;border:1px solid #fca5a5;border-radius:12px;display:flex;align-items:center;gap:10px;padding:12px 14px;font-size:14px;color:#dc2626;font-weight:600}

/* === Ingredient rows === */
.hero-anim .ingrow{display:flex;align-items:center;height:46px;border-bottom:1px solid #f3f4f6;padding:0 4px}
.hero-anim .inic{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-size:20px;margin-right:12px;flex-shrink:0}
.hero-anim .ingrow span{flex:1;font-size:15px}
.hero-anim .xb{width:24px;height:24px;border-radius:50%;background:#e3ecf6;display:grid;place-items:center;flex-shrink:0}

/* === Category pills === */
.hero-anim .cpill{display:inline-flex;align-items:center;gap:4px;height:26px;padding:0 10px;border-radius:13px;font-size:12px;font-weight:500;background:#f0f1f3;color:#6b7280}

/* === Experiment phases === */
.hero-anim .phasec{flex:1;background:#e3ecf6;border-radius:12px;padding:12px 6px;text-align:center}
.hero-anim .phasec b{display:block;font-size:22px;color:#1c72b8;font-weight:700;line-height:1}
.hero-anim .phasec small{display:block;font-size:10px;color:#4b7ca8;line-height:1.3;margin-top:4px}

/* === Timeline (Log My Day review) === */
.hero-anim .tlm{font-size:11px;font-weight:600;color:#16a149;letter-spacing:.04em;text-transform:uppercase}
.hero-anim .rcard{background:#fff;border:1px solid #eceef2;border-radius:12px;box-shadow:0 1px 3px rgba(16,24,40,.05)}
.hero-anim .tli{display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid #f3f4f6}
.hero-anim .tli:last-child{border-bottom:none}
.hero-anim .tic{width:34px;height:34px;border-radius:8px;background:#f5f3f0;display:grid;place-items:center;font-size:20px;flex-shrink:0}
.hero-anim .tid{flex:1}
.hero-anim .tid b{font-size:14px;font-weight:600;display:block}
.hero-anim .tid small{font-size:12px;color:#6b7280}
.hero-anim .tlsym{display:flex;align-items:center;gap:10px;padding:8px 12px;background:#fff;border:1px solid #eceef2;border-radius:10px}
.hero-anim .tlsym.bad{}

/* === Highlighted trigger text === */
.hero-anim .hlt{color:#dc2626;font-weight:600}

/* === Reduced motion === */
@media (prefers-reduced-motion: reduce){.hero-anim .scene,.hero-anim .scene.on,.hero-anim .scene.off,.hero-anim .sheet,.hero-anim .pop,.hero-anim .sbar i,.hero-anim .dim,.hero-anim .ring-arc{transition-duration:.01s}.hero-anim .caret{animation:none}}

/* === Step indicators === */
#hero-steps{list-style:none;margin:0;padding:0}
#hero-steps li{display:grid;grid-template-columns:28px minmax(0,1fr);gap:10px;align-items:start;padding:8px 10px;border-radius:12px;transition:background .35s}
#hero-steps .num{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:600;border:1.5px solid #e3e8ef;color:#8a5a44;transition:all .35s;font-variant-numeric:tabular-nums}
#hero-steps b{display:block;font-size:14px;font-weight:600;line-height:28px;color:#8a5a44;transition:color .35s}
#hero-steps .wd{margin:0;font-size:13px;line-height:1.45;color:#8a5a44;max-height:0;opacity:0;overflow:hidden;transition:max-height .4s ease,opacity .3s ease}
#hero-steps li.on{background:#fff7ed}
#hero-steps li.on .num{background:#ea580c;border-color:#ea580c;color:#fff}
#hero-steps li.on b{color:#431407}
#hero-steps li.on .wd{max-height:10em;opacity:1;margin-top:2px}
#hero-steps li.done .num{border-color:#ea580c;color:#ea580c}
#hero-steps .wd.swap{opacity:0!important;transition:opacity .15s}

.mobile-dots{display:flex;gap:8px;align-items:center}
.mobile-dots .dot{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:600;border:1.5px solid #e3e8ef;color:#8a5a44;transition:all .35s}
.mobile-dots .dot.on{background:#ea580c;border-color:#ea580c;color:#fff}
.mobile-dots .dot.done{border-color:#ea580c;color:#ea580c}
.mobile-step-title{margin:0;font-size:14px;font-weight:600;color:#431407;text-align:center;transition:opacity .3s}
.mobile-step-title.swap{opacity:0!important;transition:opacity .15s}
.mobile-step-desc{margin:0;font-size:13px;line-height:1.4;color:#8a5a44;text-align:center;transition:opacity .3s;max-width:300px}
.mobile-step-desc.swap{opacity:0!important;transition:opacity .15s}
`;

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    fetch("/phone-content.html")
      .then((r) => r.text())
      .then((html) => {
        if (cancelled) return;
        container.innerHTML = html;
        runAnimation(container);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />
      <div ref={containerRef} className="hero-anim" />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
function runAnimation(container: HTMLElement) {
  const q = (id: string) => container.querySelector<HTMLElement>("#" + id);
  const ui = q("ui")!;
  const phone = q("phone")!;
  const screen = q("screen")!;
  const tapEl = q("tap")!;
  const stepsEl = document.getElementById("hero-steps");
  const steps = stepsEl ? ([...stepsEl.children] as HTMLElement[]) : [];
  const mobileDots = [
    ...document.querySelectorAll("#hero-steps-mobile .dot"),
  ] as HTMLElement[];
  const mobileTitle = document.getElementById("hero-steps-mobile-title");
  const mobileDesc = document.getElementById("hero-steps-mobile-desc");
  const STEP_TITLES = [
    "Your suspected triggers",
    "Snap your plate",
    "Catch up later",
    "See the proof",
    "Run an experiment",
    "Know before you eat",
  ];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let S = 1;

  function fit() {
    const pw = Math.min(
      250,
      window.innerWidth * 0.7,
      (phone.parentElement && phone.parentElement.clientWidth) || 340
    );
    const sw = pw;
    S = sw / 402;
    phone.style.width = pw + "px";
    phone.style.borderRadius = pw * 0.14 + "px";
    screen.style.width = sw + "px";
    screen.style.height = 874 * S + "px";
    ui.style.transform = "scale(" + S + ")";
  }
  window.addEventListener("resize", fit);
  fit();

  let run = 0;
  const sleep = (ms: number, r: number) =>
    new Promise<void>((res, rej) =>
      setTimeout(
        () => (r === run ? res() : rej("stop")),
        reduce ? Math.min(ms, 600) : ms
      )
    );

  let curStep = -1;
  function step(i: number) {
    steps.forEach((s, k) => {
      s.classList.toggle("on", k === i);
      s.classList.toggle("done", k < i);
    });
    mobileDots.forEach((d, k) => {
      d.classList.toggle("on", k === i);
      d.classList.toggle("done", k < i);
    });
    if (mobileTitle) {
      mobileTitle.classList.add("swap");
      setTimeout(() => {
        mobileTitle.textContent = STEP_TITLES[i] || "";
        mobileTitle.classList.remove("swap");
      }, 160);
    }
    curStep = i;
  }
  function say(i: number, text: string) {
    if (i !== curStep) step(i);
    const d = steps[i]?.querySelector(".wd") as HTMLElement | null;
    if (d && d.textContent !== text) {
      d.classList.add("swap");
      setTimeout(() => {
        d.textContent = text;
        d.classList.remove("swap");
      }, 160);
    }
    if (mobileDesc && mobileDesc.textContent !== text) {
      mobileDesc.classList.add("swap");
      setTimeout(() => {
        mobileDesc.textContent = text;
        mobileDesc.classList.remove("swap");
      }, 160);
    }
  }

  let cur: HTMLElement | null = null;
  function show(id: string) {
    const n = q(id)!;
    if (cur && cur !== n) {
      const old = cur;
      old.classList.remove("on");
      old.classList.add("off");
      setTimeout(() => old.classList.remove("off"), 520);
    }
    n.classList.remove("off");
    n.classList.add("on");
    cur = n;
  }

  function pos(el: Element) {
    const a = ui.getBoundingClientRect(),
      b = el.getBoundingClientRect();
    return {
      x: (b.left - a.left + b.width / 2) / S,
      y: (b.top - a.top + b.height / 2) / S,
    };
  }

  async function tap(el: Element, r: number) {
    const p = pos(el);
    tapEl.style.left = p.x + "px";
    tapEl.style.top = p.y + "px";
    tapEl.classList.remove("go");
    void tapEl.offsetWidth;
    tapEl.classList.add("go");
    (el as HTMLElement).classList.add("press");
    await sleep(170, r);
    (el as HTMLElement).classList.remove("press");
    await sleep(250, r);
  }

  async function type(
    el: HTMLElement,
    text: string,
    cps: number,
    r: number,
    btn?: HTMLElement | null
  ) {
    for (let i = 1; i <= text.length; i += reduce ? text.length : 1) {
      el.textContent = text.slice(0, i);
      const c = document.createElement("span");
      c.className = "caret";
      el.append(c);
      if (i >= 3 && btn) btn.classList.remove("dim");
      await sleep(1000 / cps, r);
    }
  }

  async function pops(list: NodeListOf<Element> | Element[], gap: number, r: number) {
    for (const p of list) {
      p.classList.add("in");
      await sleep(gap, r);
    }
  }

  async function animateRing(
    arcId: string,
    valId: string,
    target: number,
    r: number
  ) {
    const arc = q(arcId)!;
    const val = q(valId)!;
    const C = 131.95;
    const offset = C - (target / 100) * C;
    arc.style.strokeDashoffset = String(offset);
    const steps = reduce ? 1 : Math.ceil(target / 5);
    for (let v = 0; v <= target; v += Math.ceil(target / steps)) {
      val.textContent = String(Math.min(v, target));
      await sleep(30, r);
    }
    val.textContent = String(target);
  }

  function resetRings() {
    ["ring1", "ring2", "ring3", "ring4"].forEach((id) => {
      const arc = q(id + "a");
      const val = q(id + "v");
      if (arc) arc.style.strokeDashoffset = "131.95";
      if (val) val.textContent = "0";
    });
  }

  function reset() {
    steps.forEach((s) => {
      s.classList.remove("on", "done");
    });
    steps.forEach((s) => {
      const wd = s.querySelector(".wd");
      if (wd) wd.textContent = "";
    });
    mobileDots.forEach((d) => d.classList.remove("on", "done"));
    if (mobileTitle) mobileTitle.textContent = "";
    if (mobileDesc) mobileDesc.textContent = "";
    container.querySelectorAll(".pop").forEach((p) => p.classList.remove("in"));

    // Scene 1 rings
    resetRings();

    // Scene 3 text input
    if (q("t3"))
      q("t3")!.innerHTML = '<span class="ph">Describe your day...</span>';
    if (q("b3")) q("b3")!.classList.add("dim");
    if (q("spin3")) q("spin3")!.style.opacity = "0";

    // Evidence sheet (inside s1)
    if (q("evBar")) q("evBar")!.style.width = "0";
    if (q("evNum")) q("evNum")!.textContent = "0";
    if (q("evScroll")) q("evScroll")!.style.transform = "";
    if (q("sh1")) q("sh1")!.classList.remove("up");
    if (q("dim1")) q("dim1")!.classList.remove("on");

    // Scene 5 sheet
    if (q("sh5")) q("sh5")!.classList.remove("up");
    if (q("dim5")) q("dim5")!.classList.remove("on");

    // Scene transitions
    container
      .querySelectorAll(".scene")
      .forEach((s) => s.classList.remove("on", "off"));
  }

  async function play(r: number, from = 0) {
    reset();
    curStep = -1;

    if (from > 0) {
      // Set up prerequisites that earlier steps would have established
      if (from === 3) {
        // Evidence step needs insight cards/rings already visible on s1
        ['cd1','cd2','cd3','cd4','cta1'].forEach(id => { const el = q(id); if (el) el.classList.add('in'); });
        const C = 131.95;
        ([['ring1a','ring1v',85],['ring2a','ring2v',62],['ring3a','ring3v',38],['ring4a','ring4v',21]] as const).forEach(([a,v,t]) => {
          const arc = q(a), val = q(v);
          if (arc) arc.style.strokeDashoffset = String(C - (t / 100) * C);
          if (val) val.textContent = String(t);
        });
      }
    }

    if (from <= 0) {
    // === Step 1: Your suspected triggers ===
    say(
      0,
      "Your triggers, ranked by how likely each is, along with their associated symptoms."
    );
    show("s1");
    await sleep(800, r);

    // Pop cards + animate rings
    q("cd1")!.classList.add("in");
    await animateRing("ring1a", "ring1v", 85, r);
    await sleep(300, r);

    q("cd2")!.classList.add("in");
    await animateRing("ring2a", "ring2v", 62, r);
    await sleep(300, r);

    q("cd3")!.classList.add("in");
    await animateRing("ring3a", "ring3v", 38, r);
    await sleep(300, r);

    q("cd4")!.classList.add("in");
    await animateRing("ring4a", "ring4v", 21, r);
    await sleep(400, r);

    q("cta1")!.classList.add("in");
    await sleep(2500, r);
    }

    if (from <= 1) {
    // === Step 2: Snap your plate ===
    say(
      1,
      "Take a photo of your plate. The app identifies every ingredient and breaks them down into categories."
    );
    show("s2");
    await sleep(600, r);

    q("s2photo")!.classList.add("in");
    await sleep(400, r);
    q("s2head")!.classList.add("in");
    await sleep(300, r);
    q("s2succ")!.classList.add("in");
    await sleep(300, r);
    q("s2ih")!.classList.add("in");
    await sleep(200, r);

    await pops(
      [q("s2i1")!, q("s2i2")!, q("s2i3")!, q("s2i4")!],
      200,
      r
    );
    await sleep(200, r);
    q("s2more")!.classList.add("in");
    await sleep(200, r);
    q("s2cats")!.classList.add("in");
    await sleep(300, r);
    q("s2btn")!.classList.add("in");
    await sleep(2500, r);
    }

    if (from <= 2) {
    // === Step 3: Catch up later (Log My Day) ===
    say(
      2,
      "Describe your whole day in one message. Meals, snacks, symptoms \u2014 and we take care of the rest."
    );
    show("s3");
    await sleep(600, r);

    await type(
      q("t3")!,
      "For breakfast I had 2 eggs and half an avocado. Spinach salad for lunch, then some mild bloating. For dinner, cheeseburger and fries from in n out. Bad acid reflux a couple hours later.",
      55,
      r,
      q("b3")
    );
    await sleep(400, r);
    await tap(q("b3")!, r);
    q("spin3")!.style.opacity = "1";
    await sleep(1500, r);

    // Show review
    say(
      2,
      "Every meal and symptom is identified and ready for you to review."
    );
    show("s3r");
    await sleep(400, r);

    await pops(
      [q("tr1")!, q("tr2")!, q("tr3")!, q("tr4")!, q("tr5")!],
      300,
      r
    );
    await sleep(300, r);
    q("b3r")!.classList.add("in");
    await sleep(2000, r);
    }

    if (from <= 3) {
    // === Step 4: See the proof (evidence bottom sheet on insights) ===
    say(
      3,
      "Every trigger comes with a likelihood score and the exact symptom episodes behind it. Also, which foods caused those symptoms."
    );
    // Go back to insights page, then open evidence sheet
    show("s1");
    await sleep(600, r);
    await tap(q("cd1")!, r);
    q("dim1")!.classList.add("on");
    q("sh1")!.classList.add("up");
    await sleep(600, r);

    // Animate score
    q("evBar")!.style.width = "85%";
    for (let v = 0; v <= 85; v += 5) {
      q("evNum")!.textContent = String(v);
      await sleep(40, r);
    }
    q("evNum")!.textContent = "85";
    await sleep(600, r);

    q("evB")!.classList.add("in");
    await sleep(500, r);
    q("evG")!.classList.add("in");
    await sleep(500, r);
    q("evC")!.classList.add("in");
    await sleep(400, r);

    // Scroll down to show cramps description
    q("evScroll")!.style.transform = "translateY(-240px)";
    await sleep(600, r);
    q("evBtn")!.classList.add("in");
    await sleep(2000, r);

    // Close evidence sheet
    await tap(q("x1")!, r);
    q("sh1")!.classList.remove("up");
    q("dim1")!.classList.remove("on");
    await sleep(500, r);
    }

    if (from <= 4) {
    // === Step 5: Run an experiment ===
    say(
      4,
      "Run a guided experiment to confirm which triggers are real."
    );
    show("s5");
    await sleep(600, r);

    q("expRec")!.classList.add("in");
    await sleep(400, r);
    q("expGlu")!.classList.add("in");
    await sleep(400, r);
    q("expPast1")!.classList.add("in");
    await sleep(300, r);
    q("expPast2")!.classList.add("in");
    await sleep(500, r);

    // Tap dairy card -> show detail sheet
    await tap(q("expRec")!, r);
    q("dim5")!.classList.add("on");
    q("sh5")!.classList.add("up");
    await sleep(800, r);

    q("s5phases")!.classList.add("in");
    await sleep(1200, r);

    q("b5")!.classList.add("in");
    await sleep(400, r);
    q("s5not")!.classList.add("in");
    await sleep(1800, r);
    }

    if (from <= 5) {
    // === Step 6: Know before you eat ===
    say(
      5,
      "Scan any product and get an alert when it contains one of your triggers. Always be sure to check product packaging as well."
    );
    show("s6");
    await sleep(600, r);

    q("s6prod")!.classList.add("in");
    await sleep(500, r);
    q("s6alert")!.classList.add("in");
    await sleep(500, r);
    q("s6info")!.classList.add("in");
    await sleep(400, r);
    q("s6btn")!.classList.add("in");
    await sleep(3000, r);
    }
  }

  function showStepInstant(i: number) {
    reset();
    step(i);
    container.querySelectorAll('.scene').forEach(s => s.classList.add('instant'));

    function showScene(id: string) {
      const n = q(id)!;
      n.classList.add('on');
      cur = n;
    }
    function setRing(arcId: string, valId: string, target: number) {
      const arc = q(arcId), val = q(valId);
      if (arc) arc.style.strokeDashoffset = String(131.95 - (target / 100) * 131.95);
      if (val) val.textContent = String(target);
    }
    function popAll(ids: string[]) {
      ids.forEach(id => { const el = q(id); if (el) el.classList.add('in'); });
    }

    switch (i) {
      case 0:
        showScene('s1');
        popAll(['cd1','cd2','cd3','cd4','cta1']);
        setRing('ring1a','ring1v',85); setRing('ring2a','ring2v',62);
        setRing('ring3a','ring3v',38); setRing('ring4a','ring4v',21);
        say(0, "Your suspected triggers, ranked by evidence, with the symptoms that follow each one.");
        break;
      case 1:
        showScene('s2');
        popAll(['s2photo','s2head','s2succ','s2ih','s2i1','s2i2','s2i3','s2i4','s2more','s2cats','s2btn']);
        say(1, "Take a photo of your plate. The app identifies every ingredient and breaks them down into categories.");
        break;
      case 2:
        showScene('s3r');
        popAll(['tr1','tr2','tr3','tr4','tr5','b3r']);
        say(2, "Every meal and symptom is pulled out and put in time order for you to review.");
        break;
      case 3:
        showScene('s1');
        popAll(['cd1','cd2','cd3','cd4','cta1']);
        setRing('ring1a','ring1v',85); setRing('ring2a','ring2v',62);
        setRing('ring3a','ring3v',38); setRing('ring4a','ring4v',21);
        q('dim1')!.classList.add('on'); q('sh1')!.classList.add('up');
        q('evBar')!.style.width = '85%'; q('evNum')!.textContent = '85';
        popAll(['evB','evG','evC','evBtn']);
        say(3, "Every trigger comes with a score and the exact symptom episodes behind it.");
        break;
      case 4:
        showScene('s5');
        popAll(['expRec','expGlu','expPast1','expPast2']);
        q('dim5')!.classList.add('on'); q('sh5')!.classList.add('up');
        popAll(['s5phases','b5','s5not']);
        say(4, "Cut it out, bring it back, see how you react. Guided elimination in phases.");
        break;
      case 5:
        showScene('s6');
        popAll(['s6prod','s6alert','s6info','s6btn']);
        say(5, "Scan any product and get an alert when it contains one of your triggers.");
        break;
    }
    requestAnimationFrame(() => {
      container.querySelectorAll('.scene').forEach(s => s.classList.remove('instant'));
    });
  }

  let loopFrom = 0;

  function jumpTo(i: number) {
    loopFrom = i;
    run++;
    loop();
  }

  steps.forEach((s, i) => {
    s.style.cursor = 'pointer';
    s.addEventListener('click', () => jumpTo(i));
  });
  mobileDots.forEach((d, i) => {
    d.style.cursor = 'pointer';
    d.addEventListener('click', () => jumpTo(i));
  });

  async function loop() {
    const r = ++run;
    try {
      const from = loopFrom;
      loopFrom = 0;
      await play(r, from);
      while (r === run) {
        await play(r);
      }
    } catch (_) {
      /* animation cancelled */
    }
  }
  loop();
}
