export const colors = {
  parchment: '#faf6ef',
  card: '#ffffff',
  ink: '#2b2320',
  inkSoft: '#6b5d55',
  gold: '#b8860b',
  goldSoft: '#e9d9ae',
  marian: '#1e3a8a',
  danger: '#be123c',
  dangerBg: '#fff1f2',
  success: '#047857',
  successBg: '#ecfdf5',
  pillars: {
    sky: '#0369a1',
    rose: '#be123c',
    emerald: '#047857',
    amber: '#d97706',
  } as Record<string, string>,
};

export const radius = { md: 12, lg: 16, xl: 20, full: 999 };

export const spacing = (n: number) => n * 4;
