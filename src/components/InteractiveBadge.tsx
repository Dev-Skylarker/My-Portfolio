/**
 * InteractiveBadge.tsx
 *
 * 2D Physics-based hanging credential badge:
 * - Suspended via Rapier useSpringJoint from anchor [0, 4.5, 0]
 * - 2D planar motion constraints (Z-translation and X/Y-rotations locked)
 * - Drag-and-release interaction with Hooke's law return to center [0, -0.55, 0]
 * - Dynamic catenary ribbon mesh connecting top clip [0, 1.89, 0] to anchor
 * - Borderless unlit credential graphic with native image RGB fidelity (toneMapped={false})
 */

import * as THREE from "three";
import { Suspense, useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  useSpringJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
// Import meshline as requested
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

// Silence unused import warnings if bundler checks
void MeshLineGeometry;
void MeshLineMaterial;

// ─── Dimensions & Coordinates (Aspect Ratio 400x560 = 0.7142857) ───────────────
const BW = 1.9;
const BH = 2.66;
const BD = 0.04;
const ANCHOR_POS: [number, number, number] = [0, 2.2, 0];
const BADGE_Y0 = -0.05;

// ─── Security Credential Reverse Face ──────────────────────────────────────────
function makeBackCanvas(): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = 900;
  cv.height = 1260;
  const c = cv.getContext("2d")!;

  // Background
  c.fillStyle = "#09101f";
  c.fillRect(0, 0, 900, 1260);

  // Micro grid
  c.strokeStyle = "#13203d";
  c.lineWidth = 1;
  for (let x = 0; x < 900; x += 40) {
    c.beginPath();
    c.moveTo(x, 0);
    c.lineTo(x, 1260);
    c.stroke();
  }
  for (let y = 0; y < 1260; y += 40) {
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(900, y);
    c.stroke();
  }

  // Header band
  c.fillStyle = "#101e3a";
  c.fillRect(0, 0, 900, 150);
  c.fillStyle = "#389BFF";
  c.font = "bold 44px monospace";
  c.fillText("SYSTEM ACCESS IDENTIFIER", 55, 92);

  // Chip
  c.fillStyle = "#b89e3a";
  c.fillRect(55, 200, 140, 105);
  c.strokeStyle = "#d4b84a";
  c.lineWidth = 2.5;
  c.strokeRect(55, 200, 140, 105);
  c.beginPath();
  c.moveTo(55, 252);
  c.lineTo(195, 252);
  c.moveTo(125, 200);
  c.lineTo(125, 305);
  c.stroke();

  // Details
  c.fillStyle = "#EDEDE8";
  c.font = "bold 38px monospace";
  c.fillText("ERIC MAINA", 55, 375);
  c.fillStyle = "#0085FF";
  c.font = "26px monospace";
  c.fillText("SPECIALIST - SYSTEMS & ICT", 55, 420);

  // Barcode
  for (let i = 0; i < 68; i++) {
    c.fillStyle = i % 2 === 0 || i % 7 < 2 ? "#ffffff" : "#000000";
    c.fillRect(55 + i * 11.5, 590, i % 5 < 2 ? 8 : 5, 125);
  }
  c.fillStyle = "#6d82a6";
  c.font = "22px monospace";
  c.fillText("*ME-2024-0521*", 55, 745);

  // Verified Badge Stamp
  c.beginPath();
  c.arc(730, 270, 105, 0, Math.PI * 2);
  c.strokeStyle = "#389BFF";
  c.lineWidth = 4.5;
  c.stroke();

  c.fillStyle = "#389BFF";
  c.font = "bold 28px monospace";
  c.textAlign = "center";
  c.fillText("VERIFIED", 730, 260);
  c.fillText("✓ ACTIVE", 730, 300);
  c.textAlign = "left";

  // Footer bar
  c.fillStyle = "#060b17";
  c.fillRect(0, 1195, 900, 65);
  c.fillStyle = "#389BFF";
  c.font = "22px monospace";
  c.fillText("devskylarker.com  ·  ALL RIGHTS RESERVED", 55, 1236);

  return cv;
}

// ─── Borderless Unlit Graphic Badge Visual ─────────────────────────────────────
function BadgeMesh() {
  const frontTexture = useTexture("/card.png");

  useMemo(() => {
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.anisotropy = 8;
    frontTexture.needsUpdate = true;
  }, [frontTexture]);

  const backTexture = useMemo(() => {
    const tex = new THREE.CanvasTexture(makeBackCanvas());
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group>
      {/* 0. Full hit boundary ensuring reliable drag initiation at any point */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[BW + 0.15, BH + 0.25, BD + 0.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* 1. Thin substrate core */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[BW, BH, BD]} />
        <meshBasicMaterial color="#111611" toneMapped={false} />
      </mesh>

      {/* 2. Full-bleed front face (unlit, exact native image RGB values) */}
      <mesh position={[0, 0, BD / 2 + 0.001]}>
        <planeGeometry args={[BW, BH]} />
        <meshBasicMaterial map={frontTexture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* 3. Reverse security card face */}
      <mesh position={[0, 0, -(BD / 2 + 0.001)]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[BW, BH]} />
        <meshBasicMaterial map={backTexture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* 4. Top attachment clip housing */}
      <mesh position={[0, BH / 2, 0]}>
        <boxGeometry args={[0.28, 0.09, 0.06]} />
        <meshStandardMaterial color="#b8b8c2" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 5. Lanyard metal connector ring */}
      <mesh position={[0, BH / 2 + 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.058, 0.016, 10, 24]} />
        <meshStandardMaterial color="#c4c4cc" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ─── Dynamic Curvable Elastic Ribbon Lanyard Mesh ─────────────────────────────
function Ribbon({
  anchorRef,
  badgeRef,
}: {
  anchorRef: React.RefObject<RapierRigidBody>;
  badgeRef: React.RefObject<RapierRigidBody>;
}) {
  const { viewport } = useThree();
  const N = 64; // High-resolution cross sections for silk-smooth curvature across full length
  const HALF_W = 0.036;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 2 * 3);
    const posAttr = new THREE.BufferAttribute(pos, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    g.setAttribute("position", posAttr);

    const idx: number[] = [];
    for (let i = 0; i < N - 1; i++) {
      const a = i * 2;
      const b = i * 2 + 1;
      const c = i * 2 + 2;
      const d = i * 2 + 3;
      idx.push(a, b, c, b, d, c);
    }
    g.setIndex(idx);
    return g;
  }, []);

  // 8 dynamic control points:
  // cp[0]: Starting point below/under the navbar layer
  // cp[1]: Midpoint of upper anchor section
  // cp[2]: Maintained anchor point (the current starting point kept as physics anchor)
  // cp[3..6]: Dynamic catenary/spring curve points with inertia lag
  // cp[7]: Card top clip connection
  const cp = useRef<THREE.Vector3[]>([
    new THREE.Vector3(0, 2.7, -0.02),
    new THREE.Vector3(0, 2.45, -0.02),
    new THREE.Vector3(0, ANCHOR_POS[1], -0.02),
    new THREE.Vector3(0, 1.95, -0.02),
    new THREE.Vector3(0, 1.75, -0.02),
    new THREE.Vector3(0, 1.55, -0.02),
    new THREE.Vector3(0, 1.4, -0.02),
    new THREE.Vector3(0, BADGE_Y0 + BH / 2 + 0.06, -0.02),
  ]);

  const prevClipPos = useRef(new THREE.Vector3(0, BADGE_Y0 + BH / 2 + 0.06, -0.02));
  const clipVelocity = useRef(new THREE.Vector3(0, 0, 0));

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([], false, "catmullrom", 0.35),
    []
  );

  useFrame((_, delta) => {
    if (!anchorRef.current || !badgeRef.current) return;
    const at = anchorRef.current.translation();
    const bt = badgeRef.current.translation();
    const br = badgeRef.current.rotation();

    // Exact 2D angle around Z axis
    const angle = 2 * Math.atan2(br.z, br.w);

    // Exact top connector center in world coordinates (attached to torus ring)
    const ringDist = BH / 2 + 0.06;
    const clipOffsetX = -ringDist * Math.sin(angle);
    const clipOffsetY = ringDist * Math.cos(angle);

    const clipPos = new THREE.Vector3(
      bt.x + clipOffsetX,
      bt.y + clipOffsetY,
      -0.02
    );

    // Tangent vector pointing outward from the top clip
    const clipTangent = new THREE.Vector3(
      -Math.sin(angle),
      Math.cos(angle),
      0
    );

    // Compute Y coordinate tucked safely behind the fixed navbar layer (z-50)
    // Using viewport.height * 0.54 ensures the top of the lanyard extends all the way into/behind the navbar
    const lanyardStartY = viewport.height * 0.54;

    // 1. Starting point of the lanyard tucked safely behind the navbar layer
    const topPos = new THREE.Vector3(at.x, lanyardStartY, -0.02);

    // 2. Maintained anchor point (the current starting point kept as the anchor)
    // Add subtle elastic tension flex on anchor when badge is dragged sideways
    const dx = clipPos.x - at.x;
    const flexX = THREE.MathUtils.clamp(dx * 0.05, -0.08, 0.08);
    const anchorPos = new THREE.Vector3(at.x + flexX, at.y, -0.02);

    // Compute clip velocity for inertia / circular drag curvature
    const dt = Math.max(0.001, Math.min(0.05, delta));
    clipVelocity.current.set(
      (clipPos.x - prevClipPos.current.x) / dt,
      (clipPos.y - prevClipPos.current.y) / dt,
      0
    );
    prevClipPos.current.copy(clipPos);

    // Upper strap: from below navbar to the maintained anchor point
    cp.current[0].copy(topPos);
    cp.current[1].set(at.x + flexX * 0.4, (lanyardStartY + at.y) * 0.5, -0.02);
    cp.current[2].copy(anchorPos);

    // Lower strap: from maintained anchor point down to card clip with spring & inertia dynamics
    const dist = anchorPos.distanceTo(clipPos);
    const lowerPointsCount = 5; // index 3, 4, 5, 6, 7
    for (let j = 1; j < lowerPointsCount; j++) {
      const idx = 2 + j;
      const t = j / (lowerPointsCount - 1);
      // Hermite / Bezier baseline between downward anchor tangent and outward clip tangent
      const h0 = anchorPos.clone().add(new THREE.Vector3(flexX * 0.5, -dist * 0.36, 0));
      const h1 = clipPos.clone().add(clipTangent.clone().multiplyScalar(dist * 0.36));

      // Cubic interpolation
      const u = 1 - t;
      const baseTarget = new THREE.Vector3()
        .addScaledVector(anchorPos, u * u * u)
        .addScaledVector(h0, 3 * u * u * t)
        .addScaledVector(h1, 3 * u * t * t)
        .addScaledVector(clipPos, t * t * t);

      // Dynamic inertia lag when dragging or rotating circularly
      const lagIntensity = Math.sin(t * Math.PI) * 0.042;
      const inertiaOffset = new THREE.Vector3(
        -clipVelocity.current.x * lagIntensity,
        -clipVelocity.current.y * lagIntensity,
        0
      );

      const target = baseTarget.add(inertiaOffset);
      cp.current[idx].lerp(target, 0.24);
    }
    cp.current[7].copy(clipPos);

    curve.points = cp.current;
    const sampled = curve.getPoints(N - 1);

    // Ensure first sampled point is STRICTLY topPos and last is STRICTLY clipPos
    sampled[0].copy(topPos);
    sampled[sampled.length - 1].copy(clipPos);

    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < N; i++) {
      const p = sampled[i];
      const prev = sampled[Math.max(0, i - 1)];
      const next = sampled[Math.min(N - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      const ox = (-dy / len) * HALF_W;
      const oy = (dx / len) * HALF_W;

      const base = i * 6;
      arr[base] = p.x - ox;
      arr[base + 1] = p.y - oy;
      arr[base + 2] = p.z;

      arr[base + 3] = p.x + ox;
      arr[base + 4] = p.y + oy;
      arr[base + 5] = p.z;
    }

    posAttr.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh geometry={geo}>
      <meshStandardMaterial
        color="#0085FF"
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Spring Joint Component (Must be rendered inside <Physics />) ─────────────
function SpringConnector({
  anchorRef,
  badgeRef,
}: {
  anchorRef: React.RefObject<RapierRigidBody>;
  badgeRef: React.RefObject<RapierRigidBody>;
}) {
  useSpringJoint(anchorRef, badgeRef, [
    [0, 0, 0], // Anchor connection point
    [0, BH / 2 + 0.06, 0], // Badge connection point (top torus ring)
    1.15, // Rest length (increased lanyard length)
    46, // Stiffness
    6.0, // Damping factor (rapid intact settle)
  ]);
  return null;
}

// ─── 2D Spring Physics Scene with Hover Pop & Any-Part Drag ───────────────────
function BadgePhysicsScene() {
  const { viewport, gl, camera, size } = useThree();

  // Use pixel-based breakpoints aligned with Tailwind's responsive tiers
  // lg:1024px is where the CSS grid switches from stacked to side-by-side
  const w = size.width;

  // Responsive anchor position with smooth transitions across all screen sizes
  let anchorX: number;
  let anchorY: number;

  if (w >= 1024) {
    // Desktop: badge in right column, positioned closer to hero text to reduce empty gap
    const containerPx = Math.min(w, 1280); // effective content width (max-w-7xl)
    const sideMarginPx = (w - containerPx) / 2; // margin on each side
    // Position badge anchor closer to left hero column (0.72 instead of 0.792)
    const rightColCenterPx = sideMarginPx + containerPx * 0.72;
    // Convert to viewport-centered world coords: 0 = center, +X = right
    anchorX = ((rightColCenterPx / w) - 0.5) * viewport.width;
    // Clamp so badge + rotation swing never clips at canvas edge
    anchorX = Math.min(anchorX, viewport.width / 2 - BW / 2 - 0.8);
    anchorY = viewport.height * 0.38;
  } else {
    // Stacked layout (mobile & tablet): badge centered horizontally in its dedicated hero slot
    anchorX = 0;
    anchorY = viewport.height * 0.36;
  }

  const anchorRef = useRef<RapierRigidBody>(null);
  const badgeRef = useRef<RapierRigidBody>(null);
  const badgeVisualRef = useRef<THREE.Group>(null);

  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const scaleVal = useRef(1);

  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const raycaster = useRef(new THREE.Raycaster());
  const dragOffset = useRef(new THREE.Vector3());
  const lastPt = useRef(new THREE.Vector3());
  const vel = useRef(new THREE.Vector3());
  const lastTime = useRef(0);

  // Update fixed anchor translation if viewport / screen resizes
  useEffect(() => {
    if (anchorRef.current) {
      anchorRef.current.setTranslation({ x: anchorX, y: anchorY, z: 0 }, true);
    }
  }, [anchorX, anchorY]);

  // Subtle settle on page load and when user scrolls back to the very top
  const hasScrolledDown = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        hasScrolledDown.current = true;
      } else if (window.scrollY < 15 && hasScrolledDown.current) {
        hasScrolledDown.current = false;
        if (badgeRef.current && !isDragging.current) {
          badgeRef.current.applyImpulse({ x: 0, y: -0.35, z: 0 }, true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getWorld = useCallback(
    (clientX: number, clientY: number): THREE.Vector3 | null => {
      const rect = gl.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.current.setFromCamera(ndc, camera);
      const out = new THREE.Vector3();
      return raycaster.current.ray.intersectPlane(dragPlane.current, out)
        ? out
        : null;
    },
    [gl, camera]
  );

  const release = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    document.body.style.cursor = isHovered.current ? "grab" : "";

    if (badgeRef.current) {
      badgeRef.current.setBodyType(0, true);
      badgeRef.current.wakeUp();
      // Apply the release velocity with natural spring inertia
      badgeRef.current.setLinvel(
        {
          x: THREE.MathUtils.clamp(vel.current.x * 0.75, -12, 12),
          y: THREE.MathUtils.clamp(vel.current.y * 0.75, -10, 10),
          z: 0,
        },
        true
      );
      badgeRef.current.setAngvel(
        {
          x: 0,
          y: 0,
          z: THREE.MathUtils.clamp(-vel.current.x * 0.35, -8, 8),
        },
        true
      );
    }
    vel.current.set(0, 0, 0);
  }, []);

  // Handle move (shared between mouse and touch)
  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging.current || !badgeRef.current) return;
      const dragPoint = getWorld(clientX, clientY);
      if (!dragPoint) return;

      // Allow dragging towards ANY point across the entire screen
      const halfW = viewport.width * 0.49;
      const halfH = viewport.height * 0.49;
      const targetX = THREE.MathUtils.clamp(
        dragPoint.x + dragOffset.current.x,
        -halfW,
        halfW
      );
      const targetY = THREE.MathUtils.clamp(
        dragPoint.y + dragOffset.current.y,
        -halfH,
        halfH
      );

      const now = performance.now();
      const dt = Math.max(0.001, (now - lastTime.current) / 1000);
      vel.current.set(
        (targetX - lastPt.current.x) / dt,
        (targetY - lastPt.current.y) / dt,
        0
      );
      lastPt.current.set(targetX, targetY, 0);
      lastTime.current = now;

      badgeRef.current.setTranslation({ x: targetX, y: targetY, z: 0 }, true);
      badgeRef.current.setNextKinematicTranslation({
        x: targetX,
        y: targetY,
        z: 0,
      });

      // Natural tilt while dragging based on displacement from anchor
      const dx = targetX - anchorX;
      const dy = (targetY + BH / 2 + 0.06) - anchorY;
      const angle = Math.atan2(dx, -dy) * 0.48;
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -angle);
      badgeRef.current.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w }, true);
      badgeRef.current.setNextKinematicRotation({
        x: q.x,
        y: q.y,
        z: q.z,
        w: q.w,
      });
    },
    [getWorld, viewport.width, viewport.height, anchorX, anchorY]
  );

  // Start drag helper
  const startDrag = useCallback(
    (hitPoint: THREE.Vector3) => {
      if (!badgeRef.current) return;
      isDragging.current = true;
      const t = badgeRef.current.translation();
      const wp = new THREE.Vector3(t.x, t.y, 0);
      dragPlane.current.set(new THREE.Vector3(0, 0, 1), 0);

      dragOffset.current.set(wp.x - hitPoint.x, wp.y - hitPoint.y, 0);
      lastPt.current.copy(wp);
      lastTime.current = performance.now();
      vel.current.set(0, 0, 0);

      // In Rapier: Dynamic=0, Fixed=1, KinematicPositionBased=2
      badgeRef.current.setBodyType(2, true);
      badgeRef.current.wakeUp();
      document.body.style.cursor = "grabbing";
    },
    []
  );

  useEffect(() => {
    const dom = gl.domElement;
    // Keep canvas pointerEvents none so page scroll is 100% unaffected
    dom.style.pointerEvents = "none";

    const checkHit = (clientX: number, clientY: number): THREE.Intersection | null => {
      if (!badgeVisualRef.current) return null;
      const rect = dom.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.current.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      badgeVisualRef.current.updateWorldMatrix(true, true);
      const hits = raycaster.current.intersectObjects(
        badgeVisualRef.current.children,
        true
      );
      return hits.length > 0 ? hits[0] : null;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging.current) {
        handleDragMove(e.clientX, e.clientY);
        return;
      }
      const hit = checkHit(e.clientX, e.clientY);
      if (hit) {
        if (!isHovered.current) {
          isHovered.current = true;
          document.body.style.cursor = "grab";
        }
      } else {
        if (isHovered.current) {
          isHovered.current = false;
          document.body.style.cursor = "";
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // Only primary mouse button
      const hit = checkHit(e.clientX, e.clientY);
      if (hit) {
        e.preventDefault();
        startDrag(hit.point);
      }
    };

    const onPointerUp = () => {
      if (isDragging.current) {
        release();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const hit = checkHit(touch.clientX, touch.clientY);
      if (hit) {
        e.preventDefault();
        startDrag(hit.point);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !e.touches.length) return;
      e.preventDefault();
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
      if (isDragging.current) {
        release();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      document.body.style.cursor = "";
    };
  }, [gl, camera, handleDragMove, release, startDrag]);

  // Subtle hover pop effect (scales up to 1.04 smoothly on hover, no movement triggered)
  useFrame(() => {
    const targetScale = isHovered.current || isDragging.current ? 1.04 : 1.0;
    scaleVal.current = THREE.MathUtils.lerp(scaleVal.current, targetScale, 0.2);
    if (badgeVisualRef.current) {
      badgeVisualRef.current.scale.setScalar(scaleVal.current);
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 4, 4]} intensity={0.6} />

      <Physics gravity={[0, -12, 0]}>
        {/* Top-fixed anchor positioned at top edge of hero section */}
        <RigidBody
          ref={anchorRef}
          type="fixed"
          position={[anchorX, anchorY, 0]}
          colliders={false}
        />

        {/* 2D Planar badge: initial elevation creates subtle drop-settle on first display */}
        <RigidBody
          ref={badgeRef}
          type="dynamic"
          colliders="cuboid"
          enabledTranslations={[true, true, false]}
          enabledRotations={[false, false, true]}
          linearDamping={1.25}
          angularDamping={1.8}
          position={[anchorX, anchorY - 1.95, 0]}
        >
          <group ref={badgeVisualRef}>
            <BadgeMesh />
          </group>
        </RigidBody>

        {/* Spring joint connection inside Physics context */}
        <SpringConnector anchorRef={anchorRef} badgeRef={badgeRef} />
      </Physics>

      {/* Dynamic Curvable elastic lanyard ribbon */}
      <Ribbon anchorRef={anchorRef} badgeRef={badgeRef} />
    </>
  );
}

// ─── Responsive Camera Controller ─────────────────────────────────────────────
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const w = size.width;
      let fov: number;
      if (w >= 1024) {
        fov = 38;
      } else if (w >= 768) {
        fov = 40;
      } else if (w >= 480) {
        fov = 42;
      } else {
        fov = 44;
      }
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width]);

  return null;
}

// ─── Exported Interactive Badge Component (Desktop Only) ──────────────────────
export function InteractiveBadge() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(typeof window !== "undefined" && window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="hidden lg:block absolute inset-0 z-[20] pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 8.8], fov: 38 }}
        className="w-full h-full pointer-events-none"
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ResponsiveCamera />
          <BadgePhysicsScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
