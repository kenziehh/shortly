---
name: Simpul Structural Identity
colors:
  surface: '#f9f9ff'
  surface-dim: '#cbdaff'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e8edff'
  surface-container-high: '#e0e8ff'
  surface-container-highest: '#d8e2ff'
  on-surface: '#091b38'
  on-surface-variant: '#434655'
  inverse-surface: '#20304e'
  inverse-on-surface: '#edf0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0038b1'
  on-primary: '#ffffff'
  primary-container: '#1e4fd8'
  on-primary-container: '#cbd4ff'
  inverse-primary: '#b7c4ff'
  secondary: '#575f6b'
  on-secondary: '#ffffff'
  secondary-container: '#dbe3f2'
  on-secondary-container: '#5d6571'
  tertiary: '#394658'
  on-tertiary: '#ffffff'
  tertiary-container: '#515d71'
  on-tertiary-container: '#c9d6ed'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b4'
  secondary-fixed: '#dbe3f2'
  secondary-fixed-dim: '#bfc7d5'
  on-secondary-fixed: '#141c27'
  on-secondary-fixed-variant: '#3f4753'
  tertiary-fixed: '#d6e3fb'
  tertiary-fixed-dim: '#bac7de'
  on-tertiary-fixed: '#0f1c2d'
  on-tertiary-fixed-variant: '#3b475a'
  background: '#f9f9ff'
  on-background: '#091b38'
  surface-variant: '#d8e2ff'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  code-sm:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-page: 64px
  container-max: 1200px
---

## Brand & Style
The design system for this URL shortener is built on a philosophy of **Technical Minimalism**. It prioritizes clarity, speed, and structural integrity over decorative trends. The aesthetic is inspired by engineering blueprints and architectural diagrams—relying on precise alignment, deliberate whitespace, and a high-contrast functional palette.

The user interface should feel like a specialized tool: robust, lightweight, and efficient. By utilizing an asymmetric layout, we direct focus toward the primary action (link creation) while maintaining a sense of sophisticated utility. 

**Avoid:** All forms of skeuomorphism, gradients, shadows, and organic "blob" shapes. The interface remains strictly two-dimensional, using line-work and color blocking to establish hierarchy.

## Colors
The palette is rooted in a "Cold White" ecosystem, providing a high-clarity environment for technical data.

- **Background (#F6F8FC):** A sterile, cold white used for all primary canvas areas.
- **Text (#0E1F3C):** A deep navy for maximum legibility and professional tone.
- **Accent/CTA (#1E4FD8):** A high-energy Sapphire Blue reserved for primary actions. Use only as solid fills.
- **Secondary Surface (#E4ECFB):** A muted mist blue for subtle grouping and row zebra-striping.
- **Borders/Dividers (#C6D3EA):** A technical gray-blue hairline (1px) used to define spatial boundaries without adding visual weight.
- **Functional States:** Amber and Brick Red are desaturated but high-contrast, used strictly for validation and alerts.

## Typography
The typographic system utilizes a triple-font approach to categorize information types:

1.  **Space Grotesk (Headings):** Used for headlines and structural landmarks. Its geometric, technical quirks reinforce the engineering aesthetic.
2.  **IBM Plex Sans (Body):** A high-performance humanist typeface for general interface copy, providing comfort and clarity.
3.  **IBM Plex Mono (Technical Data):** Used for shortened URLs, slugs, analytics figures, and labels. This creates a clear visual distinction between "content" and "data."

**Scale Rules:**
- Use `display-lg` for the hero section or primary dashboard header.
- Use `code-sm` for all user-generated slugs and system-generated IDs.
- Keep letter spacing tight on headings and default on body text.

## Layout & Spacing
The layout follows a **Fixed-Grid Asymmetry**. While the overall container is centered, content should be weighted to one side (e.g., 7-column primary content, 5-column empty space or auxiliary metadata).

- **Grid:** 12-column system with 24px gutters.
- **Asymmetry:** Leave intentional "voids" in the layout. For example, on a desktop link creation page, the input may span 8 columns while the right 4 columns remain empty or contain a single vertical divider.
- **Rhythm:** Use a 4px baseline. Components should have generous internal padding to breathe against the hairline borders.
- **Responsive:** On mobile, collapse columns into a single stack, but maintain the 1px divider lines to separate distinct functional blocks.

## Elevation & Depth
This design system rejects shadows and Z-axis depth. Hierarchy is established through **Tonal Layering** and **Line Weight**.

1.  **Level 0 (Base):** #F6F8FC background.
2.  **Level 1 (Surfaces):** Use hairline borders (#C6D3EA) to define regions. 
3.  **Level 2 (Active/Hover):** Use #E4ECFB (Mist Blue) as a solid background fill for hover states in lists or navigation.
4.  **Zero-Shadow Policy:** No drop shadows or inner shadows are permitted. Overlays (like modals) should use a solid 1px border and a sharp 2px "hard shadow" offset using the text color (#0E1F3C) if absolutely necessary for separation, though flat containment is preferred.

## Shapes
The shape language is primarily **Rectilinear**. 

- **Containers & Cards:** Must use sharp corners (0-2px). 
- **Interactive Elements (Buttons/Inputs):** Use a subtle "Soft" radius (6px - 8px) to provide a tactile "target" feel, distinguishing them from static layout containers.
- **Icons:** Use 2px stroke weight with square caps to match the technicality of the typography.

## Components

- **Buttons:**
  - **Primary:** Solid #1E4FD8 background, white text, 8px radius. No gradients.
  - **Secondary:** Transparent background, 1px #C6D3EA border, #0E1F3C text.
  - **Hover States:** Primary shifts to a slightly darker shade; Secondary fills with #E4ECFB.

- **Input Fields:**
  - 1px hairline border (#C6D3EA) with 8px radius. 
  - Placeholder text in a muted navy. 
  - Focused state: Border color changes to #1E4FD8 with no outer glow.

- **Cards/Containers:**
  - No background fill (transparent) or white fill.
  - Defined by 1px top or bottom borders only (border-collapse style) rather than full boxes where possible.
  - Sharp corners (0px).

- **Chips/Status:**
  - Rectangular with 2px radius. 
  - Use IBM Plex Mono for text. 
  - Background matches the functional status color (Amber/Red) at 10% opacity, with 100% opacity text.

- **Lists:**
  - Data rows separated by 1px #C6D3EA horizontal dividers. 
  - Avoid vertical dividers within lists to maintain a clean horizontal flow.

- **Logo Implementation:**
  - The "Simpul" logomark must be rendered in #1E4FD8. The knotting lines should maintain a consistent stroke weight of 2px.