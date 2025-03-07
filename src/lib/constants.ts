import { IOptions, RecursivePartial } from '@tsparticles/engine'

const NavBarHeight: number = 64
const particleConfig: RecursivePartial<IOptions> = {
  fpsLimit: 60,
  fullScreen: { enable: false },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: false,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 200,
      limit: { value: -1 },
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 1 },
    },
  },
  detectRetina: true,
}

export { NavBarHeight, particleConfig }
