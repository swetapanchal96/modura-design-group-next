'use client';

import { useEffect, useState } from 'react';
import ModuraLoader from './ModuraLoader';

const LOADER_KEY = 'modura-loader-shown';

export default function ModuraPageLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const loaderShown = sessionStorage.getItem(LOADER_KEY);

        if (loaderShown === 'true') {
            // Loader has already been shown in this browser session
            setLoading(false);
        } else {
            // First visit in this session
            setLoading(true);
        }

        setChecked(true);
    }, []);

    const handleComplete = () => {
        sessionStorage.setItem(LOADER_KEY, 'true');
        setLoading(false);
    };

    // Prevent the website content from flashing before
    // we check sessionStorage.
    if (!checked) {
        return (
            <div className="min-h-screen bg-[#061322]" />
        );
    }

    return (
        <>
            {loading && (
                <ModuraLoader
                    onComplete={handleComplete}
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