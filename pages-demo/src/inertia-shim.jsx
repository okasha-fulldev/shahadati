// Minimal stand-in for @inertiajs/react so the public pages can run as a static demo
// (GitHub Pages cannot run Laravel). Not used by the real app.
import { useEffect, useState } from 'react';

export function Head({ title }) {
    useEffect(() => {
        document.title = title ? `${title} | شهادتي` : 'شهادتي';
    }, [title]);
    return null;
}

export function Link({ href, children, ...rest }) {
    const isExternal = /^https?:\/\//.test(href);
    return (
        <a href={isExternal ? href : `#${href}`} {...rest}>
            {children}
        </a>
    );
}

const DEMO_NOTICE = 'هذه نسخة عرض للواجهة فقط، الإرسال غير متاح فيها.';
let flashState = {};

export function usePage() {
    return { props: { flash: flashState } };
}

export function useForm(initial) {
    const [data, setDataState] = useState(initial);
    const [, force] = useState(0);
    const setData = (key, value) =>
        setDataState((prev) => (typeof key === 'object' ? { ...prev, ...key } : { ...prev, [key]: value }));
    return {
        data,
        setData,
        errors: {},
        processing: false,
        reset: () => setDataState(initial),
        post: () => {
            flashState = { error: DEMO_NOTICE };
            force((n) => n + 1);
        },
    };
}
