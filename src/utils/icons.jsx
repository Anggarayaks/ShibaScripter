export const Icon = ({ name, size = 20 }) => {
  const icons = {
    code: 'M18 16l4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16',
    search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
    eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z',
    download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
    upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
    heart: 'M20.84 4.61a5.5 5.5 0 01-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 017.78 7.78l-1.06 1.06L12 21.23l-7.78-7.78a5.5 5.5 0 010-7.78z',
    copy: 'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M15 2H9a1 1 0 00-1 1v4h8V3a1 1 0 00-1-1z',
    logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
    login: 'M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3',
    check: 'M20 6l-11 11-7-7',
    trash: 'M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m1 0h1a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h1m3 5v6m4-6v6',
    dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    menu: 'M3 12h18M3 6h18M3 18h18',
    x: 'M18 6L6 18M6 6l12 12',
    plus: 'M12 5v14M5 12h14',
    bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9',
    flag: 'M4 15s1-1 5-1 5.008 1 9 1m0 0V7c0-1-1-2-2-2h-4.5C13 4 12 5 12 6v8m0 0v3m0-3c4-.008 5-1 9-1s5 1 5 1m0 0V7c0-1-1-2-2-2h-4.5C19 4 18 5 18 6v8m0 0v3',
    alertCircle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={icons[name] || ''} />
    </svg>
  );
};
