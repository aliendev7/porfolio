"use client"
import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
}

export const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
    const reduce = useReducedMotion();

    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
        >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-poiret">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {subtitle}
                </p>
            )}
            <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-brand-green to-brand-medium rounded-full" />
        </motion.div>
    );
};