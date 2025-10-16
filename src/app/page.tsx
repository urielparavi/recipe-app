'use client';

import { useState } from 'react';
import {
  ChefHat,
  Clock,
  Users,
  Flame,
  Send,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

import { recipeSchema } from '@/app/api/recipe/schema';
import z from 'zod';

export type RecipeResponse = z.infer<typeof recipeSchema>;

export default function StructuredDataPage() {
  const [dishName, setDishName] = useState('');
  const [object, setObject] = useState<RecipeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dish: dishName }),
      });

      if (!response.ok) throw new Error('Failed to fetch recipe');

      const data = await response.json();
      setObject(data);
      setDishName('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Unknown error occurred'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-orange-100 dark:border-orange-900/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                שף מודלה
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                מתכונים אישיים בשניה אחת
              </p>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 pb-40">
        {!object?.recipe ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-orange-100 dark:border-orange-900/30">
                <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  טיפים חמים
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg">
                    <p className="font-medium text-slate-900 dark:text-white mb-1">
                      🍳 בחר מרכיב ראשי
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-xs">
                      כתוב את השם של הבשר, ירק או מרכיב שברצונך לבשל
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                    <p className="font-medium text-slate-900 dark:text-white mb-1">
                      ⚡ תוצאות מיידיות
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-xs">
                      קבל מתכון מפורט עם מרכיבים וצעדים
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <p className="font-medium text-slate-900 dark:text-white mb-1">
                      👨‍🍳 למיני וגדול
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-xs">
                      המתכונים שלנו מתאימים לכל רמת מיומנות
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-lg text-white">
                <h3 className="font-bold mb-3">מרכיבים פופולריים</h3>
                <div className="flex flex-wrap gap-2">
                  {['עוף', 'דגים', 'ספגטי', 'עדשים', 'בצל', 'עגבנייה'].map(
                    (item, i) => (
                      <button
                        key={i}
                        onClick={() => setDishName(item)}
                        className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-col items-center justify-center min-h-96 text-center">
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  <ChefHat className="w-24 h-24 text-orange-500 relative" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                  מה בשולחן היום?
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mb-8">
                  הכנס מרכיב ישראלי קלאסי או משהו יצירתי, והצ'אטבוט שלנו יביא לך
                  מתכון מוכן בתוך שניות
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">∞</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      מתכונים
                    </p>
                  </div>
                  <div className="w-px bg-slate-300 dark:bg-slate-600"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">📱</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      כל הזמן
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Recipe Display
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Info Panel */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-orange-100 dark:border-orange-900/30">
                <h3 className="text-sm uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold mb-4">
                  פרטי המתכון
                </h3>
                {object?.recipe?.servings && (
                  <div className="flex items-center gap-3 mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        מנות
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {object.recipe.servings}
                      </p>
                    </div>
                  </div>
                )}
                {object?.recipe?.cookTime && (
                  <div className="flex items-center gap-3 mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        זמן הכנה
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {object.recipe.cookTime}
                      </p>
                    </div>
                  </div>
                )}
                {object?.recipe?.difficulty && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <ChefHat className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        רמת קושי
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {object.recipe.difficulty}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
                <h4 className="font-bold mb-3 text-sm">💡 טיפ מהשף</h4>
                <p className="text-sm leading-relaxed">
                  {object.recipe.tips ||
                    'היסוד לביצוע מצוין הוא להכין את כל המרכיבים לפני שתתחילו בבישול!'}
                </p>
              </div>
            </div>

            {/* Center Recipe Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recipe Title */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-orange-900/30">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                  {object.recipe.name}
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  {object.recipe.description}
                </p>
              </div>

              {/* Ingredients */}
              {object?.recipe?.ingredients && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-orange-900/30">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                      📦
                    </span>
                    מרכיבים
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {object.recipe.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-700 dark:to-slate-600 p-5 rounded-xl border-l-4 border-orange-500 hover:shadow-md transition-shadow"
                      >
                        <p className="font-bold text-slate-900 dark:text-white text-lg">
                          {ingredient?.name}
                        </p>
                        <p className="text-orange-600 dark:text-orange-400 font-semibold">
                          {ingredient?.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Steps */}
              {object?.recipe?.steps && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-orange-900/30">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
                      👨‍🍳
                    </span>
                    שלבי ההכנה
                  </h2>
                  <ol className="space-y-4">
                    {object.recipe.steps.map((step, index) => (
                      <li key={index} className="flex gap-4 group">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 p-4 rounded-lg group-hover:shadow-md transition-shadow">
                          <p className="text-slate-900 dark:text-white leading-relaxed">
                            {step}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="fixed top-24 left-4 right-4 max-w-md mx-auto bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-200">
                שגיאה
              </p>
              <p className="text-sm text-red-800 dark:text-red-300">
                {error.message}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Input Form */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-t border-orange-200 dark:border-orange-900/50 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder="כתוב מרכיב או מנה, מודלה"
              className="flex-1 bg-gradient-to-r from-slate-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 px-5 py-3 border border-orange-200 dark:border-orange-900/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all"
              disabled={isLoading}
            />
            {isLoading ? (
              <button
                type="button"
                onClick={handleStop}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
              >
                <span>⏹</span> עצור
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!dishName.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                בשל עכשיו
              </button>
            )}
          </div>
          {isLoading && (
            <div className="mt-3 flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                ></div>
              </div>
              <span>{'הצ\u2019אטבוט מכין את המתכון'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
