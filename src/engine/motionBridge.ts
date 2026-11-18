export type CaseFinishId = 'everose-gold' | 'steel-904l' | 'grade5-titanium' | 'stealth-ceramic';
export type CalibrePerspectiveId = 'angled' | 'dial-face' | 'escapement' | 'crown-profile';

export interface MotionBridgeState {
  /** Raw normalized pointer coordinates in [-1, 1] */
  pointerTargetX: number;
  pointerTargetY: number;
  /** Frame-rate independent damped pointer coordinates in [-1, 1] */
  pointerX: number;
  pointerY: number;
  /** Client viewport coordinates in px for CSS card specular highlights */
  clientX: number;
  clientY: number;
  /** Normalized full-page scroll progress [0, 1] synced via GSAP ScrollTrigger */
  pageScrollProgress: number;
  /** Normalized scroll progress across Hero -> Calibre Studio -> Services [0, 1] */
  calibreScrollProgress: number;
  /** Scroll-driven exploded view target [0, 100] when scroll sync is active */
  scrollDrivenExplodePct: number;
  /** Scroll-driven camera zoom factor [0, 1] */
  scrollCameraZoom: number;
  /** Scroll-driven orbital rotation offset in radians */
  scrollOrbitRadians: number;
  /** Whether the user has manually overridden the Exploded View slider */
  manualExplodeOverride: boolean;
}

export const motionBridge: MotionBridgeState = {
  pointerTargetX: 0,
  pointerTargetY: 0,
  pointerX: 0,
  pointerY: 0,
  clientX: 0,
  clientY: 0,
  pageScrollProgress: 0,
  calibreScrollProgress: 0,
  scrollDrivenExplodePct: 0,
  scrollCameraZoom: 0,
  scrollOrbitRadians: 0,
  manualExplodeOverride: false,
};
