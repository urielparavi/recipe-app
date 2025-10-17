import Link from 'next/link';
import { ChefHat, Home, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: '404 - דף לא נמצא | שף מודלה',
  description: 'העמוד שחיפשת לא נמצא',
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-72 h-72 bg-red-200 dark:bg-red-900/20 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-orange-100 dark:border-orange-900/30 p-8 md:p-12 text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
                <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="inline-block">
              <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                404
              </h1>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              הדף הזה לא קיים!
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed max-w-md mx-auto">
            נראה שהעמוד שחיפשת לא נמצא בתפריט שלנו. אבל אל תדאג, מכאן תוכל לחזור
            חזרה למתכונים הטעימים שלנו!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-900/40">
              <ChefHat className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <p className="text-sm text-slate-700 dark:text-slate-300">
                ✗ URL לא נכון או שהעמוד בוטל
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-900/40">
              <Home className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-slate-700 dark:text-slate-300">
                ✓ חזור לעמוד הבית וצור מתכונים חדשים
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Link href="/">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group cursor-pointer">
                <Home className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                חזור לעמוד הבית
              </button>
            </Link>
          </div>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              💡 טיפ: בחר מרכיב אהוב עליך וגלה מתכון חדש!
            </p>
          </div>
        </div>
        <div className="mt-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
            <ChefHat
              className="w-5 h-5 text-orange-500 animate-bounce"
              style={{ animationDelay: '0s' }}
            />
            <ChefHat
              className="w-5 h-5 text-orange-500 animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
            <ChefHat
              className="w-5 h-5 text-orange-500 animate-bounce"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            שף מודלה - מתכונים אישיים בשנייה אחת
          </p>
        </div>
      </div>
    </div>
  );
}
