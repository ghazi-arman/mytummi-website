"use client";

import { useRef, useEffect } from "react";

const SCOPED_CSS = `
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
.hero-anim .scene{position:absolute;inset:0;background:#f8f7fa;visibility:hidden;transform:translateX(100%);transition:transform .5s cubic-bezier(.3,.8,.25,1),visibility 0s .5s;z-index:1}
.hero-anim .scene.on{visibility:visible;transform:none;z-index:2;transition:transform .5s cubic-bezier(.3,.8,.25,1)}
.hero-anim .scene.off{visibility:visible;transform:translateX(-30%);z-index:1;transition:transform .5s cubic-bezier(.3,.8,.25,1)}
.hero-anim .scene.off::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,.08)}
.hero-anim .scene.instant,.hero-anim .scene.instant.on,.hero-anim .scene.instant.off{transition:none}
.hero-anim .scene.instant.off::after{display:none}
.hero-anim .backc{left:12px;top:69px;width:36px;height:36px;border-radius:50%;background:#e3ecf6;display:grid;place-items:center}
.hero-anim .ntitle{left:0;width:402px;top:76px;text-align:center;font-size:17px;font-weight:600;line-height:22px}
.hero-anim .lbl{font-size:11px;font-weight:500;letter-spacing:.07em;text-transform:uppercase;color:#6e7278;line-height:13px}
.hero-anim .card{background:#fff;border-radius:14px;border:1px solid #eceef2;box-shadow:0 1px 2px rgba(16,24,40,.04)}
.hero-anim .fill{background:#f0f4f8;border-radius:10px}
.hero-anim .btn{border-radius:12px;background:#1c72b8;color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:600;transition:transform .15s,background .2s,opacity .25s}
.hero-anim .btn.dim{opacity:.5}
.hero-anim .btn.press{transform:scale(.97);background:#3d86c1}
.hero-anim .botbar{left:0;width:402px;background:#f8f7fa;border-top:1px solid #e9ebef}
.hero-anim .micc{width:30px;height:30px;border-radius:50%;background:#f0f4f8;border:1px solid #e3e7ee;display:grid;place-items:center}
.hero-anim .caret{display:inline-block;width:2px;height:18px;background:#1c72b8;vertical-align:-4px;margin-left:1px;animation:ha-blink 1s steps(1) infinite}
@keyframes ha-blink{50%{opacity:0}}
.hero-anim .ph{color:#9ca3af}
.hero-anim .pop{opacity:0;transform:translateY(8px);transition:opacity .35s,transform .35s}
.hero-anim .pop.in{opacity:1;transform:none}
.hero-anim .ico{object-fit:contain}
.hero-anim .irow{left:0;width:368px;height:53px;display:flex;align-items:center}
.hero-anim .irow img{position:absolute;left:20px;width:30px;height:30px}
.hero-anim .irow span{position:absolute;left:63px;font-size:15px}
.hero-anim .irow i{position:absolute;left:334px;width:16px;height:16px;border-radius:50%;background:#a3a8b0;display:grid;place-items:center}
.hero-anim .sep{height:1px;background:#eef0f3}
.hero-anim .chips{display:flex;gap:8px}
.hero-anim .chip{height:30px;border-radius:15px;padding:0 12px;display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;border:1.5px solid #d32e30;background:#fdeaea;color:#bc211c}
.hero-anim .chip::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.hero-anim .chip.am{border-color:#e9962e;background:#fef1e0;color:#d06c00}
.hero-anim .tlt{left:15px;width:36px;text-align:center;font-size:11px;line-height:12px;color:#6b7280}
.hero-anim .tlt small{display:block;font-size:10px}
.hero-anim .tld{left:23.5px;width:19px;height:19px;border-radius:50%;display:grid;place-items:center}
.hero-anim .rcard{left:59px;width:324px;background:#fff;border:1px solid #e9eaef;border-radius:12px;box-shadow:0 1px 3px rgba(16,24,40,.05)}
.hero-anim .mlbl{left:11px;top:11px;font-size:11px;font-weight:600;color:#16a149;letter-spacing:.03em}
.hero-anim .ritem{left:0;width:324px;height:44px}
.hero-anim .ritem img{position:absolute;left:12px;top:6px;width:34px;height:32px}
.hero-anim .ritem b{position:absolute;left:57px;top:2px;font-size:15px;font-weight:600}
.hero-anim .ritem small{position:absolute;left:57px;top:22px;font-size:13px;color:#6b7280}
.hero-anim .sev{width:34px;height:34px;border-radius:50%;background:#f0f4f8;display:grid;place-items:center;font-size:13px;color:#4b5563;border:1.5px solid transparent;transition:all .2s}
.hero-anim .sev.pick{border-color:#1c72b8;background:#e3ecf6;color:#1c72b8;font-weight:600}
.hero-anim .seg{left:16px;top:121px;width:370px;height:39px;background:#f0f4f8;border-radius:10px;padding:3px;display:grid;grid-template-columns:repeat(3,1fr)}
.hero-anim .seg span{display:grid;place-items:center;font-size:15px;color:#4b5563;border-radius:8px}
.hero-anim .seg span.act{background:#fff;color:#1c72b8;font-weight:600;box-shadow:0 1px 3px rgba(16,24,40,.1)}
.hero-anim .scard{left:20px;width:360px;background:#fff;border:1px solid #eceef2;border-radius:12px;box-shadow:0 1px 3px rgba(16,24,40,.05)}
.hero-anim .tagc{display:inline-flex;align-items:center;height:18px;padding:0 6px;border-radius:4px;font-size:11px;font-weight:500;background:#f6ede2;color:#c87f2a;margin-right:6px}
.hero-anim .ringv{width:44px;height:44px}
.hero-anim .dim{position:absolute;inset:0;background:rgba(0,0,0,.28);opacity:0;transition:opacity .4s;z-index:20;pointer-events:none}
.hero-anim .dim.on{opacity:1}
.hero-anim .sheet{position:absolute;left:0;width:402px;transform:translateY(105%);transition:transform .55s cubic-bezier(.2,.85,.25,1);z-index:30;overflow:hidden}
.hero-anim .sheet.up{transform:none}
.hero-anim .bar5{height:5px;border-radius:3px;background:#f0f4f8;overflow:hidden}
.hero-anim .bar5 i{display:block;height:100%;width:0;background:#db2425;border-radius:3px;transition:width 1.1s ease}
.hero-anim .segs{display:flex;gap:3px}
.hero-anim .segs i{flex:1;height:4px;border-radius:2px}
.hero-anim .tap{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(120,130,145,.32);pointer-events:none;opacity:0;z-index:60}
.hero-anim .tap.go{animation:ha-tap .5s ease-out}
@keyframes ha-tap{0%{opacity:0;transform:scale(.4)}30%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.35)}}
@media (prefers-reduced-motion: reduce){.hero-anim .scene,.hero-anim .scene.on,.hero-anim .scene.off,.hero-anim .sheet,.hero-anim .pop,.hero-anim .bar5 i,.hero-anim .dim{transition-duration:.01s}.hero-anim .caret{animation:none}}
.hero-anim .pill2{height:28px;border-radius:14px;background:#e3ecf6;display:flex;align-items:center;gap:5px;padding:0 10px;font-size:13px;font-weight:500;color:#1c72b8}
.hero-anim .tcard{left:59px;width:324px;border-radius:12px;border:1px solid #e9eaef;background:#fff;box-shadow:0 1px 3px rgba(16,24,40,.05);overflow:hidden}
.hero-anim .ttime{left:8px;font-size:11px;color:#6b7280;width:40px;text-align:center}
.hero-anim .hl{box-shadow:0 0 0 2px #1c72b8}
.hero-anim .ttime .dot{position:absolute;left:23.5px;top:29px;width:19px;height:19px;border-radius:50%;display:grid;place-items:center}
.hero-anim .tcard .kc{position:absolute;right:12px;top:11px;font-size:13px;color:#6b7280}
.hero-anim .tcard .mh{position:absolute;left:12px;top:12px;font-size:11.5px;font-weight:600;color:#16a149;letter-spacing:.02em}
.hero-anim .tab{position:absolute;top:792px;width:70px;text-align:center;font-size:12px;color:#8e96a3}
.hero-anim .tab svg{display:block;margin:0 auto 3px}
.hero-anim .tbox{position:absolute;left:11px;width:300px;height:42px;border-radius:8px;background:transparent;transition:background .6s}
.hero-anim .tcard.hl .tbox{background:#fff}
.hero-anim .tbox img{position:absolute;left:3px;top:5px;width:32px;height:32px;object-fit:contain}
.hero-anim .ttime .tl1{position:absolute;left:15px;width:36px;text-align:center;font-size:11px;line-height:12px;color:#6b7280;top:2px}
.hero-anim .ttime .tl1 small{display:block;font-size:10px}
.hero-anim .tlink{position:absolute;left:0;right:0;text-align:center;font-size:13px;color:#1a73b8;font-weight:500}
.hero-anim .aeb{left:20px;width:360px;height:50px;border-radius:12px;background:#e3ecf6;color:#1c72b8;font-size:17px;font-weight:600;display:grid;place-items:center;transition:background .15s}
.hero-anim .aeb.press{background:#f2f6fb;color:#9fb6cc}

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
  const steps = stepsEl ? [...stepsEl.children] as HTMLElement[] : [];
  const mobileDots = [...document.querySelectorAll("#hero-steps-mobile .dot")] as HTMLElement[];
  const mobileTitle = document.getElementById("hero-steps-mobile-title");
  const mobileDesc = document.getElementById("hero-steps-mobile-desc");
  const STEP_TITLES = ["Log a meal", "Log your day", "Track symptoms", "See your insights", "Run an experiment"];
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
      setTimeout(() => { mobileTitle.textContent = STEP_TITLES[i] || ""; mobileTitle.classList.remove("swap"); }, 160);
    }
    curStep = i;
  }
  function say(i: number, text: string) {
    if (i !== curStep) step(i);
    // Desktop steps
    const d = steps[i]?.querySelector(".wd") as HTMLElement | null;
    if (d && d.textContent !== text) {
      d.classList.add("swap");
      setTimeout(() => { d.textContent = text; d.classList.remove("swap"); }, 160);
    }
    // Mobile description
    if (mobileDesc && mobileDesc.textContent !== text) {
      mobileDesc.classList.add("swap");
      setTimeout(() => { mobileDesc.textContent = text; mobileDesc.classList.remove("swap"); }, 160);
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
    btn?: HTMLElement | null,
    cnt?: HTMLElement | null
  ) {
    for (let i = 1; i <= text.length; i += reduce ? text.length : 1) {
      el.textContent = text.slice(0, i);
      const c = document.createElement("span");
      c.className = "caret";
      el.append(c);
      if (cnt) cnt.textContent = i + " / 5000";
      if (i >= 3 && btn) btn.classList.remove("dim");
      await sleep(1000 / cps, r);
    }
  }

  async function pops(list: NodeListOf<Element>, gap: number, r: number) {
    for (const p of list) {
      p.classList.add("in");
      await sleep(gap, r);
    }
  }

  function reset() {
    steps.forEach((s) => { s.classList.remove("on", "done"); });
    steps.forEach((s) => { const wd = s.querySelector(".wd"); if (wd) wd.textContent = ""; });
    mobileDots.forEach((d) => d.classList.remove("on", "done"));
    if (mobileTitle) mobileTitle.textContent = "";
    if (mobileDesc) mobileDesc.textContent = "";
    container.querySelectorAll(".pop").forEach((p) => p.classList.remove("in"));
    q("t1")!.innerHTML =
      '<span class="ph">e.g. Large burrito with guac and cheese, 2 scrambled eggs with toast, bowl of chicken caesar salad</span>';
    q("t3")!.innerHTML =
      '<span class="ph">Describe your day...</span>';
    q("cnt")!.textContent = "0 / 5000";
    q("b1")!.classList.add("dim");
    q("b3")!.classList.add("dim");
    q("spin")!.style.opacity = "0";
    q("rlist")!.style.transform = "";
    q("tlist")!.style.transform = "";
    q("shT")!.classList.remove("up");
    q("dimT")!.classList.remove("on");
    container
      .querySelectorAll(".tcard,.ttime")
      .forEach((e) => e.classList.remove("in"));
    container
      .querySelectorAll("#sevs .sev")
      .forEach((s) => s.classList.remove("pick"));
    ["sh6", "sh7"].forEach((i) => q(i)!.classList.remove("up"));
    ["dim6", "dim7"].forEach((i) => q(i)!.classList.remove("on"));
    q("sbar")!.style.width = "0";
    q("score")!.textContent = "0";
    q("dscroll")!.style.transform = "";
    q("expLbl")!.textContent = "Suggested";
    q("expCard")!.style.height = "66px";
    q("expSub")!.style.display = "flex";
    q("expAct")!.style.display = "none";
    q("expDay")!.style.display = "none";
    q("expSegs")!.style.display = "none";
  }

  const LAYOUT: Record<string, { stage: number; top: number }> = {
    c_bfast: { stage: 2, top: 168 },
    c_steak: { stage: 1, top: 401 },
    c_bloat: { stage: 2, top: 542 },
    c_dinner: { stage: 2, top: 614 },
    c_reflux: { stage: 2, top: 801 },
    c_gas: { stage: 3, top: 873 },
  };

  function todayStage(n: number) {
    q("calpill")!.textContent = n === 1 ? "895 cal" : "2,079 cal";
    for (const [id, info] of Object.entries(LAYOUT)) {
      const el = q(id)!;
      const tm = q(id + "_t")!;
      const vis = info.stage <= n;
      el.style.display = tm.style.display = vis ? "block" : "none";
      const top = n === 1 && id === "c_steak" ? 168 : info.top;
      el.style.top = top + "px";
      tm.style.top = top + "px";
      const hl = info.stage === n;
      el.classList.toggle("hl", hl);
      if (!hl) el.classList.add("in");
      tm.classList.add("in");
    }
  }

  async function play(r: number) {
    reset();
    curStep = -1;
    say(0, "Type what you ate in your own words. No searching or measuring.");
    show("s1");
    await sleep(800, r);
    await type(q("t1")!, "Steak with white rice and two eggs. Also drank some orange juice.", 24, r, q("b1"));
    await sleep(450, r);
    await tap(q("b1")!, r);
    say(0, "My Tummi breaks it into ingredients and flags categories like acidic and histamine.");
    show("s2");
    await sleep(500, r);
    await pops(q("s2")!.querySelectorAll(".irow"), 220, r);
    await pops(q("s2")!.querySelectorAll(".chip"), 90, r);
    await sleep(1000, r);
    await tap(q("b2")!, r);

    say(0, "The meal is saved to your timeline for today.");
    todayStage(1);
    show("sT");
    await sleep(550, r);
    q("c_steak")!.classList.add("in");
    await sleep(1900, r);

    say(1, "Busy day? Tap + and choose Log My Day.");
    await tap(q("plusBtn")!, r);
    q("dimT")!.classList.add("on");
    q("shT")!.classList.add("up");
    await sleep(1000, r);
    await tap(q("ae_day")!, r);
    q("shT")!.classList.remove("up");
    q("dimT")!.classList.remove("on");
    say(1, "Describe your whole day at once: meals, snacks and how you felt.");
    show("s3");
    await sleep(700, r);
    await type(
      q("t3")!,
      "For breakfast I had two eggs, half an avocado, and a slice of whole wheat toast. After breakfast I had some mild bloating. For dinner I had a cheeseburger and fries from in n out. A couple hours later I had really bad acid reflux.",
      55,
      r,
      q("b3"),
      q("cnt")
    );
    await sleep(400, r);
    await tap(q("b3")!, r);
    q("spin")!.style.opacity = "1";
    await sleep(1500, r);
    say(1, "Every meal and symptom is pulled out and put in time order for you to review.");
    show("s4");
    await sleep(450, r);
    await pops(q("s4")!.querySelectorAll(".pop"), 240, r);
    await sleep(1400, r);
    await tap(q("b4")!, r);

    say(1, "Submit, and your whole day fills in on the timeline.");
    todayStage(2);
    show("sT");
    await sleep(550, r);
    for (const id of ["c_bfast", "c_bloat", "c_dinner", "c_reflux"]) {
      q(id)!.classList.add("in");
      await sleep(260, r);
    }
    await sleep(500, r);
    q("tlist")!.style.transform = "translateY(-110px)";
    await sleep(2000, r);

    say(2, "Feel something later? Tap + and choose Symptom.");
    await tap(q("plusBtn")!, r);
    q("dimT")!.classList.add("on");
    q("shT")!.classList.add("up");
    await sleep(900, r);
    await tap(q("ae_sym")!, r);
    q("shT")!.classList.remove("up");
    q("dimT")!.classList.remove("on");
    say(2, "Pick the symptom and how bad it is, from 1 to 10.");
    show("s5");
    await sleep(800, r);
    const sv = container.querySelectorAll("#sevs .sev");
    await tap(sv[4], r);
    sv[4].classList.add("pick");
    await sleep(900, r);
    await tap(q("b5")!, r);
    say(2, "It lands on the timeline next to what you ate.");
    todayStage(3);
    show("sT");
    await sleep(500, r);
    q("tlist")!.style.transform = "translateY(-180px)";
    await sleep(700, r);
    q("c_gas")!.classList.add("in");
    await sleep(1800, r);

    say(3, "Over time, My Tummi connects foods to your symptoms.");
    await tap(q("tabDash")!, r);
    show("s6");
    await sleep(1100, r);
    await tap(q("dairyCard")!, r);
    say(3, "Dairy scores 85 out of 100. See which symptoms followed it, and how often.");
    q("dim6")!.classList.add("on");
    q("sh6")!.classList.add("up");
    await sleep(550, r);
    q("sbar")!.style.width = "85%";
    for (let v = 0; v <= 85; v += 5) {
      q("score")!.textContent = String(v);
      await sleep(50, r);
    }
    await sleep(900, r);
    q("dscroll")!.style.transform = "translateY(-270px)";
    await sleep(2400, r);
    await tap(q("x6")!, r);
    q("sh6")!.classList.remove("up");
    q("dim6")!.classList.remove("on");
    await sleep(600, r);

    say(4, "Ready to find out for sure? Open a suggested experiment.");
    await tap(container.querySelectorAll("#s6 .seg span")[2], r);
    show("s7");
    await sleep(700, r);
    await tap(q("expCard")!, r);
    say(4, "Lactose Elimination: 7 days without lactose, then bring it back and compare.");
    q("dim7")!.classList.add("on");
    q("sh7")!.classList.add("up");
    await sleep(2000, r);
    await tap(q("b7")!, r);
    say(4, "Experiment started. My Tummi tracks it day by day.");
    q("sh7")!.classList.remove("up");
    q("dim7")!.classList.remove("on");
    await sleep(450, r);
    q("expLbl")!.textContent = "Active";
    q("expCard")!.style.height = "78px";
    q("expSub")!.style.display = "none";
    q("expAct")!.style.display = "block";
    q("expDay")!.style.display = "block";
    q("expSegs")!.style.display = "flex";
    await sleep(2600, r);
  }

  async function loop() {
    const r = ++run;
    try {
      while (r === run) {
        await play(r);
      }
    } catch (_) {
      /* animation cancelled */
    }
  }
  loop();
}
