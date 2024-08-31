import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScanPage } from './scan-page';
import { ChromeIcon } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { LoginPage } from './login-page';
import { HistoryPage } from './scan-history';
export const MenuPage = () => {
    return (
        <>
            {/* <LoginForm /> */}
            {/* <ScanPage /> */}
            <LoginPage />
            {/* <HistoryPage/> */}
        </>
    );
};


