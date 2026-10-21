import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import GuestLayout from '@/Layouts/GuestLayout';
import Welcome from '@/Pages/Welcome';
import Services from '@/Pages/Services';
import About from '@/Pages/About';
import Contact from '@/Pages/Contact';

function DemoOnly() {
    return (
        <GuestLayout>
            <div style={{ textAlign: 'center', padding: '120px 20px' }}>
                <h2>هذه الصفحة غير متاحة في نسخة العرض</h2>
                <p>تسجيل الدخول ولوحة التحكم تحتاجان النسخة الكاملة من المنصة.</p>
                <a href="#/">العودة للرئيسية</a>
            </div>
        </GuestLayout>
    );
}

const routes = {
    '/': Welcome,
    '/services': Services,
    '/about': About,
    '/conecte': Contact,
};

function Router() {
    const read = () => window.location.hash.replace(/^#/, '') || '/';
    const [path, setPath] = useState(read());
    useEffect(() => {
        const onChange = () => {
            setPath(read());
            window.scrollTo(0, 0);
        };
        window.addEventListener('hashchange', onChange);
        return () => window.removeEventListener('hashchange', onChange);
    }, []);
    const Page = routes[path] || DemoOnly;
    return <Page />;
}

createRoot(document.getElementById('root')).render(<Router />);
