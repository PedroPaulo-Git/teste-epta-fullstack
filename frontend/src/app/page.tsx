import Image from 'next/image';
import AuthPage from '@/components/Auth/AuthLoginPage';

export default function Home() {
  return (
    <div>
     <Image width={100} height={100} alt='Logo' src='/assets/Logo.png'/>
     <AuthPage/>
    </div>
  );
}
