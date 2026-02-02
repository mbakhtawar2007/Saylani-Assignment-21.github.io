# Stopwatch

## Description
A digital stopwatch with start, pause, reset, and time tracking features.

### Technologies
- HTML: For the structure of the stopwatch.
- CSS: For styling, responsive design, and dark/light mode.
- JavaScript: For implementing the stopwatch logic and user interactions.

## Functional Requirements

### Stopwatch Controls
The following controls must be implemented:

1. Start Button
   - Begins the timer from zero or from the paused time.

2. Pause Button
   - Pauses the timer at the current time.

3. Reset Button
   - Resets the timer to zero and stops the timer if running.

### Time Display
- Format: Minutes:Seconds:Milliseconds (MM:SS:MS)
- Update frequency: Every 10 milliseconds (for milliseconds accuracy).

### Timing Mechanism
- Use `setInterval()` with a 10ms interval for updating the display.
- Ensure that the timer is accurate and does not drift over time.

## UI/UX Requirements

### Layout and Responsiveness
- Use CSS Flexbox or Grid to create a responsive layout.
- The stopwatch must be usable on:
  - Mobile devices (screen width up to 768px)
  - Tablets (screen width 769px to 1024px)
  - Desktops (screen width above 1024px)

### Visual Design
- Clean, professional interface with modern styling (using Bootstrap recommended).
- Buttons must be clearly visible and easy to tap/click.
- Implement hover effects for buttons on desktop.
- Support for dark and light mode (preferably with a toggle switch).
- Smooth transitions or animations for state changes (e.g., button clicks, mode switching).

### Accessibility
- Use appropriate ARIA labels for buttons.
- Ensure color contrast meets WCAG guidelines.

## Implementation Notes

### JavaScript
- Use the `Date` object or performance counters for accurate time measurement.
- Avoid using `setInterval` for high-accuracy timing without correction.

### CSS
- Use media queries for responsive design.
- Use CSS custom properties (variables) for theming (dark/light mode).
