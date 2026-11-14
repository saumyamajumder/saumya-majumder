// Framer Motion's animation engine, loaded asynchronously by <LazyMotion> in
// components/Providers.tsx. `domMax` (rather than `domAnimation`) because the
// header nav indicator uses a shared-layout `layoutId` animation.
import { domMax } from "framer-motion";

export default domMax;
