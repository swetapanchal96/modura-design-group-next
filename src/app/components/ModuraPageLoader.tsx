'use client';

import { useState } from 'react';
import ModuraLoader from './ModuraLoader';

export default function ModuraPageLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && (
                <ModuraLoader
                    onComplete={() => setLoading(false)}
                />
            )}

            <main
                className={`
                    transition-opacity
                    duration-500
                    ${loading ? 'opacity-0' : 'opacity-100'}
                `}
            >
                {children}
            </main>
        </>
    );
}