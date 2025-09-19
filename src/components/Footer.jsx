import { HeartHandshake, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 py-6 bg-gradient-to-r from-white via-white to-green-50">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <HeartHandshake size={16} className="text-green-600 mr-1" />
          <span>
            Built with <span className="text-green-700 font-semibold">medicue</span> &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/privacy" className="text-gray-500 hover:text-green-700 transition-colors text-sm">
            Privacy
          </Link>
          <Link href="/terms" className="text-gray-500 hover:text-green-700 transition-colors text-sm">
            Terms
          </Link>
          <Link href="https://github.com/your-org/medicue" className="text-gray-500 hover:text-green-700 transition-colors" target="_blank" rel="noopener">
            <Github size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
