import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/*
 * Cinematic WebGL stage: a polished-bronze Glide chevron on a black stage, forge sparks,
 * a breathing liquid-bronze wave shader (bronze → sapphire with scroll) and a camera that
 * orbits 360° through the intro. Also drives the DOM overlay (slides, story dashes, grid
 * dots, custom cursor) from the same smoothed scroll value.
 */

const SPARK_COUNT = 450

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    float aspect = uResolution.x / uResolution.y;
    float time = uTime * 0.08;
    float scroll = uScroll;

    float angle1 = 0.6;
    float angle2 = -0.7;
    float angle3 = 1.2;
    float freq1 = 2.4;
    float freq2 = 3.2;
    float freq3 = 4.0;

    vec2 warpedUv = uv;
    float scrollDeform = scroll * 5.0;
    warpedUv.x += sin(uv.y * 2.5 + time * 0.2 + scrollDeform) * 0.35;
    warpedUv.y += cos(uv.x * 2.5 - time * 0.15 - scrollDeform * 0.8) * 0.35;
    warpedUv.x += sin(uv.y * 1.2 - time * 0.1 - scrollDeform * 1.5) * 0.25;
    warpedUv.y += cos(uv.x * 1.2 + time * 0.18 + scrollDeform * 1.2) * 0.25;
    warpedUv += vec2(scroll * 0.04, -scroll * 0.02) + vec2(uMouse.x * aspect * 0.05, uMouse.y * 0.05);

    vec2 dir1 = vec2(cos(angle1), sin(angle1));
    vec2 dir2 = vec2(cos(angle2), sin(angle2));
    vec2 dir3 = vec2(cos(angle3), sin(angle3));
    float w1 = sin(dot(warpedUv, dir1) * freq1 + time * 1.0);
    float w2 = cos(dot(warpedUv, dir2) * freq2 - time * 1.4 + w1 * 0.4);
    float w3 = sin(dot(warpedUv, dir3) * freq3 + time * 1.8 + w2 * 0.5);
    float waveField = w1 * 0.50 + w2 * 0.35 + w3 * 0.15;

    float wideSheen = pow(max(0.0, 1.0 - abs(waveField - 0.1)), 2.5);
    float crispSpecular = pow(max(0.0, 1.0 - abs(waveField - 0.15)), 8.0);
    float crest = wideSheen * 0.5 + crispSpecular * 0.9;

    vec3 c0_shadow = vec3(0.0010, 0.0006, 0.0004);
    vec3 c0_wave1  = vec3(0.085, 0.040, 0.015);
    vec3 c0_wave2  = vec3(0.050, 0.022, 0.008);
    vec3 c0_crest  = vec3(0.45, 0.30, 0.18);
    vec3 c1_shadow = vec3(0.0004, 0.0006, 0.0012);
    vec3 c1_wave1  = vec3(0.015, 0.035, 0.065);
    vec3 c1_wave2  = vec3(0.008, 0.020, 0.045);
    vec3 c1_crest  = vec3(0.18, 0.35, 0.55);

    float t = smoothstep(0.0, 1.0, scroll);
    vec3 colShadow = mix(c0_shadow, c1_shadow, t);
    vec3 colWave1  = mix(c0_wave1, c1_wave1, t);
    vec3 colWave2  = mix(c0_wave2, c1_wave2, t);
    vec3 colCrest  = mix(c0_crest, c1_crest, t);

    vec3 color = colShadow;
    color = mix(color, colWave2, smoothstep(-0.6, 0.2, waveField));
    color = mix(color, colWave1, smoothstep(0.0, 0.8, waveField));
    color += colCrest * crest * 0.95;
    color *= 0.9;
    color *= 1.0 - dot(uv, uv) * 0.16;

    gl_FragColor = vec4(color, 1.0);
  }
`

function sparkTexture() {
  const c = document.createElement('canvas')
  c.width = 16
  c.height = 16
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)')
  g.addColorStop(0.6, 'rgba(255,255,255,0.3)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 16, 16)
  return new THREE.CanvasTexture(c)
}

/* The Glide app icon in 3D: a glossy navy rounded tile with the white chevron on both faces.
   Chevron centreline traced from the 1024px logo (half-width = 1, ends at y = 0, peak at y = 1.28). */
const CHEVRON = [
  [-1.0, 0.0],
  [-0.88, 0.06],
  [-0.71, 0.31],
  [-0.457, 0.65],
  [-0.265, 0.95],
  [-0.137, 1.16],
  [0, 1.28],
  [0.137, 1.16],
  [0.265, 0.95],
  [0.457, 0.65],
  [0.71, 0.31],
  [0.88, 0.06],
  [1.0, 0.0],
]
const STROKE = 0.2 // stroke half-width relative to the chevron half-width

function roundedSquare(size, r) {
  const h = size / 2
  const sh = new THREE.Shape()
  sh.moveTo(-h + r, -h)
  sh.lineTo(h - r, -h)
  sh.quadraticCurveTo(h, -h, h, -h + r)
  sh.lineTo(h, h - r)
  sh.quadraticCurveTo(h, h, h - r, h)
  sh.lineTo(-h + r, h)
  sh.quadraticCurveTo(-h, h, -h, h - r)
  sh.lineTo(-h, -h + r)
  sh.quadraticCurveTo(-h, -h, -h + r, -h)
  return sh
}

function chevronMesh(material, halfWidth) {
  const pts = CHEVRON.map(([x, y]) => new THREE.Vector3(x * halfWidth, (y - 0.68) * halfWidth, 0))
  const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal')
  const radius = STROKE * halfWidth
  const g = new THREE.Group()
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 260, radius, 40, false), material)
  tube.castShadow = true
  g.add(tube)
  const cap = new THREE.SphereGeometry(radius, 40, 24)
  ;[pts[0], pts[pts.length - 1]].forEach((p) => {
    const m = new THREE.Mesh(cap, material)
    m.position.copy(p)
    g.add(m)
  })
  // flatten slightly so it reads as a raised stroke on the tile, not a pipe
  g.scale.z = 0.7
  return g
}

function glideLogo() {
  const SIZE = 2.6
  const group = new THREE.Group()

  const tileGeo = new THREE.ExtrudeGeometry(roundedSquare(SIZE, 0.52), {
    depth: 0.24,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 8,
    curveSegments: 32,
  })
  tileGeo.center()
  const tile = new THREE.Mesh(
    tileGeo,
    new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1f2b4d'),
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 0.55,
    }),
  )
  tile.castShadow = true
  tile.receiveShadow = true
  group.add(tile)

  const white = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.32,
    roughness: 0.3,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 0.5,
  })
  // In the logo the chevron spans 468/1024 of the tile width
  const halfWidth = (SIZE * 468) / 1024 / 2
  const faceZ = 0.18
  const front = chevronMesh(white, halfWidth)
  front.position.z = faceZ
  group.add(front)
  const back = chevronMesh(white, halfWidth)
  back.position.z = -faceZ
  back.rotation.y = Math.PI
  group.add(back)

  group.scale.setScalar(0.7)
  return group
}

export function createStage(canvas) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(pointer: fine)').matches
  const sizes = { width: window.innerWidth, height: window.innerHeight }
  const clock = new THREE.Clock()

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#000000')
  scene.fog = new THREE.FogExp2('#000000', 0.01)

  const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
  camera.position.set(0, 0.2, 3.0)
  scene.add(camera)

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(sizes.width, sizes.height) },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
  }
  const bg = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthWrite: false, depthTest: false }),
  )
  bg.position.set(0, 0, -8)
  bg.renderOrder = -10
  camera.add(bg)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.6

  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex

  // Chiaroscuro lighting
  scene.add(new THREE.AmbientLight('#ffffff', 0.1))
  const key = new THREE.SpotLight('#ffffff', 18.0)
  key.position.set(4, 6, 3)
  key.angle = Math.PI / 4
  key.penumbra = 0.9
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  key.shadow.camera.near = 1
  key.shadow.camera.far = 15
  key.shadow.bias = -0.001
  scene.add(key)
  const rim = new THREE.DirectionalLight('#e3f2ff', 10.0)
  rim.position.set(-5, 3, -4)
  scene.add(rim)
  const fill = new THREE.DirectionalLight('#fff3e6', 0.8)
  fill.position.set(-2, -4, 2)
  scene.add(fill)

  // Centerpiece
  const pivot = new THREE.Group()
  pivot.position.y = -0.05
  const chevron = glideLogo()
  pivot.add(chevron)

  scene.add(pivot)

  // Forge sparks
  const positions = new Float32Array(SPARK_COUNT * 3)
  const colors = new Float32Array(SPARK_COUNT * 3)
  const sparkData = []
  for (let i = 0; i < SPARK_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6.5
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5.0 - 0.5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6.5
    if (Math.random() < 0.6) {
      colors[i * 3] = 1.0
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.15
      colors[i * 3 + 2] = 0.05 + Math.random() * 0.1
    } else {
      colors[i * 3] = 0.55 + Math.random() * 0.15
      colors[i * 3 + 1] = 0.82 + Math.random() * 0.12
      colors[i * 3 + 2] = 1.0
    }
    sparkData.push({
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: 0.15 + Math.random() * 0.3,
      speedZ: (Math.random() - 0.5) * 0.4,
      swaySpeed: 0.5 + Math.random() * 1.5,
      swayRadius: 0.05 + Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
    })
  }
  const sparkGeo = new THREE.BufferGeometry()
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  sparkGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const sparkTex = sparkTexture()
  const sparks = new THREE.Points(
    sparkGeo,
    new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: sparkTex,
    }),
  )
  scene.add(sparks)

  // DOM overlay handles
  const intro = document.getElementById('intro')
  const slides = [1, 2, 3, 4].map((i) => document.getElementById(`slide-${i}`))
  const slideImg = document.getElementById('slide-2-img')
  const fills = [1, 2, 3, 4].map((i) => document.getElementById(`dash-fill-${i}`))
  const dots = [...document.querySelectorAll('.grid-dot')]
  const overlay = document.querySelector('.intro-stage')
  const cursorInner = document.querySelector('.cursor-inner')
  const cursorOuter = document.querySelector('.cursor-outer')
  const founder = document.querySelector('.founder')
  const RANGES = [
    [-0.1, 0.14],
    [0.28, 0.42],
    [0.56, 0.7],
    [0.84, 1.05],
  ]

  let introP = 0
  let pageP = 0
  let beyondP = 0
  let mouseX = 0
  let mouseY = 0
  let targetMouseX = 0
  let targetMouseY = 0
  let cursorX = sizes.width / 2
  let cursorY = sizes.height / 2
  let outerX = cursorX
  let outerY = cursorY
  let raf = 0
  let running = true

  const onMove = (e) => {
    cursorX = e.clientX
    cursorY = e.clientY
    if (cursorInner) {
      cursorInner.style.left = `${cursorX}px`
      cursorInner.style.top = `${cursorY}px`
    }
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1
    targetMouseY = (e.clientY / window.innerHeight) * 2 - 1
  }
  const onOver = (e) => {
    if (!cursorOuter) return
    cursorOuter.classList.toggle('is-link', !!e.target.closest('a, button'))
  }
  const onResize = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    uniforms.uResolution.value.set(sizes.width, sizes.height)
  }
  const onVis = () => {
    running = !document.hidden
    if (running) {
      clock.getDelta()
      raf = requestAnimationFrame(animate)
    } else cancelAnimationFrame(raf)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseover', onOver)
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVis)

  const loaded = () => !document.documentElement.classList.contains('is-loading')
  const lookAt = new THREE.Vector3()
  const target = new THREE.Vector3()

  function animate() {
    if (!running) return
    raf = requestAnimationFrame(animate)
    const dt = Math.min(clock.getDelta(), 0.05)
    const time = clock.getElapsedTime()

    // Scroll: intro progress (drives slides + orbit) and whole-page progress (drives palette)
    const vh = window.innerHeight
    const introSpan = Math.max(1, intro.offsetHeight - vh)
    const tIntro = Math.min(1, Math.max(0, window.scrollY / introSpan))
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh)
    const tPage = Math.min(1, Math.max(0, window.scrollY / maxScroll))
    const k = reduce ? 1 : 0.06
    introP += (tIntro - introP) * k
    pageP += (tPage - pageP) * k
    const tBeyond = Math.min(1, Math.max(0, (window.scrollY - introSpan) / (vh * 0.9)))
    beyondP += (tBeyond - beyondP) * (reduce ? 1 : 0.08)

    mouseX += (targetMouseX - mouseX) * 0.05
    mouseY += (targetMouseY - mouseY) * 0.05
    if (founder) {
      founder.style.setProperty('--mx', mouseX.toFixed(3))
      founder.style.setProperty('--my', mouseY.toFixed(3))
    }
    if (fine && cursorOuter) {
      outerX += (cursorX - outerX) * 0.2
      outerY += (cursorY - outerY) * 0.2
      cursorOuter.style.left = `${outerX}px`
      cursorOuter.style.top = `${outerY}px`
    }

    // Centerpiece: recedes into the distance once the intro is over
    const base = sizes.width < 900 ? 0.62 : 1
    const logoIn = Math.min(1, Math.max(0, (introP - 0.1) / 0.14))
    const logoEase = logoIn * logoIn * (3 - 2 * logoIn)
    pivot.scale.setScalar(base * (1 - beyondP * 0.35) * (0.001 + logoEase * 0.999))
    pivot.position.set(beyondP * 1.6, -0.05 + beyondP * 0.6, -beyondP * 16)
    pivot.visible = beyondP < 0.995

    // Centerpiece: slow idle turn + mouse tilt
    pivot.rotation.y = mouseX * 0.25 + (reduce ? 0 : Math.sin(time * 0.35) * 0.18)
    pivot.rotation.x = mouseY * 0.15
    chevron.position.y = reduce ? 0 : Math.sin(time * 0.8) * 0.05

    // Sparks
    const pos = sparkGeo.attributes.position.array
    const velocity = Math.abs(tIntro - introP)
    const speedMul = 1 + velocity * 9
    const turbulence = velocity * 0.8
    for (let i = 0; i < SPARK_COUNT; i++) {
      const idx = i * 3
      const d = sparkData[i]
      pos[idx] += d.speedX * dt * speedMul
      pos[idx + 1] += d.speedY * dt * speedMul
      pos[idx + 2] += d.speedZ * dt * speedMul
      const sway = d.swayRadius * (1 + turbulence * 4)
      pos[idx] += Math.sin(time * d.swaySpeed + d.phase) * sway * dt
      pos[idx + 2] += Math.cos(time * d.swaySpeed + d.phase) * sway * dt
      if (pos[idx + 1] > 3 || Math.abs(pos[idx]) > 3.5 || Math.abs(pos[idx + 2]) > 3.5) {
        pos[idx + 1] = -2.5
        pos[idx] = (Math.random() - 0.5) * 3
        pos[idx + 2] = (Math.random() - 0.5) * 3
      }
    }
    sparkGeo.attributes.position.needsUpdate = true

    // Camera: 360° orbit through the intro, then pull back so content reads over it
    const phi = introP * Math.PI * 2
    const arc = Math.sin(introP * Math.PI)
    const radius = 4.2 - arc * 0.6
    target.set(radius * Math.sin(phi), 0.35 + arc * 0.8, radius * Math.cos(phi))
    const ease = (Math.cos(Math.min(1, introP / 0.28) * Math.PI) + 1) * 0.5
    const wide = sizes.width > 900
    lookAt.set(wide ? -0.9 * ease : 0, wide ? -0.15 : -0.6, 0)
    camera.position.lerp(target, reduce ? 1 : 0.05)
    camera.lookAt(lookAt)

    uniforms.uTime.value = time
    uniforms.uMouse.value.set(mouseX, -mouseY)
    uniforms.uScroll.value = pageP

    // Slides
    slides.forEach((s, i) => {
      if (!s) return
      const on = loaded() && introP >= RANGES[i][0] && introP <= RANGES[i][1]
      s.classList.toggle('active', on)
    })
    if (founder) founder.classList.toggle('active', loaded() && introP <= RANGES[0][1])
    if (slideImg) {
      const [from, to] = sizes.width > 900 ? [-0.1, 0.45] : [0.26, 0.45]
      slideImg.classList.toggle('active', introP >= from && introP <= to)
    }
    if (overlay) overlay.classList.toggle('is-done', tIntro >= 0.999)

    // Story dashes follow the intro
    fills.forEach((f, i) => {
      if (!f) return
      const p = Math.max(0, Math.min(1, (introP - i * 0.25) / 0.25))
      f.style.height = `${p * 100}%`
    })

    // Drifting grid dots follow the whole page
    dots.forEach((dot, i) => {
      const startY = ((i * 17) % 80) + 10
      let speed = 90 + ((i * 55) % 180)
      if (i % 2 === 0) speed = -speed
      const y = (((startY + pageP * speed) % 100) + 100) % 100
      dot.style.top = `${y}%`
    })

    renderer.render(scene, camera)
    if (!window.__stageReady) {
      window.__stageReady = true
      window.dispatchEvent(new Event('stage:ready'))
    }
  }

  raf = requestAnimationFrame(animate)

  return () => {
    running = false
    window.__stageReady = false
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseover', onOver)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVis)
    sparkGeo.dispose()
    sparkTex.dispose()
    envTex.dispose()
    pmrem.dispose()
    renderer.dispose()
  }
}
