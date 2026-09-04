// is.code — Page Loader
(function () {
  const { useState: useStateL, useEffect: useEffectL } = React;

  function SiteLoader({ onDone }) {
    const [phase, setPhase] = useStateL('enter');
    const [progress, setProgress] = useStateL(0);
    const [textIndex, setTextIndex] = useStateL(0);

    const labels = ['carregando', 'iniciando ia', 'quase lá'];

    useEffectL(() => {
      let start = null;
      const duration = 1800;

      function step(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        const pct = Math.min(elapsed / duration, 1);
        const eased = pct < 0.5
          ? 2 * pct * pct
          : -1 + (4 - 2 * pct) * pct;
        setProgress(Math.round(eased * 100));

        const idx = pct < 0.35 ? 0 : pct < 0.7 ? 1 : 2;
        setTextIndex(idx);

        if (pct < 1) {
          requestAnimationFrame(step);
        } else {
          setTimeout(() => {
            setPhase('exit');
            setTimeout(() => onDone && onDone(), 600);
          }, 220);
        }
      }

      const raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, []);

    const isExiting = phase === 'exit';

    return React.createElement('div', {
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 600ms cubic-bezier(0.2,0.7,0.2,1)',
        pointerEvents: isExiting ? 'none' : 'all',
      }
    },
      // Logo
      React.createElement('div', {
        style: {
          marginBottom: 56,
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'opacity 400ms ease, transform 400ms ease',
        }
      },
        React.createElement('img', {
          src: 'assets/logo-white.webp',
          alt: 'is.code',
          style: { height: 32, width: 'auto' }
        })
      ),

      // Progress bar track
      React.createElement('div', {
        style: {
          width: 200,
          height: 1,
          background: 'rgba(255,255,255,0.12)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 20,
        }
      },
        React.createElement('div', {
          style: {
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: progress + '%',
            background: '#FFFFFF',
            transition: 'width 80ms linear',
          }
        })
      ),

      // Label + counter
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 200,
        }
      },
        React.createElement('span', {
          key: textIndex,
          style: {
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            animation: 'loaderFadeIn 300ms ease both',
          }
        }, labels[textIndex]),
        React.createElement('span', {
          style: {
            fontSize: 11,
            fontWeight: 500,
            fontFamily: "'DM Mono', monospace",
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.05em',
          }
        }, String(progress).padStart(3, '0'))
      )
    );
  }

  window.SiteLoader = SiteLoader;
})();
