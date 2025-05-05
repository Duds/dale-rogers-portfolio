import React, { useState } from "react";
import { MagnifyingGlassIcon, FlagIcon, LightBulbIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// Define allowed icon names for type safety
const iconMap = {
  search: MagnifyingGlassIcon,
  flag: FlagIcon,
  "light-bulb": LightBulbIcon,
  "check-circle": CheckCircleIcon,
} as const;
type IconName = keyof typeof iconMap;

interface Phase {
  id: string;
  title: string;
  icon: IconName;
  summary: string;
  tip: string;
  warning: string;
  features: string[];
  actions: { label: string; onClick: () => void }[];
}

const phases: Phase[] = [
  {
    id: "discover",
    title: "Discover",
    icon: "search",
    summary: "Understand user needs through research and observation.",
    tip: "Treat discovery as a chance to challenge assumptions — not just confirm them.",
    warning:
      "Don't limit research to current users. Non-users often reveal the biggest gaps.",
    features: [
      "User interviews & field visits",
      "Persona development",
      "Journey mapping",
      "Empathy mapping",
    ],
    actions: [
      { label: "Download Interview Template", onClick: () => window.open("/resources/interview-template.pdf", "_blank") },
    ],
  },
  {
    id: "define",
    title: "Define",
    icon: "flag",
    summary: "Synthesize findings to frame the right problem.",
    tip: "Keep your problem statement user-centred and measurable.",
    warning:
      "Avoid jumping to solution mode too early — scope and alignment matter.",
    features: [
      "Problem statement workshops",
      "Sense-checking insights",
      "Stakeholder alignment",
      "Business case drafting",
    ],
    actions: [
      { label: "Download Problem Statement Template", onClick: () => window.open("/resources/problem-statement-template.pdf", "_blank") },
    ],
  },
  {
    id: "design",
    title: "Design",
    icon: "light-bulb",
    summary: "Prototype, test, and iterate on possible solutions.",
    tip: "Use low-fidelity methods early. Speed beats polish in early stages.",
    warning:
      "Stakeholder approval isn't user validation. Test with real users.",
    features: [
      "Rapid prototyping",
      "Usability testing",
      "Wireframes & mockups",
      "Iterative feedback loops",
    ],
    actions: [
      { label: "Download Prototype Checklist", onClick: () => window.open("/resources/prototype-checklist.pdf", "_blank") },
    ],
  },
  {
    id: "deliver",
    title: "Deliver",
    icon: "check-circle",
    summary: "Implement, support, and continue improving the solution.",
    tip: "Plan for service operations, not just product release.",
    warning:
      "Skipping post-launch feedback loops increases service failure risk.",
    features: [
      "Go-live planning",
      "User training",
      "Support & feedback channels",
      "Continuous improvement",
    ],
    actions: [
      { label: "Download Launch Plan", onClick: () => window.open("/resources/launch-plan.pdf", "_blank") },
    ],
  },
];

/**
 * ArticleDiamondExplorer (React)
 * Interactive Double Diamond phase explorer for Astro MDX
 * Accessible, visual, and matches article style
 *
 * @component ArticleDiamondExplorer
 * @example
 * <ArticleDiamondExplorer className="shadow-soft" />
 *
 * @param className - Additional CSS classes to apply to the root container (default includes 'shadow-soft')
 */
export interface ArticleDiamondExplorerProps {
  /** Additional CSS classes for the root container */
  className?: string;
}

export default function ArticleDiamondExplorer({ className }: ArticleDiamondExplorerProps = {}) {
  if (phases.length === 0) return null;
  const [selected, setSelected] = useState<string>(phases[0]?.id ?? '');
  const [animKey, setAnimKey] = useState<number>(0); // for triggering panel animation
  const current = phases.find((p) => p.id === selected);
  if (!current) return null;
  const IconComponent = iconMap[current.icon];

  // Animation: update key on phase change
  const handlePhaseChange = (id: string) => {
    setSelected(id);
    setAnimKey((k) => k + 1);
  };

  return (
    <div className={`border rounded-lg bg-white dark:bg-neutral-900 p-8 shadow-soft ${className ?? ''}`.trim()}>
      {/* Double Diamond SVG visualisation with four full diamonds and improved spacing */}
      <div className="flex flex-col items-center mb-14">
        <svg viewBox="0 0 800 240" width={800} height={240} aria-hidden="true">
          {/* Define diamond points */}
          {(() => {
            // Diamond geometry
            const diamonds = [
              { cx: 150, cy: 120 },   // Discover
              { cx: 325, cy: 120 },   // Define
              { cx: 500, cy: 120 },   // Design
              { cx: 675, cy: 120 },   // Deliver
            ];
            const size = 180; // diamond width/height (much bigger)
            const points = ([cx, cy]: [number, number]) =>
              [
                [cx, cy - size / 2], // top
                [cx + size / 2, cy], // right
                [cx, cy + size / 2], // bottom
                [cx - size / 2, cy], // left
              ]
                .map(([x, y]) => `${x},${y}`)
                .join(" ");
            return diamonds.map((d, i) => {
              const phaseId = phases[i]?.id ?? '';
              const isActive = selected === phaseId;
              return (
                <g key={phaseId || i}>
                  <polygon
                    points={points([d.cx, d.cy])}
                    fill={isActive ? "var(--colour-primary)" : "transparent"}
                    fillOpacity={isActive ? 0.12 : 0}
                    stroke={isActive ? "var(--colour-primary)" : "#888"}
                    strokeWidth={isActive ? 8 : 3}
                  />
                  {/* Animated highlight circle in centre */}
                  <circle
                    cx={d.cx}
                    cy={d.cy}
                    r={32}
                    fill={isActive ? "var(--colour-primary)" : "#ccc"}
                    stroke="#fff"
                    strokeWidth={6}
                    className={isActive ? "diamond-highlight-animate" : ""}
                  />
                </g>
              );
            });
          })()}
          {/* Connecting lines for double diamond look */}
          <polyline points="110,120 190,120 285,120 365,120 460,120 540,120 635,120 715,120" fill="none" stroke="#bbb" strokeWidth={7} />
        </svg>
      </div>

      {/* Phase selector buttons (no underline, pill-shaped, spaced) */}
      <div className="flex mb-12 justify-center flex-wrap gap-y-3">
        {phases.map((phase) => (
          <button
            key={phase.id}
            className={`flex-1 px-8 py-3 mx-4 text-base font-medium transition-colors focus:outline-none focus-visible:ring focus-visible:ring-primary rounded-full ${selected === phase.id ? "bg-primary/10 dark:bg-primary/20 text-primary" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
            aria-current={selected === phase.id ? "true" : undefined}
            aria-selected={selected === phase.id}
            role="tab"
            tabIndex={0}
            onClick={() => handlePhaseChange(phase.id)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const idx = phases.findIndex((p) => p.id === selected);
                if (phases.length > 0) {
                  const next = e.key === "ArrowRight" ? (idx + 1) % phases.length : (idx - 1 + phases.length) % phases.length;
                  const nextPhase = phases[next];
                  if (nextPhase && nextPhase.id) {
                    handlePhaseChange(nextPhase.id);
                  }
                }
              }
            }}
          >
            {phase.title}
          </button>
        ))}
      </div>

      {/* Phase detail panel with icons for Tip and Warning, features, and animation */}
      <div
        aria-live="polite"
        className="transition-all duration-500 animate-fade-in-slide"
        role="tabpanel"
        key={animKey}
        style={{
          animation: 'fadeInSlide 0.5s cubic-bezier(.4,2,.6,1)',
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <IconComponent className="w-8 h-8 text-primary" aria-hidden="true" />
          <h3 className="text-xl font-semibold m-0">{current.title}</h3>
        </div>
        <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-lg">{current.summary}</p>
        <div className="mb-5 p-5 rounded-md border-l-4 border-primary-green bg-primary-green/10 dark:bg-primary-green/20 flex items-start gap-4">
          <LightBulbIcon className="w-7 h-7 text-primary-green mt-1 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold mb-1">Tip</p>
            <p>{current.tip}</p>
          </div>
        </div>
        <div className="p-5 rounded-md border-l-4 border-primary-orange bg-primary-orange/10 dark:bg-primary-orange/20 flex items-start gap-4 mb-7">
          <ExclamationTriangleIcon className="w-7 h-7 text-primary-orange mt-1 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold mb-1">Warning</p>
            <p>{current.warning}</p>
          </div>
        </div>
        {/* Phase-specific features */}
        {current.features && current.features.length > 0 && (
          <div className="mb-5">
            <h4 className="font-semibold text-base mb-2 text-primary">Key Features</h4>
            <ul className="list-disc pl-6 space-y-1">
              {current.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Phase-specific actions */}
        {current.actions && current.actions.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-3">
            {current.actions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={action.onClick}
                className="bg-primary text-white px-5 py-2 rounded-full font-medium shadow hover:bg-primary-dark transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Animation keyframes for fade/slide in */}
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-slide {
          animation: fadeInSlide 0.5s cubic-bezier(.4,2,.6,1);
        }
        @keyframes diamondHighlightGrowPulse {
          0% {
            transform: scale(1);
            filter: brightness(1);
          }
          40% {
            transform: scale(1.25);
            filter: brightness(1.5);
          }
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
        }
        .diamond-highlight-animate {
          transform-origin: 50% 50%;
          animation: diamondHighlightGrowPulse 0.6s cubic-bezier(.4,2,.6,1);
        }
      `}</style>
    </div>
  );
}
