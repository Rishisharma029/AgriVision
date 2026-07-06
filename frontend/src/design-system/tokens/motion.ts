export const motion = {
  timing: {
    fast: '150ms',
    medium: '300ms',
    slow: '500ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snappy: 'cubic-bezier(0.16, 1, 0.3, 1)', // Premium out easing
  },
  transition: {
    hover: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    press: 'transform 100ms cubic-bezier(0.16, 1, 0.3, 1)',
    page: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
    modal: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
    drawer: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
  }
} as const;
