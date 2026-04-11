<template>
  <div class="min-h-screen py-10 px-4" style="background-color: #f0f2f0;">
    <div class="max-w-2xl mx-auto">

      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="w-1 h-14 rounded-full shrink-0" style="background-color: #1a3a6b;"></div>
        <div>
          <p class="text-xs font-bold uppercase tracking-widest mb-0.5" style="color: #1a3a6b;">V.V. Boskant</p>
          <h1 class="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight" style="color: #111;">Beheer</h1>
        </div>
      </div>

      <!-- Tiles -->
      <div class="flex flex-col gap-4">

        <!-- Spelerslijst -->
        <NuxtLink to="/" class="card shadow-md border-t-4 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" style="background: white; border-top-color: #1a3a6b;">
          <div class="flex items-center gap-5 p-6">
            <div class="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style="background-color: #1a3a6b;">
              <!-- Soccer ball -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor" stroke="none" opacity="0.25"/>
                <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
                <path d="M12 7l1.5 4.5H18l-3.75 2.73 1.43 4.39L12 16l-3.68 2.62 1.43-4.39L6 11.5h4.5z" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-widest mb-0.5" style="color: #1a3a6b;">Overzicht</p>
              <h2 class="text-xl font-extrabold uppercase tracking-tight" style="color: #111;">Spelerslijst</h2>
              <p class="text-sm text-gray-400 mt-0.5">Bekijk de actieve speelronde</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-auto shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>

        <!-- Speelrondes beheren -->
        <NuxtLink to="/speelrondes" class="card shadow-md border-t-4 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" style="background: white; border-top-color: #1a3a6b;">
          <div class="flex items-center gap-5 p-6">
            <div class="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style="background-color: #1a3a6b;">
              <!-- Calendar -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-widest mb-0.5" style="color: #1a3a6b;">Beheer</p>
              <h2 class="text-xl font-extrabold uppercase tracking-tight" style="color: #111;">Speelrondes beheren</h2>
              <p class="text-sm text-gray-400 mt-0.5">Speelrondes aanmaken en beheren</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-auto shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>

        <!-- Spelers beheren -->
        <NuxtLink to="/spelers" class="card shadow-md border-t-4 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" style="background: white; border-top-color: #1a3a6b;">
          <div class="flex items-center gap-5 p-6">
            <div class="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style="background-color: #1a3a6b;">
              <!-- 3 users -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-widest mb-0.5" style="color: #1a3a6b;">Beheer</p>
              <h2 class="text-xl font-extrabold uppercase tracking-tight" style="color: #111;">Spelers beheren</h2>
              <p class="text-sm text-gray-400 mt-0.5">Spelers toevoegen, bewerken en archiveren</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-auto shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>

      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-xs font-semibold uppercase tracking-widest" style="color: #1a3a6b;">
        V.V. Boskant — Beheer
      </div>

    </div>
  </div>
</template>
