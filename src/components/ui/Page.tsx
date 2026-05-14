import { motion, type HTMLMotionProps } from 'framer-motion';
import { pageVariants } from '../../lib/animations';
import { Helmet } from 'react-helmet-async';
import type { ReactNode } from 'react';

interface PageProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function Page({ children, title, description, className, ...rest }: PageProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    </>
  );
}
