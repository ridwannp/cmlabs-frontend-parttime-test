'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * @param {{ eyebrow?: string, title: string, subtitle?: string }} props
 */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ maxWidth: '680px' }}
    >
      {eyebrow && (
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '12px',
          }}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h1
        variants={itemVariants}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 8vw, 80px)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          margin: '0 0 16px',
        }}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '22px',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            margin: 0,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
