---
name: Architectural Performance System
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#bb0112'
  on-secondary: '#ffffff'
  secondary-container: '#e02928'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000b'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 60px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is engineered for a high-end B2B audience in the sports infrastructure sector. It prioritizes authority, structural integrity, and technical precision. The brand personality is "Industrial Premium"—combining the ruggedness of sports construction with the polished professionalism of a tier-one architectural firm.

The design style leans into **Corporate Modernism** with an **Industrial** edge. It utilizes a rigorous grid, deliberate whitespace, and a high-contrast palette to evoke a sense of monumental scale and unwavering reliability. Every element should feel "built" rather than "drawn," emphasizing strength and longevity.

## Colors

The palette is anchored by **Deep Slate Navy (#0F172A)**, used for primary surfaces and typography to establish a heavy, grounded foundation. **Professional Red (#DC2626)** serves as a high-intensity functional accent, reserved for critical calls to action, performance metrics, and structural highlights.

Neutrals are strictly cool-toned to maintain a sterile, technical atmosphere. Use `#F8FAFC` for large background sections to provide relief from the heavy primary color, and `#E2E8F0` for structural divisions and borders.

## Typography

This design system utilizes **Inter** for all primary communication to leverage its systematic, neutral, and highly legible characteristics. Headings are set with tight tracking and heavy weights to mimic architectural blueprints and industrial signage.

For technical data, specification sheets, and small metadata, **JetBrains Mono** is introduced as a secondary label font. This monospaced addition reinforces the "Technical Catalog" aesthetic and ensures that numerical data (dimensions, tolerances, weights) is presented with mathematical clarity.

## Layout & Spacing

The layout is governed by a **12-column fixed grid** on desktop, transitioning to a **4-column fluid grid** on mobile. Spacing follows a strict 8px base unit. 

Large-scale sections should be separated by significant vertical padding (often 120px or 160px) to allow the heavy typography and industrial photography to breathe. Use "Structural Gutters" of 32px to ensure that even dense technical data feels organized and accessible. Alignment should be predominantly left-heavy to maintain a formal, catalog-like structure.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layering** rather than aggressive shadows. Surfaces should feel like stacked materials.

1.  **Level 0 (Base):** White (#FFFFFF) or light gray (#F8FAFC) for the main canvas.
2.  **Level 1 (Cards):** White background with a 1px solid border in `#E2E8F0`. Use a very subtle, large-radius ambient shadow (0px 10px 30px rgba(15, 23, 42, 0.05)) to signify interactivity.
3.  **Level 2 (Overlays):** For modals or dropdowns, use a crisp 1px border in the primary navy color to suggest a "technical inset" look.

Avoid all blurs or frosted-glass effects; the aesthetic must remain solid, opaque, and structural.

## Shapes

The shape language is "Soft-Industrial." While sharp corners feel more technical, a subtle **0.25rem (4px)** radius is applied to buttons and cards to provide a premium, manufactured finish. This prevents the UI from feeling "sharp" or "aggressive" while maintaining a strictly rectangular, grid-aligned silhouette. Larger containers like image carousels or section backgrounds should remain at 0px radius to emphasize the architectural scale.

## Components

### Buttons
- **Primary:** Solid #0F172A background, White text, 4px radius. High-weight Inter Caps.
- **Secondary:** Transparent background, 2px solid #0F172A border.
- **Action:** Solid #DC2626, used only for the final conversion point or critical alerts.

### Cards & Technical Insets
Cards should be used for product specs and project portfolios. They must feature a 1px #E2E8F0 border and ample internal padding (minimum 32px). Product cards should lead with a high-contrast image followed by technical labels in JetBrains Mono.

### Input Fields
Inputs should be rectangular with a 1px #E2E8F0 border. On focus, the border transitions to 1px #0F172A. Use JetBrains Mono for placeholder text to emphasize the "data entry" nature of B2B ordering.

### Lists & Tables
Data-heavy lists should use alternating row tints (#F8FAFC) and avoid vertical lines. Horizontal dividers should be thin (1px) and light (#E2E8F0). Column headers must be set in the `label-caps` style for maximum clarity.

### Progress Indicators
Use the Professional Red (#DC2626) for progress bars or technical milestones, creating a visual link to performance and "active" construction phases.