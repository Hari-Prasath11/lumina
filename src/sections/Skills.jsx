import { useEffect, useRef, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { skillClusters, softSkills } from '../data/content'
import styles from './Skills.module.css'

/* hex (#rrggbb) -> rgba string */
function rgba(hex, a) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

/**
 * Skills as an interactive constellation graph — a deliberate nod to the
 * graph databases (Neo4j) Hari works with. A central "core" node connects
 * to skill-cluster hubs, each of which connects to individual skills.
 * Everything orbits gently and reacts to the cursor.
 */
export default function Skills() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [active, setActive] = useState(null) // active cluster id for legend sync

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999, active: false }
    let hovered = null

    // Base config per cluster (angle around the core)
    const clusters = skillClusters.map((c, i) => ({
      ...c,
      baseAngle: (i / skillClusters.length) * Math.PI * 2,
      dir: i % 2 === 0 ? 1 : -1,
      phase: i * 1.7,
    }))

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Returns the full, STATIC node layout — fixed positions, no motion.
    // Elliptical so it fills the (usually wide) card and the nodes spread out.
    const layout = () => {
      const cx = w / 2
      const cy = h / 2
      const small = w < 620
      const ns = Math.min(w, h) // node-size scale
      const Rx = w * (small ? 0.26 : 0.25) // cluster distance (horizontal)
      const Ry = h * (small ? 0.3 : 0.31) // cluster distance (vertical)
      const r2x = w * (small ? 0.1 : 0.095) // skill distance (horizontal)
      const r2y = h * (small ? 0.13 : 0.13) // skill distance (vertical)

      const core = { x: cx, y: cy, r: ns * 0.02 + 6, label: 'HP', type: 'core' }
      const nodes = [core]
      const hubs = []

      clusters.forEach((c, ci) => {
        const a = c.baseAngle
        const hub = {
          x: cx + Math.cos(a) * Rx,
          y: cy + Math.sin(a) * Ry,
          r: ns * 0.012 + 5,
          label: c.label,
          color: c.accent,
          type: 'hub',
          ci,
        }
        hubs.push(hub)
        nodes.push(hub)

        c.skills.forEach((s, si) => {
          const sa = (si / c.skills.length) * Math.PI * 2 + c.phase
          const sx = hub.x + Math.cos(sa) * r2x
          const sy = hub.y + Math.sin(sa) * r2y
          nodes.push({
            x: sx,
            y: sy,
            r: ns * 0.008 + 2.5 + s.level * 5,
            label: s.name,
            color: c.accent,
            type: 'skill',
            ci,
            level: s.level,
          })
        })
      })
      return { core, hubs, nodes }
    }

    const pick = (nodes) => {
      if (!mouse.active) return null
      let best = null
      let bestD = 26
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y)
        if (d < Math.max(bestD, n.r + 12) && d < bestD + n.r) {
          if (d - n.r < bestD) {
            bestD = d - n.r
            best = n
          }
        }
      }
      return best
    }

    const activeRef = { current: null }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const { core, hubs, nodes } = layout()
      hovered = pick(nodes)
      const activeCi =
        hovered && (hovered.type === 'hub' || hovered.type === 'skill') ? hovered.ci : null

      // ── Edges ──
      ctx.lineCap = 'round'
      // core -> hubs
      hubs.forEach((hub) => {
        const on = activeCi === null || activeCi === hub.ci
        ctx.beginPath()
        ctx.moveTo(core.x, core.y)
        ctx.lineTo(hub.x, hub.y)
        ctx.strokeStyle = on ? rgba(hub.color, 0.5) : rgba(hub.color, 0.08)
        ctx.lineWidth = on && activeCi === hub.ci ? 1.6 : 0.8
        ctx.stroke()
      })
      // hubs -> skills
      nodes.forEach((n) => {
        if (n.type !== 'skill') return
        const hub = hubs[n.ci]
        const on = activeCi === null || activeCi === n.ci
        ctx.beginPath()
        ctx.moveTo(hub.x, hub.y)
        ctx.lineTo(n.x, n.y)
        ctx.strokeStyle = on ? rgba(n.color, 0.35) : rgba(n.color, 0.06)
        ctx.lineWidth = on ? 1 : 0.6
        ctx.stroke()
      })

      // ── Nodes ──
      // core
      ctx.save()
      ctx.shadowBlur = 24
      ctx.shadowColor = 'rgba(200,210,235,0.5)'
      ctx.beginPath()
      ctx.arc(core.x, core.y, core.r, 0, Math.PI * 2)
      const cg = ctx.createLinearGradient(core.x - core.r, core.y, core.x + core.r, core.y)
      cg.addColorStop(0, '#f4f5f2')
      cg.addColorStop(1, '#a7abb5')
      ctx.fillStyle = cg
      ctx.fill()
      ctx.restore()
      ctx.fillStyle = '#08080a'
      ctx.font = '600 11px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(core.label, core.x, core.y + 0.5)

      // hubs + skills
      nodes.forEach((n) => {
        if (n.type === 'core') return
        const on = activeCi === null || activeCi === n.ci
        const isHovered = hovered === n
        ctx.save()
        ctx.globalAlpha = on ? 1 : 0.28
        // shadowBlur is expensive per-frame — reserve the glow for the hovered node.
        ctx.shadowBlur = isHovered ? 20 : 0
        ctx.shadowColor = isHovered ? rgba(n.color, 0.9) : 'transparent'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * (isHovered ? 1.35 : 1), 0, Math.PI * 2)
        ctx.fillStyle = n.type === 'hub' ? n.color : rgba(n.color, 0.85)
        ctx.fill()
        if (n.type === 'hub') {
          ctx.lineWidth = 2
          ctx.strokeStyle = rgba('#ffffff', 0.28)
          ctx.stroke()
        }
        ctx.restore()

        // labels — always show skill labels (smaller on narrow screens) so the
        // graph stays legible on touch devices where hover can't reveal them.
        const showLabel = n.type === 'hub' || isHovered || on
        if (showLabel) {
          const small = w < 620
          ctx.save()
          ctx.globalAlpha = on ? 1 : 0.4
          ctx.font =
            n.type === 'hub'
              ? `600 ${small ? 11 : 12}px "Syne", sans-serif`
              : `500 ${isHovered ? 12 : small ? 9 : 10.5}px "JetBrains Mono", monospace`
          ctx.fillStyle = n.type === 'hub' ? '#ecebe6' : isHovered ? '#ffffff' : '#9c9c96'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          const dy = n.r + (n.type === 'hub' ? 15 : 11)
          ctx.fillText(n.label, n.x, n.y + dy)
          ctx.restore()
        }
      })

      // sync legend highlight (throttled via ref compare)
      const nextActive = activeCi !== null ? clusters[activeCi].id : null
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive
        setActive(nextActive)
      }

      // (static graph — draw never reschedules; redraws are event-driven)
    }

    // Draw once; then redraw only on hover (for the zoom) and on resize.
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      draw()
    }
    const onLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
      draw()
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(wrap)

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerdown', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointercancel', onLeave)

    draw()

    return () => {
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointercancel', onLeave)
    }
  }, [])

  return (
    <section id="skills" className={`section ${styles.wrap}`}>
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Skills & Stack"
          title="My stack, as a graph"
          highlight="graph"
        />

        <Reveal className={styles.intro}>
          <p>
            I think in systems — so here's my toolkit rendered the way I model data:
            a living graph. The core connects to six clusters; each cluster branches
            into the tools I build with. <span className="text-gradient">Hover any node</span> to
            trace its connections.
          </p>
        </Reveal>

        <Reveal className={styles.stage} amount={0.2}>
          <div ref={wrapRef} className={styles.canvasWrap}>
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
          </div>

          {/* Legend / cluster key */}
          <ul className={styles.legend} aria-hidden="true">
            {skillClusters.map((c) => (
              <li key={c.id} data-active={active === c.id} style={{ '--dot': c.accent }}>
                <span className={styles.legendDot} />
                {c.label}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Soft skills strip */}
        <Reveal className={styles.soft}>
          <span className={`eyebrow ${styles.softLabel}`}>Beyond the code</span>
          <div className={styles.softChips}>
            {softSkills.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Accessible, non-visual representation of the full stack */}
        <div className="sr-only">
          <h3>Complete skill list</h3>
          {skillClusters.map((c) => (
            <div key={c.id}>
              <h4>{c.label}</h4>
              <ul>
                {c.skills.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
